import fs from "node:fs/promises";
import type { Plugin } from "vite";
import { parseShikiImportRequest, renderShikiHtml } from "./shiki-prerender";

export function vitePluginShikiImport(): Plugin {
	return {
		name: "vite-plugin-shiki-import",
		enforce: "pre",
		async load(id) {
			const parsed = parseShikiImportRequest(id);
			if (!parsed) return null;
			const text = await fs.readFile(parsed.path, "utf-8");
			const html = await renderShikiHtml(text, parsed.lang);
			return `export default ${JSON.stringify(html)};`;
		},
	};
}
