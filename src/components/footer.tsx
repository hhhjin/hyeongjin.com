import { useRouterState } from "@tanstack/react-router";
import { LanguageSelector } from "@/components/language-selector";

type FooterProps = {
	showLanguageSelector?: boolean;
};

export function Footer({ showLanguageSelector }: FooterProps) {
	const pathname = useRouterState({
		select: (state) => state.location.pathname,
	});
	const shouldShowLanguageSelector =
		showLanguageSelector ?? !pathname.startsWith("/posts/");

	return (
		<footer className="mt-auto">
			<div className="page-wrap flex justify-end py-6">
				{shouldShowLanguageSelector ? (
					<LanguageSelector chevronDirection="up" contentAlign="end" />
				) : null}
			</div>
		</footer>
	);
}
