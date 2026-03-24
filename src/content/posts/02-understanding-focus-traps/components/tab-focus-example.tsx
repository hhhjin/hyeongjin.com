import { useId } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function TabFocusExample() {
	const inputId = useId();

	return (
		<div className="flex w-full max-w-2xl flex-col gap-4">
			<p className="text-center text-sm text-muted-foreground">
				Press <Kbd>Tab</Kbd> and <Kbd>Shift</Kbd> + <Kbd>Tab</Kbd> to move focus
				between controls.
			</p>
			<div className="flex flex-wrap items-end justify-center gap-4">
				<Button type="button">Button</Button>
				<div className="flex flex-col gap-1">
					<Label
						htmlFor={inputId}
						className="text-xs font-normal text-muted-foreground"
					>
						Label
					</Label>
					<Input
						id={inputId}
						type="text"
						placeholder="Enter your name"
						className="w-44"
					/>
				</div>
				<div
					// biome-ignore lint/a11y/noNoninteractiveTabindex: demo of tabindex on a custom region (topic of the post)
					tabIndex={0}
					className={cn(
						"flex h-8 cursor-default items-center rounded-lg border border-dashed border-border px-3 text-sm",
						"outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50",
					)}
				>
					<code className="text-xs">tabIndex={0}</code>
				</div>
			</div>
		</div>
	);
}
