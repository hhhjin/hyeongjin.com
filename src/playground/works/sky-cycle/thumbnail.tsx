type SkyCycleThumbnailProps = {
	isHovering?: boolean;
};

export function SkyCycleThumbnail({
	isHovering = false,
}: SkyCycleThumbnailProps) {
	return (
		<div className="relative h-full w-full overflow-hidden bg-[linear-gradient(180deg,#286ee0_0%,#65b8f0_34%,#ffe76a_56%,#ff8750_74%,#e73878_100%)]">
			<div
				className={[
					"absolute inset-0 bg-[linear-gradient(180deg,#24468f_0%,#4f86cc_28%,#d9d7a8_52%,#ff9a55_68%,#d83c83_86%,#5d347f_100%)] transition-opacity duration-500 ease-out",
					isHovering ? "opacity-100" : "opacity-0",
				].join(" ")}
			/>
			<div
				className={[
					"absolute inset-x-[-8%] bottom-[-18%] h-[64%] bg-[radial-gradient(ellipse_at_center,rgba(255,216,80,0.8)_0%,rgba(255,118,74,0.54)_38%,rgba(231,56,120,0)_72%)] blur-xl transition-transform duration-500 ease-out",
					isHovering ? "translate-y-[8%] scale-95" : "translate-y-0 scale-100",
				].join(" ")}
			/>
			<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.22)_100%)]" />
		</div>
	);
}
