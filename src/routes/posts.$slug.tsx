import { MDXContent } from "@content-collections/mdx/react";
import { IconArrowLeft } from "@tabler/icons-react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { LanguageSelector } from "@/components/language-selector";
import { buttonVariants } from "@/components/ui/button";
import { getPublishedPost, listPublishedPosts } from "@/lib/posts";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";
import "@/styles/post.css";

type PostRouteLoaderData = {
	post: NonNullable<ReturnType<typeof getPublishedPost>>;
	prevPost: NonNullable<ReturnType<typeof getPublishedPost>> | null;
	nextPost: NonNullable<ReturnType<typeof getPublishedPost>> | null;
};

export const Route = createFileRoute("/posts/$slug")({
	head: ({ loaderData }: { loaderData?: PostRouteLoaderData }) => {
		const post = loaderData?.post;

		if (!post) {
			return { meta: [] };
		}

		return {
			meta: [
				{
					title: post.title,
				},
				{
					name: "description",
					content: post.summary,
				},
			],
		};
	},
	loader: ({ params }): PostRouteLoaderData => {
		const locale = getLocale();
		const post = getPublishedPost(params.slug, locale);
		if (!post) throw notFound();

		const allPosts = [...listPublishedPosts(locale)].sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
		);
		const currentIndex = allPosts.findIndex((p) => p.slug === params.slug);

		const prevPost =
			currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
		const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

		return { post, prevPost, nextPost };
	},
	component: PostPage,
});

function PostPage() {
	const { post, prevPost, nextPost } =
		Route.useLoaderData() as PostRouteLoaderData;

	return (
		<main className="page-wrap">
			<article>
				<div className="flex items-center justify-between">
					<Link
						to="/"
						aria-label={m.post_back_home()}
						title={m.post_back_home()}
						className={buttonVariants({ variant: "secondary", size: "icon" })}
					>
						<IconArrowLeft />
					</Link>
					<LanguageSelector />
				</div>
				<header className="my-16">
					<h1 className="text-xl font-medium">{post.title}</h1>
				</header>
				<div className="mt-16 prose">
					<MDXContent code={post.mdx} />
				</div>

				<nav className="mt-36 -mx-4 hidden md:flex justify-between gap-4">
					{prevPost ? (
						<Link
							to="/posts/$slug"
							params={{ slug: prevPost.slug }}
							className={cn(
								buttonVariants({ variant: "ghost" }),
								"h-auto min-w-0 flex-1 flex-col items-start gap-1 rounded-xl p-4 text-left",
							)}
						>
							<span className="w-full truncate text-sm text-muted-foreground">
								{m.post_previous()}
							</span>
							<span className="w-full truncate font-medium">
								{prevPost.title}
							</span>
						</Link>
					) : (
						<div className="flex-1" />
					)}
					{nextPost ? (
						<Link
							to="/posts/$slug"
							params={{ slug: nextPost.slug }}
							className={cn(
								buttonVariants({ variant: "ghost" }),
								"h-auto min-w-0 flex-1 flex-col items-end gap-1 rounded-xl p-4 text-right",
							)}
						>
							<span className="w-full truncate text-sm text-muted-foreground">
								{m.post_next()}
							</span>
							<span className="w-full truncate font-medium">
								{nextPost.title}
							</span>
						</Link>
					) : (
						<div className="flex-1" />
					)}
				</nav>
			</article>
		</main>
	);
}
