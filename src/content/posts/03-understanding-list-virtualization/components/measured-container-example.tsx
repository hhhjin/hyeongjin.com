import type { Locale } from "@/paraglide/runtime";

const ITEMS = Array.from({ length: 10000 });

const ESTIMATED_ITEM_HEIGHT = 48;

export function MeasuredContainerExample({ lang }: { lang: Locale }) {
	const containerHeight = ESTIMATED_ITEM_HEIGHT * ITEMS.length;
	const copy =
		lang === "ko"
			? {
					spacerOnly: "여기서는 spacer 컨테이너만 렌더링됩니다.",
					heightPrefix: "높이는",
				}
			: {
					spacerOnly: "Only the spacer container is rendered here.",
					heightPrefix: "Its height is",
				};
	const numberLocale = lang === "ko" ? "ko-KR" : "en-US";

	return (
		<div className="relative h-88 w-full overflow-y-scroll">
			<div className="pointer-events-none absolute top-0 inset-x-4 flex h-full flex-col items-center justify-center text-center text-sm text-muted-foreground">
				<p>{copy.spacerOnly}</p>
				<p className="mt-2">
					{copy.heightPrefix} <br />
					<code className="rounded bg-muted px-1 py-0.5 text-foreground">
						{ESTIMATED_ITEM_HEIGHT} *{" "}
						{ITEMS.length.toLocaleString(numberLocale)} ={" "}
						{containerHeight.toLocaleString(numberLocale)}px
					</code>
				</p>
			</div>
			<div style={{ height: containerHeight }} />
		</div>
	);
}
