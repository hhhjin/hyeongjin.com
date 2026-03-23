export const POST_LOCALES = ["en", "ko"] as const;

export type PostLocale = (typeof POST_LOCALES)[number];

export const DEFAULT_POST_LOCALE: PostLocale = "en";

const supportedPostLocales = new Set<string>(POST_LOCALES);

export function parsePostFileLocale(fileName: string): PostLocale {
	if (/^post\.(md|mdx)$/i.test(fileName)) {
		return DEFAULT_POST_LOCALE;
	}

	const match = /^post\.([^.]+)\.(md|mdx)$/i.exec(fileName);
	if (!match) {
		throw new Error(
			`Unsupported post filename "${fileName}". Expected "post.mdx" or "post.<locale>.mdx".`,
		);
	}

	const locale = match[1];
	if (!supportedPostLocales.has(locale)) {
		throw new Error(
			`Unsupported post locale "${locale}" in "${fileName}". Supported locales: ${POST_LOCALES.join(", ")}.`,
		);
	}

	return locale as PostLocale;
}
