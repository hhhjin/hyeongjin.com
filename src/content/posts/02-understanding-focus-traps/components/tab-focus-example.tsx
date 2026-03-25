import { useId } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { Locale } from "@/paraglide/runtime";

export function TabFocusExample({ lang }: { lang: Locale }) {
	const inputId = useId();
	const copy =
		lang === "ko"
			? {
					button: "버튼",
					label: "라벨",
					placeholder: "이름을 입력하세요",
				}
			: {
					button: "Button",
					label: "Label",
					placeholder: "Enter your name",
				};

	return (
		<div className="flex w-full max-w-2xl flex-col gap-4">
			<p className="text-center text-sm text-muted-foreground">
				{lang === "ko" ? (
					<>
						<Kbd>Tab</Kbd>과 <Kbd>Shift</Kbd> + <Kbd>Tab</Kbd>으로 컨트롤 사이의
						포커스를 이동해 보세요.
					</>
				) : (
					<>
						Press <Kbd>Tab</Kbd> and <Kbd>Shift</Kbd> + <Kbd>Tab</Kbd> to move
						focus between controls.
					</>
				)}
			</p>
			<div className="flex flex-wrap items-end justify-center gap-4">
				<Button type="button">{copy.button}</Button>
				<div className="flex flex-col gap-1">
					<Label
						htmlFor={inputId}
						className="text-xs font-normal text-muted-foreground"
					>
						{copy.label}
					</Label>
					<Input
						id={inputId}
						type="text"
						placeholder={copy.placeholder}
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
