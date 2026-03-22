import { createFileRoute, Link } from "@tanstack/react-router";
import { buttonVariants } from "@/components/ui/button";
import { publishedPosts } from "@/lib/posts";
import { m } from "@/paraglide/messages";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
	const sorted = [...publishedPosts].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);

	return (
		<main className="page-wrap space-y-24">
			<section className="flex justify-between">
				<div>
					<h1 className="text-xl font-medium">{m.meta_default_title()}</h1>
					<p className="text-sm text-muted-foreground">{m.home_role()}</p>
				</div>

				<div>
					<Link
						to="/playground"
						className={buttonVariants({ variant: "ghost" })}
					>
						{m.nav_playground()}<span>→</span>
					</Link>
				</div>
			</section>

			<section className="space-y-8">
				<h3 className="text-lg font-medium">{m.home_posts_kicker()}</h3>
				{sorted.map((post) => (
					<article key={post.slug}>
						<Link
							to="/posts/$slug"
							params={{ slug: post.slug }}
							className="block no-underline -mx-4 rounded-xl px-4 pt-3 pb-4 transition-[background-color,scale] hover:bg-muted dark:hover:bg-muted/50 active:scale-99"
						>
							<h2 className="mb-1 text-lg font-medium">{post.title}</h2>
							<p className="text-sm text-muted-foreground">{post.summary}</p>
						</Link>
					</article>
				))}
			</section>
		</main>
	);
}
