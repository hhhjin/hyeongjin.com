import fs from "node:fs/promises";
import path from "node:path";
import type { Plugin, ViteDevServer } from "vite";

/**
 * Content Collections only syncs files matching `include` (e.g. post.mdx).
 * TS/TSX next to a post never triggers a rebuild — bump the post's mtime so
 * the collection re-transforms and picks up new component sources.
 */
async function touchNearestPostMarkdown(
	changedFile: string,
	postsRoot: string,
): Promise<boolean> {
	const resolvedPosts = path.resolve(postsRoot);
	const normalizedRoot = `${resolvedPosts}${path.sep}`;
	let dir = path.dirname(changedFile);

	while (dir.startsWith(normalizedRoot) && dir !== resolvedPosts) {
		for (const name of ["post.mdx", "post.md"]) {
			const candidate = path.join(dir, name);
			try {
				await fs.access(candidate);
				const t = new Date();
				await fs.utimes(candidate, t, t);
				return true;
			} catch {
				/* not found */
			}
		}
		const parent = path.dirname(dir);
		if (parent === dir) break;
		dir = parent;
	}
	return false;
}

async function collectPostMarkdownFiles(dir: string): Promise<string[]> {
	const results: string[] = [];
	const entries = await fs
		.readdir(dir, { withFileTypes: true })
		.catch(() => []);
	for (const entry of entries) {
		const p = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			results.push(...(await collectPostMarkdownFiles(p)));
		} else if (entry.name === "post.mdx" || entry.name === "post.md") {
			results.push(p);
		}
	}
	return results;
}

async function touchAllPostMarkdowns(postsRoot: string): Promise<void> {
	const files = await collectPostMarkdownFiles(postsRoot);
	const t = new Date();
	await Promise.all(files.map((p) => fs.utimes(p, t, t)));
}

/**
 * Post MDX is compiled into `content-collections` output; the route loader reads
 * that snapshot. Vite HMR does not re-run the loader, so edits under
 * `src/content` or `.content-collections/generated` need a full reload.
 */
export function contentCollectionsLiveReload(): Plugin {
	let debounce: ReturnType<typeof setTimeout> | undefined;

	function sendFullReload(server: ViteDevServer) {
		clearTimeout(debounce);
		for (const env of Object.values(server.environments)) {
			env.hot.send({ type: "full-reload", path: "*" });
		}
	}

	function scheduleReload(server: ViteDevServer) {
		clearTimeout(debounce);
		debounce = setTimeout(() => sendFullReload(server), 150);
	}

	return {
		name: "content-collections-live-reload",
		configureServer(server) {
			const root = server.config.root;
			const generated = path.resolve(root, ".content-collections/generated");
			const contentRoot = path.resolve(root, "src/content");
			const postsRoot = path.join(contentRoot, "posts");
			const sharedRoot = path.join(contentRoot, "shared");

			server.watcher.on("change", (file) => {
				const abs = path.resolve(file);

				void (async () => {
					if (abs.startsWith(`${generated}${path.sep}`)) {
						sendFullReload(server);
						return;
					}

					if (
						abs.startsWith(`${postsRoot}${path.sep}`) &&
						/\.tsx?$/i.test(abs) &&
						!/post\.mdx?$/i.test(path.basename(abs))
					) {
						await touchNearestPostMarkdown(abs, postsRoot);
						return;
					}

					if (
						abs.startsWith(`${sharedRoot}${path.sep}`) &&
						/\.tsx?$/i.test(abs)
					) {
						await touchAllPostMarkdowns(postsRoot);
						return;
					}

					if (
						abs.startsWith(`${contentRoot}${path.sep}`) &&
						/\.(mdx?|tsx?)$/i.test(abs)
					) {
						scheduleReload(server);
					}
				})();
			});
		},
	};
}
