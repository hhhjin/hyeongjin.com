import { createFileRoute, Link } from "@tanstack/react-router";
import { m } from "@/paraglide/messages";
import { playgroundEntries } from "@/playground/registry";

export const Route = createFileRoute("/playground/")({
	component: PlaygroundIndexPage,
});

function PlaygroundIndexPage() {
	const items = [...playgroundEntries].sort((a, b) =>
		a.title.localeCompare(b.title),
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
							className="block h-full no-underline"
						>
							<article className="flex h-full flex-col">
								{item.cover ? (
									<div className="mb-4 aspect-video w-full overflow-hidden bg-muted">
										<img
											src={item.cover}
											alt=""
											className="h-full w-full object-cover"
										/>
									</div>
								) : null}
								<h2 className="mb-2 text-lg font-semibold text-foreground">
									{item.title}
								</h2>
								<p className="m-0 flex-1 text-sm text-muted-foreground">
									{item.summary}
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
