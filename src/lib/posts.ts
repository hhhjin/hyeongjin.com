import { allPosts } from "content-collections";

export type Post = (typeof allPosts)[number];

export function isPublishedPost(post: Post) {
	return post.draft !== true;
}

export const publishedPosts = allPosts.filter(isPublishedPost);
