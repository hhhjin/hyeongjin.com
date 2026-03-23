import { Link } from "@tanstack/react-router";
import { buttonVariants } from "./ui/button";

export function NotFound() {
	return (
		<div className="h-screen flex items-center justify-center">
			<div className="mb-24 flex flex-col items-center gap-4">
				<h1 className="text-4xl font-medium">Not Found</h1>
				<Link to="/" className={buttonVariants({ variant: "ghost" })}>
					Back to home
				</Link>
			</div>
		</div>
	);
}
