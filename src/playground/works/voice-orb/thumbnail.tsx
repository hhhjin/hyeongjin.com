type VoiceOrbThumbnailProps = {
	isHovering?: boolean;
};

export function VoiceOrbThumbnail({
	isHovering = false,
}: VoiceOrbThumbnailProps) {
	return (
		<div className="flex h-full w-full items-center justify-center bg-white">
			<div
				className={[
					"aspect-square w-[24%] rounded-full shadow-[0_18px_32px_rgba(0,72,180,0.18)] transition-transform duration-300 ease-out",
					"bg-[radial-gradient(circle_at_32%_28%,#e1faff_0%,#2aacff_48%,#0058e2_100%)]",
					isHovering ? "scale-110" : "scale-100",
				].join(" ")}
			/>
		</div>
	);
}
