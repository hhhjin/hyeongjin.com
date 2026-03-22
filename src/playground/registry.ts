import type { ComponentType } from "react";

export type PlaygroundEntry = {
	slug: string;
	title: string;
	summary: string;
	cover?: string;
	Component: ComponentType;
};

export const playgroundEntries: PlaygroundEntry[] = [];

export function getPlaygroundEntry(slug: string): PlaygroundEntry | undefined {
	return playgroundEntries.find((e) => e.slug === slug);
}
