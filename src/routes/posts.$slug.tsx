import { MDXContent } from "@content-collections/mdx/react";
import { IconArrowLeft } from "@tabler/icons-react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { LanguageSelector } from "@/components/language-selector";
import { buttonVariants } from "@/components/ui/button";
import { getPublishedPost } from "@/lib/posts";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";
import "@/styles/post.css";

type PostRouteLoaderData = {
	post: NonNullable<ReturnType<typeof getPublishedPost>>;
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
		const post = getPublishedPost(params.slug, getLocale());
		if (!post) throw notFound();
		return { post };
	},
	component: PostPage,
});

function PostPage() {
	const { post } = Route.useLoaderData() as PostRouteLoaderData;

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
			</article>
		</main>
	);
}
