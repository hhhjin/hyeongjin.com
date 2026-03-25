import { ExampleFrame } from "@/content/shared/components/example-frame";
import type { Locale } from "@/paraglide/runtime";
import { ExitExample } from "./exit-example";
import { NoPresenceExample } from "./no-presence-example";

export function ExitPresenceComparison({ lang }: { lang: Locale }) {
	const copy =
		lang === "ko"
			? {
					withAnimatePresence: "AnimatePresence 사용",
					withoutAnimatePresence: "AnimatePresence 없이",
				}
			: {
					withAnimatePresence: "With AnimatePresence",
					withoutAnimatePresence: "Without AnimatePresence",
				};

	return (
		<ExampleFrame className="items-start gap-16" lang={lang}>
			<div>
				<div>{copy.withAnimatePresence}</div>
				<ExitExample lang={lang} />
			</div>
			<div>
				<div>{copy.withoutAnimatePresence}</div>
				<NoPresenceExample lang={lang} />
			</div>
		</ExampleFrame>
	);
}
