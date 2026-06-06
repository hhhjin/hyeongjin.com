import { lazy, Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

const LazySkyCycle = lazy(() =>
	import("./component").then((module) => ({
		default: module.SkyCycle,
	})),
);

export function SkyCycleEntry() {
	return (
		<Suspense
			fallback={
				<main className="fixed inset-0 flex items-center justify-center bg-white text-foreground">
					<Spinner className="size-6 text-muted-foreground" />
				</main>
			}
		>
			<LazySkyCycle />
		</Suspense>
	);
}
