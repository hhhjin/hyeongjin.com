import { IconChevronDown, IconLanguage } from "@tabler/icons-react";
import { buttonVariants } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages";
import {
	getLocale,
	type Locale,
	locales,
	setLocale,
} from "@/paraglide/runtime";

function nativeLanguageLabel(locale: Locale) {
	if (locale === "en") return m.lang_en({}, { locale: "en" });
	return m.lang_ko({}, { locale: "ko" });
}

export function Footer() {
	const current = getLocale();

	return (
		<footer className="mt-auto">
			<div className="page-wrap flex justify-end py-6">
				<DropdownMenu>
					<DropdownMenuTrigger
						type="button"
						aria-label={m.lang_switch_label()}
						className={cn(
							buttonVariants({ variant: "ghost", size: "sm" }),
							"text-muted-foreground hover:text-foreground",
						)}
					>
						<IconLanguage className="size-4 shrink-0" aria-hidden />
						<span className="max-w-48 truncate">
							{nativeLanguageLabel(current)}
						</span>
						<IconChevronDown
							className="size-4 shrink-0 opacity-60"
							aria-hidden
						/>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="min-w-36">
						{locales.map((loc) => (
							<DropdownMenuItem
								key={loc}
								disabled={loc === current}
								onClick={() => {
									void setLocale(loc);
								}}
							>
								{nativeLanguageLabel(loc)}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</footer>
	);
}
