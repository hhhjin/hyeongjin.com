import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CodeBlock({
	codeHtml,
	className,
	id,
}: {
	/**
	 * Syntax-highlighted HTML (e.g. from `import html from "./snippet.tsx?shiki"`).
	 */
	codeHtml: string;
	className?: string;
	id?: string;
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

	if (!codeHtml.trim()) return null;

	return (
		<div
			className={cn(
				"relative max-h-[min(24rem,70vh)] overflow-auto rounded-md border border-border bg-background",
				className,
			)}
			id={id}
		>
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
			<div className="text-sm leading-relaxed [&_pre.shiki]:m-0 [&_pre.shiki]:max-w-none [&_pre.shiki]:[tab-size:2] [&_pre.shiki]:rounded-md [&_pre.shiki]:border-0 [&_pre.shiki]:px-3 [&_pre.shiki]:pt-3 [&_pre.shiki]:pb-3 [&_pre.shiki]:font-mono [&_pre.shiki]:text-sm">
				<div ref={codeRef} dangerouslySetInnerHTML={{ __html: codeHtml }} />
			</div>
		</div>
	);
}
