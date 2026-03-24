import {
	IconChevronDown,
	IconChevronUp,
	IconLanguage,
} from "@tabler/icons-react";
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

type LanguageSelectorProps = {
	className?: string;
	chevronDirection?: "down" | "up";
	contentAlign?: "start" | "end";
};

export function LanguageSelector({
	className,
	chevronDirection = "down",
	contentAlign = "end",
}: LanguageSelectorProps) {
	const current = getLocale();
	const ChevronIcon =
		chevronDirection === "up" ? IconChevronUp : IconChevronDown;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				type="button"
				aria-label={m.lang_switch_label()}
				className={cn(
					buttonVariants({ variant: "ghost" }),
					"text-muted-foreground hover:text-foreground",
					className,
				)}
			>
				<IconLanguage className="size-4 shrink-0" aria-hidden />
				<span className="max-w-48 truncate">
					{nativeLanguageLabel(current)}
				</span>
				<ChevronIcon className="size-4 shrink-0 opacity-60" aria-hidden />
			</DropdownMenuTrigger>
			<DropdownMenuContent align={contentAlign} className="min-w-32">
				{locales.map((loc) => {
					return (
						<DropdownMenuItem
							key={loc}
							disabled={loc === current}
							onClick={() => setLocale(loc)}
						>
							{nativeLanguageLabel(loc)}
						</DropdownMenuItem>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
