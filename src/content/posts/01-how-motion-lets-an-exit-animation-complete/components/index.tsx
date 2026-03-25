import { ExampleFrame } from "@/content/shared/components/example-frame";
import type { Locale } from "@/paraglide/runtime";
import { ExitExample as ExitExampleDemo } from "./exit-example";
import exitExampleCodeHtml from "./exit-example.tsx?shiki";
import { ExitPresenceComparison as ExitPresenceComparisonDemo } from "./exit-presence-comparison";
import { NoPresenceExample as NoPresenceExampleDemo } from "./no-presence-example";
import noPresenceExampleCodeHtml from "./no-presence-example.tsx?shiki";

export function ExitExample({ lang }: { lang: Locale }) {
	return (
		<ExampleFrame
			className="items-start"
			codeHtml={exitExampleCodeHtml}
			lang={lang}
		>
			<ExitExampleDemo lang={lang} />
		</ExampleFrame>
	);
}

export function NoPresenceExample({ lang }: { lang: Locale }) {
	return (
		<ExampleFrame
			className="items-start"
			codeHtml={noPresenceExampleCodeHtml}
			lang={lang}
		>
			<NoPresenceExampleDemo lang={lang} />
		</ExampleFrame>
	);
}

export function ExitPresenceComparison({ lang }: { lang: Locale }) {
	return <ExitPresenceComparisonDemo lang={lang} />;
}
