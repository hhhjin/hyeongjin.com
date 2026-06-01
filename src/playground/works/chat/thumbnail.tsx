import { LayoutGroup, motion } from "motion/react";

type ChatThumbnailProps = {
	isHovering?: boolean;
};

const bubbleTransition = {
	type: "spring",
	stiffness: 720,
	damping: 42,
	mass: 0.55,
} as const;

export function ChatThumbnail({ isHovering = false }: ChatThumbnailProps) {
	return (
		<div className="h-full w-full bg-background p-4 text-foreground">
			<LayoutGroup>
				<div className="flex h-full translate-y-2 flex-col justify-end gap-1.5 p-3">
					<motion.div layout className="flex justify-start">
						<motion.div
							layoutId="chat-thumbnail-bubble-intro"
							transition={bubbleTransition}
							className="max-w-[72%] rounded-2xl rounded-bl-sm bg-muted px-3 py-1.5 text-[11px] leading-tight"
						>
							Are you free?
						</motion.div>
					</motion.div>
					<motion.div layout className="flex justify-end">
						<motion.div
							layoutId="chat-thumbnail-bubble-reply"
							animate={{
								opacity: isHovering ? 1 : 0,
								y: isHovering ? 8 : 30,
								scale: isHovering ? 1 : 0.92,
							}}
							transition={bubbleTransition}
							className="max-w-[74%] rounded-2xl rounded-br-sm bg-blue-600 px-3 py-1.5 text-[11px] leading-tight text-white"
						>
							Yeah, what's up?
						</motion.div>
					</motion.div>
				</div>
			</LayoutGroup>
		</div>
	);
}
