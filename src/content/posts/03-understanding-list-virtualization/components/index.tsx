import { ExampleFrame } from "@/content/shared/components/example-frame";
import { MeasuredContainerExample as MeasuredContainerExampleDemo } from "./measured-container-example";
import { ScrollToIndexExample as ScrollToIndexExampleDemo } from "./scroll-to-index-example";
import { VirtualItemsExample as VirtualItemsExampleDemo } from "./virtual-items-example";

export function MeasuredContainerExample() {
	return (
		<ExampleFrame className="p-0">
			<MeasuredContainerExampleDemo />
		</ExampleFrame>
	);
}

export function VirtualItemsExample() {
	return (
		<ExampleFrame>
			<VirtualItemsExampleDemo />
		</ExampleFrame>
	);
}

export function ScrollToIndexExample() {
	return (
		<ExampleFrame>
			<ScrollToIndexExampleDemo />
		</ExampleFrame>
	);
}
