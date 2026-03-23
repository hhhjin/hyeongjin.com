import { MDXContent } from "@content-collections/mdx/react";
import { IconArrowLeft } from "@tabler/icons-react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { buttonVariants } from "@/components/ui/button";
import { publishedPosts } from "@/lib/posts";
import "@/styles/post.css";

export const Route = createFileRoute("/posts/$slug")({
	loader: ({ params }) => {
		const post = publishedPosts.find((p) => p.slug === params.slug);
		if (!post) throw notFound();
		return { post };
	},
	component: PostPage,
});

function PostPage() {
	const { post } = Route.useLoaderData();

	return (
		<main className="page-wrap">
			<article>
				<Link
					to="/"
					className={buttonVariants({ variant: "secondary", size: "icon" })}
				>
					<IconArrowLeft />
				</Link>
				<header className="my-8">
					<h1 className="text-xl font-medium">{post.title}</h1>
				</header>
				<div className="mt-16 prose">
					<MDXContent code={post.mdx} />
				</div>
			</article>
		</main>
	);
}
