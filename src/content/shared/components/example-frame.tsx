import type { ReactNode } from "react";
import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/content/shared/components/code-block";
import { cn } from "@/lib/utils";

export function ExampleFrame({
	children,
	codeHtml,
	className,
}: {
	children: ReactNode;
	/** Syntax-highlighted HTML (e.g. `?shiki` import). */
	codeHtml?: string;
	className?: string;
}) {
	const [showCode, setShowCode] = useState(false);
	const codeRegionId = useId();
	const hasCode = Boolean(codeHtml?.trim());

	return (
		<div className="flex flex-col gap-2 my-10">
			<div
				className={cn(
					"flex items-center justify-center w-full min-h-32 gap-3 border border-border bg-[color-mix(in_oklch,var(--muted)_30%,transparent)] p-4 rounded-lg",
					className,
				)}
			>
				{children}
			</div>
			{codeHtml && hasCode ? (
				<>
					<div
						className={cn(
							"grid transition-all duration-300 ease-in-out",
							showCode ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
						)}
					>
						<div
							className={cn(
								"overflow-hidden transition-all duration-300 ease-in-out",
								showCode
									? "opacity-100 [clip-path:inset(0)]"
									: "opacity-0 [clip-path:inset(0_0_100%_0)]",
							)}
						>
							<CodeBlock codeHtml={codeHtml} id={codeRegionId} />
						</div>
					</div>
					<div className={cn("flex justify-center", !showCode && "-mt-2")}>
						<Button
							type="button"
							variant="ghost"
							size="xs"
							className="text-muted-foreground"
							aria-expanded={showCode}
							aria-controls={codeRegionId}
							onClick={() => setShowCode((v) => !v)}
						>
							{showCode ? "Hide code" : "View code"}
						</Button>
					</div>
				</>
			) : null}
		</div>
	);
}
