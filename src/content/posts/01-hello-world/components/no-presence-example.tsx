import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function NoPresenceExample() {
	const [open, setOpen] = useState(true);

	return (
		<div className="text-center">
			<Button onClick={() => setOpen((v) => !v)}>Toggle</Button>
			{open ? (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					Hello!
				</motion.div>
			) : null}
		</div>
	);
}
