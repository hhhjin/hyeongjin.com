import { ExampleFrame } from "@/content/shared/components/example-frame";
import type { Locale } from "@/paraglide/runtime";
import { DialogFocusExample as DialogFocusExampleDemo } from "./dialog-focus-example";
import { TabFocusExample as TabFocusExampleDemo } from "./tab-focus-example";

export function TabFocusExample({ lang }: { lang: Locale }) {
	return (
		<ExampleFrame className="items-start py-6" lang={lang}>
			<TabFocusExampleDemo lang={lang} />
		</ExampleFrame>
	);
}

export function DialogFocusExample({ lang }: { lang: Locale }) {
	return (
		<ExampleFrame className="items-start py-6" lang={lang}>
			<DialogFocusExampleDemo lang={lang} />
		</ExampleFrame>
	);
}
