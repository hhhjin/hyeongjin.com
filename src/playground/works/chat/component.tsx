import { IconArrowUp } from "@tabler/icons-react";
import { LayoutGroup, motion } from "motion/react";
import type { FormEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ChatMessage = {
	id: string;
	text: string;
};

const suggestedMessages = [
	"Can you review the animation?",
	"That bubble move is smooth.",
	"Let's add another transition next.",
];

const bubbleTransition = {
	type: "spring",
	stiffness: 720,
	damping: 42,
	mass: 0.55,
} as const;

function createMessageId() {
	return `message-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function Chat() {
	const [messages, setMessages] = useState<ChatMessage[]>([
		{ id: "intro-1", text: "Hey, what are you building today?" },
		{ id: "intro-2", text: "A chat animation using shared layout." },
	]);
	const [draft, setDraft] = useState("");
	const [draftId, setDraftId] = useState(createMessageId);
	const [pendingMessage, setPendingMessage] = useState<ChatMessage | null>(
		null,
	);
	const inputRef = useRef<HTMLInputElement>(null);
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const draftText = draft.trim();
	const canSend = draftText.length > 0 && !pendingMessage;

	const suggestion = useMemo(() => {
		return suggestedMessages[messages.length % suggestedMessages.length];
	}, [messages.length]);

	const scrollToLatestMessage = useCallback(
		(behavior: ScrollBehavior = "auto") => {
			const container = scrollContainerRef.current;
			if (!container) return;

			container.scrollTo({
				top: container.scrollHeight,
				behavior,
			});
		},
		[],
	);

	useEffect(() => {
		scrollToLatestMessage();
	}, [scrollToLatestMessage]);

	const sendMessage = (text: string) => {
		const nextText = text.trim();
		if (!nextText) return;

		const nextMessage = { id: draftId, text: nextText };
		setPendingMessage(nextMessage);
		setDraft("");

		requestAnimationFrame(() => {
			setMessages((prev) => [...prev, nextMessage]);
			setPendingMessage(null);
			setDraftId(createMessageId());
			inputRef.current?.focus();
			requestAnimationFrame(() => {
				scrollToLatestMessage("smooth");
			});
		});
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		sendMessage(draft);
	};

	return (
		<main className="fixed inset-0 bg-background text-foreground">
			<LayoutGroup>
				<div
					ref={scrollContainerRef}
					className="h-full overflow-y-auto px-4 pt-4 pb-24"
				>
					<div className="mx-auto flex min-h-full w-full max-w-2xl flex-col justify-end gap-3 pb-2">
						{messages.map((message, index) => {
							const isMine = index > 0;
							return (
								<motion.div
									key={message.id}
									layout
									className={`flex ${isMine ? "justify-end" : "justify-start"}`}
								>
									<motion.div
										layoutId={`chat-bubble-${message.id}`}
										transition={bubbleTransition}
										className={`max-w-[78%] rounded-[1.35rem] px-4 py-2.5 text-sm leading-relaxed ${
											isMine
												? "rounded-br-md bg-blue-600 text-white"
												: "rounded-bl-md bg-muted text-foreground"
										}`}
									>
										{message.text}
									</motion.div>
								</motion.div>
							);
						})}
					</div>
				</div>

				<form
					onSubmit={handleSubmit}
					className="fixed right-4 bottom-4 left-4 z-10 mx-auto flex max-w-2xl items-end gap-2"
				>
					<div className="relative isolate min-w-0 flex-1">
						{pendingMessage ? (
							<motion.div
								layoutId={`chat-bubble-${pendingMessage.id}`}
								transition={bubbleTransition}
								className="pointer-events-none absolute right-2 bottom-1.5 z-0 max-w-[76%] truncate rounded-[1.35rem] rounded-br-md bg-blue-600 px-4 py-2 text-sm text-white"
							>
								{pendingMessage.text}
							</motion.div>
						) : null}
						<Input
							ref={inputRef}
							value={draft}
							onChange={(event) => setDraft(event.target.value)}
							placeholder={suggestion}
							className="relative z-10 h-12 rounded-full pr-5 pl-5 bg-background text-sm shadow-none disabled:bg-background"
							autoFocus
						/>
					</div>
					<Button
						type="submit"
						size="icon"
						disabled={!canSend}
						className="relative z-10 size-12 rounded-full disabled:opacity-80"
						aria-label="Send message"
					>
						<IconArrowUp className="size-5" />
					</Button>
				</form>
			</LayoutGroup>
		</main>
	);
}
