import { ExampleFrame } from "@/content/shared/components/example-frame";
import { DialogFocusExample as DialogFocusExampleDemo } from "./dialog-focus-example";
import { TabFocusExample as TabFocusExampleDemo } from "./tab-focus-example";

export function TabFocusExample() {
	return (
		<ExampleFrame className="items-start py-6">
			<TabFocusExampleDemo />
		</ExampleFrame>
	);
}

export function DialogFocusExample() {
	return (
		<ExampleFrame className="items-start py-6">
			<DialogFocusExampleDemo />
		</ExampleFrame>
	);
}
