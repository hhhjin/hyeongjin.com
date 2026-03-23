import { describe, expect, it } from "vitest";
import { getResolvedPost, listResolvedPosts } from "@/lib/posts";

type FixturePost = {
	canonicalSlug: string;
	locale: string;
	title: string;
	draft?: boolean;
};

describe("listResolvedPosts", () => {
	it("returns the exact locale variant when available", () => {
		const posts: FixturePost[] = [
			{ canonicalSlug: "motion-exit", locale: "en", title: "English" },
			{ canonicalSlug: "motion-exit", locale: "ko", title: "한국어" },
		];

		expect(listResolvedPosts(posts, "ko")).toEqual([
			{ canonicalSlug: "motion-exit", locale: "ko", title: "한국어" },
		]);
	});

	it("falls back to english when the requested locale is missing", () => {
		const posts: FixturePost[] = [
			{ canonicalSlug: "motion-exit", locale: "en", title: "English" },
		];

		expect(listResolvedPosts(posts, "ko")).toEqual([
			{ canonicalSlug: "motion-exit", locale: "en", title: "English" },
		]);
	});

	it("returns one published post per canonical slug", () => {
		const posts: FixturePost[] = [
			{ canonicalSlug: "motion-exit", locale: "en", title: "English" },
			{ canonicalSlug: "motion-exit", locale: "ko", title: "한국어" },
			{ canonicalSlug: "presence", locale: "en", title: "Presence" },
		];

		expect(listResolvedPosts(posts, "ko")).toHaveLength(2);
		expect(
			listResolvedPosts(posts, "ko").map((post) => post.canonicalSlug),
		).toEqual(["motion-exit", "presence"]);
	});

	it("ignores draft variants before locale fallback", () => {
		const posts: FixturePost[] = [
			{
				canonicalSlug: "motion-exit",
				locale: "en",
				title: "English",
			},
			{
				canonicalSlug: "motion-exit",
				locale: "ko",
				title: "한국어",
				draft: true,
			},
		];

		expect(listResolvedPosts(posts, "ko")).toEqual([
			{ canonicalSlug: "motion-exit", locale: "en", title: "English" },
		]);
	});
});

describe("getResolvedPost", () => {
	it("treats legacy english variants as the fallback locale", () => {
		const posts: FixturePost[] = [
			{ canonicalSlug: "motion-exit", locale: "en", title: "Legacy English" },
			{ canonicalSlug: "motion-exit", locale: "ko", title: "한국어" },
		];

		expect(getResolvedPost(posts, "motion-exit", "ja")).toEqual({
			canonicalSlug: "motion-exit",
			locale: "en",
			title: "Legacy English",
		});
	});
});
