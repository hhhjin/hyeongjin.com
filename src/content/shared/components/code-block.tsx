import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { withDataLanguageOnPreAndCode } from "@/lib/highlight-data-language-html";
import { cn } from "@/lib/utils";

export function CodeBlock({
	codeHtml,
	className,
	id,
	language,
}: {
	/**
	 * Syntax-highlighted HTML (e.g. from `import html from "./snippet.tsx?shiki"`).
	 */
	codeHtml: string;
	className?: string;
	id?: string;
	/** When set, `data-language` is added on `<pre>` / `<code>` if not already present. */
	language?: string;
}) {
	const [copied, setCopied] = useState(false);
	const codeRef = useRef<HTMLDivElement>(null);

	async function handleCopyCode() {
		const text = codeRef.current?.textContent ?? "";
		if (!text) return;
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 2000);
		} catch {
			/* clipboard denied or unavailable */
		}
	}

	const html = useMemo(() => {
		if (!codeHtml.trim()) return "";
		if (!language?.trim()) return codeHtml;
		return withDataLanguageOnPreAndCode(codeHtml, language);
	}, [codeHtml, language]);

	if (!html) return null;

	return (
		<div className={cn("relative", className)} id={id}>
			<div className="absolute right-1 top-1 z-10">
				<Button
					type="button"
					variant="secondary"
					size="icon-xs"
					aria-label={copied ? "Copied" : "Copy code"}
					onClick={() => void handleCopyCode()}
				>
					{copied ? <IconCheck /> : <IconCopy />}
				</Button>
			</div>
			<div ref={codeRef} dangerouslySetInnerHTML={{ __html: html }} />
		</div>
	);
}
