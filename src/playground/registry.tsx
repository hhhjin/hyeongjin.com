import type { ComponentType } from "react";
import { m } from "@/paraglide/messages";
import { Chat, ChatThumbnail } from "./works/chat";
import {
	SignatureReplay,
	SignatureReplayThumbnail,
} from "./works/signature-replay";
import { VoiceOrbEntry, VoiceOrbThumbnail } from "./works/voice-orb";

export type PlaygroundThumbnailProps = { isHovering?: boolean };

export type PlaygroundEntry = {
	slug: string;
	title: () => string;
	summary: () => string;
	cover?: string;
	Thumbnail?: ComponentType<PlaygroundThumbnailProps>;
	Component: ComponentType;
};

export const playgroundEntries: PlaygroundEntry[] = [
	{
		slug: "voice-orb",
		title: m.voice_orb_title,
		summary: m.voice_orb_summary,
		Thumbnail: VoiceOrbThumbnail,
		Component: VoiceOrbEntry,
	},
	{
		slug: "chat",
		title: m.chat_title,
		summary: m.chat_summary,
		Thumbnail: ChatThumbnail,
		Component: Chat,
	},
	{
		slug: "signature-replay",
		title: m.signature_replay_title,
		summary: m.signature_replay_summary,
		Thumbnail: SignatureReplayThumbnail,
		Component: SignatureReplay,
	},
];

export function getPlaygroundEntry(slug: string): PlaygroundEntry | undefined {
	return playgroundEntries.find((e) => e.slug === slug);
}
