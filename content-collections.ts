import type fs from "node:fs";
import fsPromises from "node:fs/promises";
import path from "node:path";
import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";
import { compilePostMdx } from "./content-tools/compile-post-mdx";

async function findTsxFilesUnderPostDir(postDir: string) {
	const results: Array<{ importPath: string; fullPath: string }> = [];

	async function walk(currentDir: string, relativeDir: string) {
		const entries = await fsPromises
			.readdir(currentDir, { withFileTypes: true })
			.catch(() => [] as fs.Dirent[]);

		for (const entry of entries) {
			const abs = path.join(currentDir, entry.name);
			const rel = relativeDir ? `${relativeDir}/${entry.name}` : entry.name;
			if (entry.isDirectory()) {
				await walk(abs, rel);
			} else if (entry.name.endsWith(".tsx")) {
				const withoutExt = rel.replace(/\.tsx$/i, "").replaceAll("\\", "/");
				results.push({
					// Extension required: mdx-bundler defaults extensionless paths to the
					// jsx loader, which cannot parse TypeScript (e.g. `import type`).
					importPath: `./${withoutExt}.tsx`,
					fullPath: abs,
				});
			}
		}
	}

	await walk(postDir, "");
	return results;
}

const posts = defineCollection({
	name: "posts",
	directory: "./src/content/posts",
	include: "**/post.{md,mdx}",
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		date: z.string(),
		draft: z.boolean().optional(),
		content: z.string(),
	}),
	transform: async (document, context) => {
		const collectionRoot = path.resolve(
			process.cwd(),
			context.collection.directory,
		);
		const dir = path.resolve(collectionRoot, document._meta.directory);
		const tsxFiles = await findTsxFilesUnderPostDir(dir);
		const sharedComponentsDir = path.join(
			collectionRoot,
			"..",
			"shared",
			"components",
		);
		const sharedEntries = await fsPromises
			.readdir(sharedComponentsDir)
			.catch(() => [] as string[]);

		const mdx = await compilePostMdx(document, {
			cwd: dir,
			files: (appender) => {
				for (const name of sharedEntries) {
					if (name.endsWith(".tsx") || name.endsWith(".ts")) {
						appender.file(
							`../../shared/components/${name}`,
							path.join(sharedComponentsDir, name),
						);
					}
				}
				for (const { importPath, fullPath } of tsxFiles) {
					appender.file(importPath, fullPath);
				}
			},
		});
		const dirSegments = document._meta.directory
			.replaceAll("\\", "/")
			.split("/")
			.filter(Boolean);
		const slug =
			dirSegments.at(-1) ?? document._meta.fileName.replace(/\.(md|mdx)$/i, "");
		return {
			...document,
			slug,
			mdx,
		};
	},
});

export default defineConfig({
	content: [posts],
});
