import fs from "node:fs/promises";
import path from "node:path";
import type { Plugin as EsbuildPlugin } from "esbuild";
import type { BundledLanguage } from "shiki";
import { createHighlighter } from "shiki";

import { withDataLanguageOnPreAndCode } from "../src/lib/highlight-data-language-html.ts";

/** Grammars loaded once for all `?shiki` imports (extend when you add new languages). */
const BUNDLED_LANGS = [
	"tsx",
	"typescript",
	"javascript",
	"jsx",
	"js",
	"css",
	"json",
	"md",
	"mdx",
] as const satisfies readonly BundledLanguage[];

let highlighter: Awaited<ReturnType<typeof createHighlighter>> | null = null;

async function getHighlighter() {
	if (!highlighter) {
		highlighter = await createHighlighter({
			themes: ["github-light", "github-dark"],
			langs: [...BUNDLED_LANGS],
		});
	}
	return highlighter;
}

/**
 * Parse `./file.tsx?shiki` or `./file.tsx?shiki&lang=css` (relative or absolute path before `?`).
 */
export function parseShikiImportRequest(
	specifier: string,
): { path: string; lang: string } | null {
	const q = specifier.indexOf("?");
	if (q < 0) return null;
	const base = specifier.slice(0, q);
	const query = specifier.slice(q + 1);
	if (query !== "shiki" && !query.startsWith("shiki&")) return null;
	const rest = query === "shiki" ? "" : query.slice("shiki&".length);
	const lang = new URLSearchParams(rest).get("lang") ?? "tsx";
	return { path: base, lang };
}

export async function renderShikiHtml(code: string, lang: string) {
	const h = await getHighlighter();
	const html = await h.codeToHtml(code, {
		lang: lang as BundledLanguage,
		themes: {
			light: "github-light",
			dark: "github-dark",
		},
	});
	return withDataLanguageOnPreAndCode(html, lang);
}

export function esbuildShikiImportPlugin(): EsbuildPlugin {
	return {
		name: "shiki-import",
		setup(build) {
			build.onResolve({ filter: /\?shiki/ }, (args) => {
				const parsed = parseShikiImportRequest(args.path);
				if (!parsed) return;
				return {
					path: path.resolve(args.resolveDir, parsed.path),
					namespace: "shiki-import",
					pluginData: { lang: parsed.lang },
				};
			});
			build.onLoad(
				{ filter: /.*/, namespace: "shiki-import" },
				async (args) => {
					const lang = (args.pluginData as { lang: string }).lang;
					const text = await fs.readFile(args.path, "utf-8");
					const html = await renderShikiHtml(text, lang);
					return {
						contents: `export default ${JSON.stringify(html)};`,
						loader: "js",
					};
				},
			);
		},
	};
}
