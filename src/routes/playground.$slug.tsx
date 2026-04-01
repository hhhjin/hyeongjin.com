import { createFileRoute, notFound } from "@tanstack/react-router";
import { getPlaygroundEntry } from "@/playground/registry";

export const Route = createFileRoute("/playground/$slug")({
	loader: ({ params }) => {
		const entry = getPlaygroundEntry(params.slug);
		if (!entry) throw notFound();
		return { slug: entry.slug };
	},
	component: PlaygroundDetailPage,
});

function PlaygroundDetailPage() {
	const { slug } = Route.useLoaderData();
	const entry = getPlaygroundEntry(slug);

	if (!entry) return null;

	const Component = entry.Component;
	return <Component />;
}
