import { ExampleFrame } from "@/content/shared/components/example-frame";
import { ExitExample } from "./exit-example";
import { NoPresenceExample } from "./no-presence-example";

export function ExitPresenceComparison() {
	return (
		<ExampleFrame className="items-start gap-16">
			<div>
				<div>With AnimatePresence</div>
				<ExitExample />
			</div>
			<div>
				<div>Without AnimatePresence</div>
				<NoPresenceExample />
			</div>
		</ExampleFrame>
	);
}
