import { useMemo, useState } from "react";
import type { Locale } from "@/paraglide/runtime";

const ITEMS = Array.from({ length: 10000 }, (_, index) => ({
	id: index,
}));

const ITEM_HEIGHT = 48;
const VIEWPORT_HEIGHT = 240;

type ItemMeasurement = {
	index: number;
	key: number;
	start: number;
	end: number;
	size: number;
};

function buildMeasurements() {
	return ITEMS.map((item, index) => {
		const start = index * ITEM_HEIGHT;
		const end = start + ITEM_HEIGHT;

		return {
			index,
			key: item.id,
			start,
			end,
			size: ITEM_HEIGHT,
		} satisfies ItemMeasurement;
	});
}

function getVirtualItems({
	measurements,
	scrollTop,
	viewportHeight,
}: {
	measurements: ItemMeasurement[];
	scrollTop: number;
	viewportHeight: number;
}) {
	const viewportStart = scrollTop;
	const viewportEnd = scrollTop + viewportHeight;

	const firstVisibleIndex = measurements.findIndex(
		(item) => item.end > viewportStart,
	);

	if (firstVisibleIndex === -1) {
		return [];
	}

	let lastVisibleIndex = firstVisibleIndex;

	while (
		lastVisibleIndex < measurements.length &&
		measurements[lastVisibleIndex].start < viewportEnd
	) {
		lastVisibleIndex += 1;
	}

	return measurements.slice(firstVisibleIndex, lastVisibleIndex);
}

export function VirtualItemsExample({ lang }: { lang: Locale }) {
	const [scrollTop, setScrollTop] = useState(0);
	const measurements = useMemo(buildMeasurements, []);
	const copy =
		lang === "ko"
			? {
					visibleCalculation: "보이는 범위 계산",
					scrollTop: "스크롤 상단 위치",
					viewportHeight: "뷰포트 높이",
					mountedRows: "마운트된 행",
					range: "범위",
					currentlyReturned: "현재 getVirtualItems()가 반환한 값",
					renderedRows: "렌더링된 행",
					start: "시작",
					mountedNote: "왼쪽에 표시된 인덱스만 실제로 DOM에 마운트됩니다.",
					itemLabel: (index: number) => `항목 ${index + 1}`,
				}
			: {
					visibleCalculation: "Visible calculation",
					scrollTop: "Scroll top",
					viewportHeight: "Viewport height",
					mountedRows: "Mounted rows",
					range: "Range",
					currentlyReturned: "Currently returned by getVirtualItems()",
					renderedRows: "Rendered rows",
					start: "start",
					mountedNote:
						"Only the indexes listed on the left are actually mounted in the DOM.",
					itemLabel: (index: number) => `Item ${index + 1}`,
				};

	const virtualItems = useMemo(
		() =>
			getVirtualItems({
				measurements,
				scrollTop,
				viewportHeight: VIEWPORT_HEIGHT,
			}),
		[measurements, scrollTop],
	);

	return (
		<div className="flex w-full max-w-4xl flex-col gap-4">
			<div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
				<div className="p-3">
					<p className="mb-3">{copy.visibleCalculation}</p>
					<dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-sm">
						<dt>{copy.scrollTop}</dt>
						<dd>{Math.round(scrollTop)}px</dd>
						<dt>{copy.viewportHeight}</dt>
						<dd>{VIEWPORT_HEIGHT}px</dd>
						<dt>{copy.mountedRows}</dt>
						<dd>{virtualItems.length}</dd>
						<dt>{copy.range}</dt>
						<dd>
							{virtualItems[0]?.index ?? 0} -{" "}
							{virtualItems[virtualItems.length - 1]?.index ?? 0}
						</dd>
					</dl>

					<div className="mt-4">
						<p className="mb-2 text-sm">{copy.currentlyReturned}</p>
						<div className="flex flex-wrap gap-2 text-xs">
							{virtualItems.map((item) => (
								<span className="rounded-full border px-2 py-1" key={item.key}>
									#{item.index}
								</span>
							))}
						</div>
					</div>
				</div>

				<div className="p-3">
					<p className="mb-2">{copy.renderedRows}</p>
					<div
						className="relative overflow-y-auto rounded-lg border"
						onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
						style={{ height: VIEWPORT_HEIGHT }}
					>
						<div
							className="relative"
							style={{
								height: measurements[measurements.length - 1]?.end ?? 0,
							}}
						>
							{virtualItems.map((item) => (
								<div
									className="absolute inset-x-0 flex items-center border-b px-4 text-sm"
									key={item.key}
									style={{
										height: item.size,
										transform: `translateY(${item.start}px)`,
									}}
								>
									<span className="font-medium">
										{copy.itemLabel(item.index)}
									</span>
									<span className="ml-auto text-xs text-muted-foreground">
										{copy.start}: {item.start}px
									</span>
								</div>
							))}
						</div>
					</div>
					<p className="mt-2 text-xs text-muted-foreground">
						{copy.mountedNote}
					</p>
				</div>
			</div>
		</div>
	);
}
