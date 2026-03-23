import { ExampleFrame } from "@/content/shared/components/example-frame";
import { ExitExample as ExitExampleDemo } from "./exit-example";
import exitExampleCodeHtml from "./exit-example.tsx?shiki";
import { NoPresenceExample as NoPresenceExampleDemo } from "./no-presence-example";
import noPresenceExampleCodeHtml from "./no-presence-example.tsx?shiki";

export { ExitPresenceComparison } from "./exit-presence-comparison";

export function ExitExample() {
	return (
		<ExampleFrame className="items-start" codeHtml={exitExampleCodeHtml}>
			<ExitExampleDemo />
		</ExampleFrame>
	);
}

export function NoPresenceExample() {
	return (
		<ExampleFrame className="items-start" codeHtml={noPresenceExampleCodeHtml}>
			<NoPresenceExampleDemo />
		</ExampleFrame>
	);
}
