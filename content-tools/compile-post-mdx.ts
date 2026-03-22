import { existsSync } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import type { Meta } from "@content-collections/core";
import type { Plugin } from "esbuild";
import { bundleMDX } from "mdx-bundler";
import rehypePrettyCode from "rehype-pretty-code";
import type { Pluggable, Transformer } from "unified";
import { esbuildShikiImportPlugin } from "./shiki-prerender";

const rehypePrettyCodePlugin: Pluggable = [
	rehypePrettyCode,
	{
		theme: {
			light: "github-light",
			dark: "github-dark",
		},
	},
];

/** Mirrors Vite's `?raw` import for mdx-bundler's esbuild pipeline. */
function esbuildRawImportPlugin(): Plugin {
	return {
		name: "raw-import",
		setup(build) {
			build.onResolve({ filter: /\?raw$/ }, (args) => {
				const pathWithoutQuery = args.path.replace(/\?raw$/, "");
				return {
					path: path.resolve(args.resolveDir, pathWithoutQuery),
					namespace: "raw-text",
				};
			});
			build.onLoad({ filter: /.*/, namespace: "raw-text" }, async (args) => {
				const text = await fs.readFile(args.path, "utf-8");
				return {
					contents: `export default ${JSON.stringify(text)};`,
					loader: "js",
				};
			});
		},
	};
}

export type CompilePostMdxOptions = {
	cwd?: string;
	files?: (appender: FileAppender) => void;
	remarkPlugins?: Pluggable[];
	rehypePlugins?: Pluggable[];
};

type FileAppender = {
	content: (importPath: string, content: string) => void;
	file: (importPath: string, filePath: string) => void;
	directory: (importPath: string, directoryPath: string) => void;
};

async function appendFile(
	files: Record<string, string>,
	importPath: string,
	filePath: string,
) {
	files[importPath] = await fs.readFile(filePath, "utf-8");
}

async function appendDirectory(
	files: Record<string, string>,
	importPathPrefix: string,
	directoryPath: string,
) {
	if (!existsSync(directoryPath)) {
		return;
	}
	const fileNames = await fs.readdir(directoryPath);
	for (const fileName of fileNames) {
		const filePath = path.join(directoryPath, fileName);
		const { name } = path.parse(filePath);
		files[`${importPathPrefix}/${name}`] = await fs.readFile(filePath, "utf-8");
	}
}

function createFileAppender(
	tasks: Promise<void>[],
	files: Record<string, string>,
): FileAppender {
	return {
		content: (importPath: string, content: string) => {
			files[importPath] = content;
		},
		file: (importPath: string, filePath: string) => {
			tasks.push(appendFile(files, importPath, filePath));
		},
		directory: (importPath: string, directoryPath: string) => {
			tasks.push(appendDirectory(files, importPath, directoryPath));
		},
	};
}

async function createVirtualFiles(
	options: CompilePostMdxOptions,
): Promise<Record<string, string>> {
	const files: Record<string, string> = {};
	if (options.files) {
		const tasks: Promise<void>[] = [];
		const appender = createFileAppender(tasks, files);
		options.files(appender);
		await Promise.all(tasks);
	}
	return files;
}

function addMetaToVFile(_meta: Meta): Pluggable {
	return (): Transformer => (_, vFile) => {
		Object.assign(vFile.data, { _meta });
	};
}

/**
 * Same as @content-collections/mdx `compileMDX` output, but does not use
 * `context.cache` — that cache key only includes MDX body + `_meta`, so edits
 * to sibling TSX / shared components were ignored until the post body changed.
 */
export async function compilePostMdx(
	document: { content: string; _meta: Meta },
	options: CompilePostMdxOptions = {},
): Promise<string> {
	const virtualFiles = await createVirtualFiles(options);
	const { code } = await bundleMDX({
		source: document.content,
		cwd: options.cwd,
		files: virtualFiles,
		esbuildOptions(opts) {
			if (!opts.define) {
				opts.define = {};
			}
			const env = process.env.NODE_ENV ?? "production";
			opts.define["process.env.NODE_ENV"] = JSON.stringify(env);
			opts.plugins = [
				esbuildRawImportPlugin(),
				esbuildShikiImportPlugin(),
				...(opts.plugins ?? []),
			];
			return opts;
		},
		mdxOptions(mdxOptions) {
			mdxOptions.rehypePlugins = [
				rehypePrettyCodePlugin,
				...(options.rehypePlugins ?? []),
			];
			mdxOptions.remarkPlugins = [
				addMetaToVFile(document._meta),
				...(options.remarkPlugins ?? []),
			];
			return mdxOptions;
		},
	});
	return code;
}
