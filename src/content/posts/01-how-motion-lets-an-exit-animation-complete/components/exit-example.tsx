import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/paraglide/runtime";

export function ExitExample({ lang }: { lang: Locale }) {
	const [open, setOpen] = useState(true);
	const copy =
		lang === "ko"
			? {
					toggle: "토글",
					message: "안녕!",
				}
			: {
					toggle: "Toggle",
					message: "Hello!",
				};

	return (
		<div className="text-center">
			<Button onClick={() => setOpen((v) => !v)}>{copy.toggle}</Button>
			<AnimatePresence>
				{open ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						{copy.message}
					</motion.div>
				) : null}
			</AnimatePresence>
		</div>
	);
}
