import { ExampleFrame } from "@/content/shared/components/example-frame";
import { ExitExample } from "./exit-example";
import { NoPresenceExample } from "./no-presence-example";

export function ExitPresenceComparison() {
	return (
		<ExampleFrame className="justify-center">
			<ExitExample />
			<NoPresenceExample />
		</ExampleFrame>
	);
}
