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
import type { Locale } from "@/paraglide/runtime";

export function DialogFocusExample({ lang }: { lang: Locale }) {
	const fieldId = useId();
	const copy =
		lang === "ko"
			? {
					openDialog: "다이얼로그 열기",
					title: "갇힌 포커스",
					description:
						"아래 필드를 탭으로 이동해 보세요. 오버레이는 페이지 나머지 영역의 포인터 이벤트를 막고, 키보드 포커스도 이 안에 머물러야 합니다.",
					name: "이름",
					placeholder: "탭 순서에 따라 포커스가 여기로 이동합니다",
					cancel: "취소",
					save: "저장",
				}
			: {
					openDialog: "Open dialog",
					title: "Trapped focus",
					description:
						"Tab through the fields below. The overlay blocks pointer events on the rest of the page; keyboard focus should stay here too.",
					name: "Name",
					placeholder: "Focus moves here in tab order",
					cancel: "Cancel",
					save: "Save",
				};

	return (
		<div className="flex w-full max-w-2xl flex-col gap-4">
			<p className="text-center text-sm text-muted-foreground">
				{lang === "ko" ? (
					<>
						다이얼로그를 연 뒤 <Kbd>Tab</Kbd>과 <Kbd>Shift</Kbd> +{" "}
						<Kbd>Tab</Kbd>을 눌러 보세요
					</>
				) : (
					<>
						Open the dialog, then press <Kbd>Tab</Kbd> and <Kbd>Shift</Kbd> +{" "}
						<Kbd>Tab</Kbd>
					</>
				)}
			</p>
			<div className="flex justify-center">
				<Dialog>
					<DialogTrigger render={<Button type="button" />}>
						{copy.openDialog}
					</DialogTrigger>
					<DialogContent className="sm:max-w-md">
						<DialogHeader>
							<DialogTitle>{copy.title}</DialogTitle>
							<DialogDescription>{copy.description}</DialogDescription>
						</DialogHeader>
						<div className="flex flex-col gap-3">
							<div className="flex flex-col gap-1">
								<Label
									htmlFor={fieldId}
									className="text-xs font-normal text-muted-foreground"
								>
									{copy.name}
								</Label>
								<Input
									id={fieldId}
									type="text"
									placeholder={copy.placeholder}
								/>
							</div>
							<div className="flex flex-wrap justify-end gap-2">
								<DialogClose
									render={<Button type="button" variant="outline" />}
								>
									{copy.cancel}
								</DialogClose>
								<Button type="button">{copy.save}</Button>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}
