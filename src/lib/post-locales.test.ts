import { describe, expect, it } from "vitest";
import { parsePostFileLocale } from "@/lib/post-locales";

describe("parsePostFileLocale", () => {
	it("maps legacy post.mdx files to english", () => {
		expect(parsePostFileLocale("post.mdx")).toBe("en");
	});

	it("parses explicit locale suffixes", () => {
		expect(parsePostFileLocale("post.ko.mdx")).toBe("ko");
	});

	it("rejects unsupported locale suffixes", () => {
		expect(() => parsePostFileLocale("post.jp.mdx")).toThrow(
			'Unsupported post locale "jp"',
		);
	});
});
