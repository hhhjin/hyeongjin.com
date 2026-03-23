import { cloudflare } from "@cloudflare/vite-plugin";
import contentCollections from "@content-collections/vite";
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { contentCollectionsLiveReload } from "./content-tools/content-collections-live-reload";
import { vitePluginShikiImport } from "./content-tools/vite-plugin-shiki-import";

const config = defineConfig(({ mode }) => {
	const isTest = mode === "test";

	return {
		plugins: [
			cloudflare({ viteEnvironment: { name: "ssr" } }),
			vitePluginShikiImport(),
			devtools(),
			contentCollections({
				isEnabled: (config) => config.mode !== "test",
			}),
			...(!isTest ? [contentCollectionsLiveReload()] : []),
			tsconfigPaths({ projects: ["./tsconfig.json"] }),
			paraglideVitePlugin({
				project: "./project.inlang",
				outdir: "./src/paraglide",
				outputStructure: "message-modules",
				emitGitIgnore: false,
				emitTsDeclarations: true,
				strategy: ["url", "cookie", "preferredLanguage", "baseLocale"],
				cookieName: "PARAGLIDE_LOCALE",
				urlPatterns: [
					{
						pattern: "/",
						localized: [
							["en", "/"],
							["ko", "/ko"],
						],
					},
					{
						pattern: "/playground",
						localized: [
							["en", "/playground"],
							["ko", "/ko/playground"],
						],
					},
					{
						pattern: "/playground/:slug",
						localized: [
							["en", "/playground/:slug"],
							["ko", "/ko/playground/:slug"],
						],
					},
					{
						pattern: "/posts/:slug",
						localized: [
							["en", "/posts/:slug"],
							["ko", "/ko/posts/:slug"],
						],
					},
					{
						pattern: "/:path(.*)?",
						localized: [
							["en", "/:path(.*)?"],
							["ko", "/ko/:path(.*)?"],
						],
					},
				],
			}),
			tailwindcss(),
			tanstackStart(),
			viteReact(),
		],
	};
});

export default config;
