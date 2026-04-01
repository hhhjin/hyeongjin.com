import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { m } from "@/paraglide/messages";
import { playgroundEntries } from "@/playground/registry";

export const Route = createFileRoute("/playground/")({
	component: PlaygroundIndexPage,
});

function PlaygroundIndexPage() {
	const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
	const items = [...playgroundEntries].sort((a, b) =>
		a.title().localeCompare(b.title()),
	);

	return (
		<main className="page-wrap">
			<header className="mb-10">
				<h1 className="text-lg font-medium">{m.nav_playground()}</h1>
				<p className="text-sm text-muted-foreground">
					{m.playground_subtitle()}
				</p>
			</header>

			<ul className="m-0 grid list-none gap-8 p-0 sm:grid-cols-2 lg:grid-cols-3">
				{items.map((item) => (
					<li key={item.slug}>
						<Link
							to="/playground/$slug"
							params={{ slug: item.slug }}
							className="group block h-full no-underline"
							onMouseEnter={() => setHoveredSlug(item.slug)}
							onMouseLeave={() => setHoveredSlug(null)}
						>
							<article className="flex h-full flex-col">
								<div className="mb-4 aspect-video w-full overflow-hidden rounded-lg border bg-muted transition-colors group-hover:border-foreground/50">
									{item.Thumbnail ? (
										<item.Thumbnail isHovering={hoveredSlug === item.slug} />
									) : item.cover ? (
										<img
											src={item.cover}
											alt=""
											className="h-full w-full object-cover transition-transform group-hover:scale-105"
										/>
									) : null}
								</div>
								<h2 className="mb-2 text-lg font-medium text-foreground">
									{item.title()}
								</h2>
								<p className="m-0 flex-1 text-sm text-muted-foreground">
									{item.summary()}
								</p>
								<span className="mt-4 text-xs font-medium text-muted-foreground">
									{m.playground_view()}
								</span>
							</article>
						</Link>
					</li>
				))}
			</ul>
		</main>
	);
}
