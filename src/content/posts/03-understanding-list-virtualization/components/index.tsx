import { ExampleFrame } from "@/content/shared/components/example-frame";
import type { Locale } from "@/paraglide/runtime";
import { MeasuredContainerExample as MeasuredContainerExampleDemo } from "./measured-container-example";
import { ScrollToIndexExample as ScrollToIndexExampleDemo } from "./scroll-to-index-example";
import { VirtualItemsExample as VirtualItemsExampleDemo } from "./virtual-items-example";

export function MeasuredContainerExample({ lang }: { lang: Locale }) {
	return (
		<ExampleFrame className="p-0" lang={lang}>
			<MeasuredContainerExampleDemo lang={lang} />
		</ExampleFrame>
	);
}

export function VirtualItemsExample({ lang }: { lang: Locale }) {
	return (
		<ExampleFrame lang={lang}>
			<VirtualItemsExampleDemo lang={lang} />
		</ExampleFrame>
	);
}

export function ScrollToIndexExample({ lang }: { lang: Locale }) {
	return (
		<ExampleFrame lang={lang}>
			<ScrollToIndexExampleDemo lang={lang} />
		</ExampleFrame>
	);
}
