import { allPosts } from "content-collections";
import { DEFAULT_POST_LOCALE } from "@/lib/post-locales";
import type { Locale } from "@/paraglide/runtime";

export type Post = (typeof allPosts)[number];

type PostVariantLike = {
	canonicalSlug: string;
	locale: string;
	draft?: boolean;
};

export function isPublishedPost(post: Pick<Post, "draft">) {
	return post.draft !== true;
}

function groupPublishedPosts<T extends PostVariantLike>(posts: readonly T[]) {
	const grouped = new Map<string, T[]>();

	for (const post of posts) {
		if (!isPublishedPost(post)) {
			continue;
		}

		const variants = grouped.get(post.canonicalSlug);
		if (variants) {
			variants.push(post);
			continue;
		}

		grouped.set(post.canonicalSlug, [post]);
	}

	return grouped;
}

function pickPostVariant<T extends PostVariantLike>(
	variants: readonly T[],
	locale: string,
	fallbackLocale = DEFAULT_POST_LOCALE,
) {
	const exactMatch = variants.find((post) => post.locale === locale);
	if (exactMatch) {
		return exactMatch;
	}

	const fallbackMatch = variants.find((post) => post.locale === fallbackLocale);
	if (fallbackMatch) {
		return fallbackMatch;
	}

	return [...variants].sort((a, b) => a.locale.localeCompare(b.locale))[0];
}

export function listResolvedPosts<T extends PostVariantLike>(
	posts: readonly T[],
	locale: string,
	fallbackLocale = DEFAULT_POST_LOCALE,
) {
	return [...groupPublishedPosts(posts).values()]
		.map((variants) => pickPostVariant(variants, locale, fallbackLocale))
		.filter((post): post is T => post !== undefined);
}

export function getResolvedPost<T extends PostVariantLike>(
	posts: readonly T[],
	slug: string,
	locale: string,
	fallbackLocale = DEFAULT_POST_LOCALE,
) {
	const variants = groupPublishedPosts(posts).get(slug);
	if (!variants) {
		return undefined;
	}

	return pickPostVariant(variants, locale, fallbackLocale);
}

export function listPublishedPosts(locale: Locale) {
	return listResolvedPosts(allPosts, locale);
}

export function getPublishedPost(slug: string, locale: Locale) {
	return getResolvedPost(allPosts, slug, locale);
}
