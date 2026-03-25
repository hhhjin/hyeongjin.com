import { useMemo, useRef, useState } from "react";
import type { Locale } from "@/paraglide/runtime";

const ITEMS = Array.from({ length: 10000 }, (_, index) => ({
	id: index,
}));

const ITEM_HEIGHT = 48;
const VIEWPORT_HEIGHT = 240;
const OVERSCAN = 3;

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

	const startIndex = Math.max(0, firstVisibleIndex - OVERSCAN);
	const endIndex = Math.min(measurements.length, lastVisibleIndex + OVERSCAN);

	return measurements.slice(startIndex, endIndex);
}

export function ScrollToIndexExample({ lang }: { lang: Locale }) {
	const [scrollTop, setScrollTop] = useState(0);
	const [targetIndex, setTargetIndex] = useState(2500);
	const viewportRef = useRef<HTMLDivElement | null>(null);
	const measurements = useMemo(buildMeasurements, []);
	const copy =
		lang === "ko"
			? {
					title: "scrollToIndex()",
					targetIndex: "목표 인덱스",
					top: "맨 위",
					bottom: "맨 아래",
					go: "이동",
					currentScrollTop: "현재 scrollTop",
					targetOffset: "목표 오프셋",
					renderedRows: "렌더링된 행",
					start: "시작",
					jumpNote:
						"특정 인덱스로 점프하는 일은 그 행의 `start` 오프셋으로 스크롤 컨테이너를 설정하는 것과 같습니다.",
					itemLabel: (index: number) => `항목 ${index + 1}`,
				}
			: {
					title: "scrollToIndex()",
					targetIndex: "Target index",
					top: "Top",
					bottom: "Bottom",
					go: "Go",
					currentScrollTop: "Current scrollTop",
					targetOffset: "Target offset",
					renderedRows: "Rendered rows",
					start: "start",
					jumpNote:
						"Jumping to an index is just setting the scroll container to that row's `start` offset.",
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

	const clampedTargetIndex = Math.min(
		Math.max(0, targetIndex),
		measurements.length - 1,
	);
	const targetMeasurement = measurements[clampedTargetIndex];

	function scrollToIndex(index: number) {
		const nextIndex = Math.min(Math.max(0, index), measurements.length - 1);
		const measurement = measurements[nextIndex];

		if (!measurement) {
			return;
		}

		viewportRef.current?.scrollTo({
			top: measurement.start,
			behavior: "smooth",
		});
		setTargetIndex(nextIndex);
	}

	return (
		<div className="flex w-full max-w-4xl flex-col gap-4">
			<div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
				<div className="p-3">
					<p className="mb-3">{copy.title}</p>
					<div className="flex flex-col gap-3 text-sm">
						<label className="flex flex-col gap-1">
							<span>{copy.targetIndex}</span>
							<input
								className="rounded-md border bg-background px-3 py-2"
								max={ITEMS.length - 1}
								min={0}
								onChange={(event) =>
									setTargetIndex(Number(event.currentTarget.value))
								}
								type="number"
								value={targetIndex}
							/>
						</label>

						<div className="flex flex-wrap gap-2">
							<button
								className="rounded-md border px-3 py-2"
								onClick={() => scrollToIndex(0)}
								type="button"
							>
								{copy.top}
							</button>
							<button
								className="rounded-md border px-3 py-2"
								onClick={() => scrollToIndex(2500)}
								type="button"
							>
								#2500
							</button>
							<button
								className="rounded-md border px-3 py-2"
								onClick={() => scrollToIndex(9999)}
								type="button"
							>
								{copy.bottom}
							</button>
							<button
								className="rounded-md border px-3 py-2"
								onClick={() => scrollToIndex(targetIndex)}
								type="button"
							>
								{copy.go}
							</button>
						</div>

						<dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2">
							<dt>{copy.currentScrollTop}</dt>
							<dd>{Math.round(scrollTop)}px</dd>
							<dt>{copy.targetIndex}</dt>
							<dd>{clampedTargetIndex}</dd>
							<dt>{copy.targetOffset}</dt>
							<dd>{targetMeasurement?.start ?? 0}px</dd>
						</dl>
					</div>
				</div>

				<div className="p-3">
					<p className="mb-2">{copy.renderedRows}</p>
					<div
						className="relative overflow-y-auto rounded-lg border"
						onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
						ref={viewportRef}
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
					<p className="mt-2 text-xs text-muted-foreground">{copy.jumpNote}</p>
				</div>
			</div>
		</div>
	);
}
