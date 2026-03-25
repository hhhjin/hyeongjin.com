const ITEMS = Array.from({ length: 10000 }, (_, index) => ({
	id: index,
	label: `Item ${index + 1}`,
}));

const ESTIMATED_ITEM_HEIGHT = 48;

export function MeasuredContainerExample() {
	const containerHeight = ESTIMATED_ITEM_HEIGHT * ITEMS.length;

	return (
		<div className="relative h-88 w-full overflow-y-scroll">
			<div className="pointer-events-none absolute top-0 inset-x-4 flex h-full flex-col items-center justify-center text-center text-sm text-muted-foreground">
				<p>Only the spacer container is rendered here.</p>
				<p className="mt-2">
					Its height is <br />
					<code className="rounded bg-muted px-1 py-0.5 text-foreground">
						{ESTIMATED_ITEM_HEIGHT} * {ITEMS.length.toLocaleString()} ={" "}
						{containerHeight.toLocaleString()}px
					</code>
				</p>
			</div>
			<div style={{ height: containerHeight }} />
		</div>
	);
}
