export function escapeHtmlAttr(value: string): string {
	return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function injectDataLanguageOnOpenTag(
	html: string,
	element: "pre" | "code",
	esc: string,
): string {
	const open = `<${element}`;
	const idx = html.indexOf(open);
	if (idx < 0) return html;
	const afterName = idx + open.length;
	const gt = html.indexOf(">", idx);
	if (gt < 0) return html;
	const openTag = html.slice(idx, gt + 1);
	if (/\bdata-language\s*=/.test(openTag)) return html;
	return `${html.slice(0, afterName)} data-language="${esc}"${html.slice(afterName)}`;
}

/** Adds `data-language` on the first `<pre>` and `<code>` when missing (Shiki block output). */
export function withDataLanguageOnPreAndCode(
	html: string,
	language: string,
): string {
	const esc = escapeHtmlAttr(language.trim());
	let out = injectDataLanguageOnOpenTag(html, "pre", esc);
	out = injectDataLanguageOnOpenTag(out, "code", esc);
	return out;
}
