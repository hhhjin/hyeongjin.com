import { describe, expect, it } from "vitest";
import { getCanonicalPostSlug, stripPostOrderPrefix } from "@/lib/post-slugs";

describe("stripPostOrderPrefix", () => {
	it("removes a leading numeric ordering prefix", () => {
		expect(
			stripPostOrderPrefix("01-how-motion-lets-an-exit-animation-complete"),
		).toBe("how-motion-lets-an-exit-animation-complete");
	});

	it("leaves unprefixed slugs unchanged", () => {
		expect(stripPostOrderPrefix("motion-exit")).toBe("motion-exit");
	});
});

describe("getCanonicalPostSlug", () => {
	it("uses the final directory segment as the canonical slug", () => {
		expect(
			getCanonicalPostSlug(
				"nested/01-how-motion-lets-an-exit-animation-complete",
				"post.mdx",
			),
		).toBe("how-motion-lets-an-exit-animation-complete");
	});

	it("falls back to the file name when there is no directory segment", () => {
		expect(getCanonicalPostSlug("", "post.mdx")).toBe("post");
	});
});
