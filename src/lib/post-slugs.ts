function getLastPathSegment(pathLike: string) {
	return pathLike.replaceAll("\\", "/").split("/").filter(Boolean).at(-1);
}

export function stripPostOrderPrefix(slug: string) {
	return slug.replace(/^\d+-/, "");
}

export function getCanonicalPostSlug(directory: string, fileName: string) {
	const rawSlug =
		getLastPathSegment(directory) ?? fileName.replace(/\.(md|mdx)$/i, "");

	return stripPostOrderPrefix(rawSlug);
}
