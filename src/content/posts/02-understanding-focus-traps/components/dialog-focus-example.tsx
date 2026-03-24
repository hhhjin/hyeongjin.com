"use client";

import { useId } from "react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { Label } from "@/components/ui/label";

export function DialogFocusExample() {
	const fieldId = useId();

	return (
		<div className="flex w-full max-w-2xl flex-col gap-4">
			<p className="text-center text-sm text-muted-foreground">
				Open the dialog, then press <Kbd>Tab</Kbd> and <Kbd>Shift</Kbd> +{" "}
				<Kbd>Tab</Kbd>
			</p>
			<div className="flex justify-center">
				<Dialog>
					<DialogTrigger render={<Button type="button" />}>
						Open dialog
					</DialogTrigger>
					<DialogContent className="sm:max-w-md">
						<DialogHeader>
							<DialogTitle>Trapped focus</DialogTitle>
							<DialogDescription>
								Tab through the fields below. The overlay blocks pointer events
								on the rest of the page; keyboard focus should stay here too.
							</DialogDescription>
						</DialogHeader>
						<div className="flex flex-col gap-3">
							<div className="flex flex-col gap-1">
								<Label
									htmlFor={fieldId}
									className="text-xs font-normal text-muted-foreground"
								>
									Name
								</Label>
								<Input
									id={fieldId}
									type="text"
									placeholder="Focus moves here in tab order"
								/>
							</div>
							<div className="flex flex-wrap justify-end gap-2">
								<DialogClose
									render={<Button type="button" variant="outline" />}
								>
									Cancel
								</DialogClose>
								<Button type="button">Save</Button>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}
