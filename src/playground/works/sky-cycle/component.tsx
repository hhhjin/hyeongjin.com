import { type RefObject, useEffect, useRef, useState } from "react";

type SkyKeyframe = {
	at: number;
	top: [number, number, number];
	upper: [number, number, number];
	horizon: [number, number, number];
	lower: [number, number, number];
	glow: [number, number, number];
	ambient: [number, number, number];
};

const skyKeyframes: SkyKeyframe[] = [
	{
		at: 0,
		top: [5, 9, 28],
		upper: [10, 18, 49],
		horizon: [20, 27, 61],
		lower: [15, 19, 43],
		glow: [57, 58, 113],
		ambient: [6, 9, 24],
	},
	{
		at: 4.5 / 24,
		top: [12, 23, 62],
		upper: [40, 56, 105],
		horizon: [151, 90, 126],
		lower: [229, 124, 99],
		glow: [234, 117, 93],
		ambient: [17, 22, 47],
	},
	{
		at: 5 / 24,
		top: [18, 36, 88],
		upper: [64, 83, 138],
		horizon: [191, 111, 132],
		lower: [222, 135, 116],
		glow: [222, 121, 113],
		ambient: [44, 49, 84],
	},
	{
		at: 6.5 / 24,
		top: [83, 143, 217],
		upper: [167, 205, 232],
		horizon: [255, 231, 145],
		lower: [255, 192, 141],
		glow: [255, 218, 143],
		ambient: [239, 242, 247],
	},
	{
		at: 10 / 24,
		top: [67, 137, 221],
		upper: [143, 194, 236],
		horizon: [217, 236, 231],
		lower: [234, 240, 228],
		glow: [255, 242, 177],
		ambient: [246, 248, 251],
	},
	{
		at: 13 / 24,
		top: [50, 119, 213],
		upper: [128, 188, 234],
		horizon: [211, 235, 236],
		lower: [230, 239, 232],
		glow: [255, 246, 187],
		ambient: [247, 249, 252],
	},
	{
		at: 16 / 24,
		top: [57, 121, 211],
		upper: [139, 190, 229],
		horizon: [232, 236, 211],
		lower: [246, 221, 178],
		glow: [255, 223, 151],
		ambient: [239, 241, 248],
	},
	{
		at: 17.5 / 24,
		top: [51, 104, 190],
		upper: [129, 174, 218],
		horizon: [255, 216, 134],
		lower: [255, 190, 139],
		glow: [255, 200, 121],
		ambient: [234, 237, 246],
	},
	{
		at: 18.7 / 24,
		top: [34, 63, 135],
		upper: [105, 123, 181],
		horizon: [242, 119, 137],
		lower: [255, 158, 112],
		glow: [255, 119, 105],
		ambient: [202, 207, 229],
	},
	{
		at: 19.7 / 24,
		top: [15, 25, 70],
		upper: [49, 61, 119],
		horizon: [147, 82, 133],
		lower: [207, 103, 100],
		glow: [188, 92, 132],
		ambient: [31, 35, 69],
	},
	{
		at: 21 / 24,
		top: [5, 9, 28],
		upper: [10, 18, 49],
		horizon: [20, 27, 61],
		lower: [15, 19, 43],
		glow: [57, 58, 113],
		ambient: [6, 9, 24],
	},
	{
		at: 1,
		top: [5, 9, 28],
		upper: [10, 18, 49],
		horizon: [20, 27, 61],
		lower: [15, 19, 43],
		glow: [57, 58, 113],
		ambient: [6, 9, 24],
	},
];

const startHour = 5;

function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
}

function smoothstep(edge0: number, edge1: number, value: number) {
	const x = clamp((value - edge0) / (edge1 - edge0), 0, 1);
	return x * x * (3 - 2 * x);
}

function mix(a: number, b: number, t: number) {
	return a + (b - a) * t;
}

function mixColor(
	a: [number, number, number],
	b: [number, number, number],
	t: number,
) {
	return [
		Math.round(mix(a[0], b[0], t)),
		Math.round(mix(a[1], b[1], t)),
		Math.round(mix(a[2], b[2], t)),
	] as [number, number, number];
}

function rgb(color: [number, number, number], alpha = 1) {
	return `rgb(${color[0]} ${color[1]} ${color[2]} / ${alpha})`;
}

function getSkyFrame(progress: number) {
	const p = ((progress % 1) + 1) % 1;
	const nextIndex = skyKeyframes.findIndex((frame) => frame.at >= p);
	const next =
		skyKeyframes[nextIndex === -1 ? skyKeyframes.length - 1 : nextIndex];
	const prev = skyKeyframes[Math.max(0, nextIndex - 1)];
	const span = next.at - prev.at || 1;
	const t = smoothstep(0, 1, (p - prev.at) / span);

	return {
		top: mixColor(prev.top, next.top, t),
		upper: mixColor(prev.upper, next.upper, t),
		horizon: mixColor(prev.horizon, next.horizon, t),
		lower: mixColor(prev.lower, next.lower, t),
		glow: mixColor(prev.glow, next.glow, t),
		ambient: mixColor(prev.ambient, next.ambient, t),
	};
}

function getSkyVisualState(progress: number) {
	const virtualHour = (startHour + progress * 24) % 24;
	const frame = getSkyFrame(virtualHour / 24);
	const daylightProgress = (virtualHour - 6) / 13;
	const sunArc = daylightProgress * Math.PI;
	const sunX = 8 + daylightProgress * 84;
	const sunY = 72 - Math.sin(sunArc) * 70;
	const sunAbove = smoothstep(112, 26, sunY);
	const duskBand = 1 - Math.abs(virtualHour / 24 - 0.58) / 0.2;
	const horizonLift = clamp(sunAbove * 11 + Math.max(0, duskBand) * 7, 0, 18);

	return {
		virtualHour,
		frame,
		skyBackground: [
			`linear-gradient(180deg, ${rgb(frame.top)} 0%, ${rgb(frame.upper)} 38%, ${rgb(frame.horizon)} ${64 - horizonLift}%, ${rgb(frame.lower)} 100%)`,
			`radial-gradient(circle at ${sunX}% ${sunY}%, ${rgb(frame.glow, 0.42)} 0%, ${rgb(frame.glow, 0.16)} 16%, transparent 42%)`,
		].join(", "),
		washBackground: `linear-gradient(180deg, transparent 0%, ${rgb(frame.ambient, 0.08)} 58%, ${rgb(frame.ambient, 0.34)} 100%)`,
	};
}

function getClockState(hour: number) {
	const totalMinutes = Math.floor(hour * 60) % 1440;
	const displayHour = Math.floor(totalMinutes / 60);
	const displayMinute = totalMinutes % 60;
	const hourAngle = ((displayHour % 12) + displayMinute / 60) * 30;
	const minuteAngle = displayMinute * 6;
	const timeLabel = `${displayHour.toString().padStart(2, "0")}:${displayMinute
		.toString()
		.padStart(2, "0")}`;

	return { hourAngle, minuteAngle, timeLabel };
}

export function SkyCycle() {
	const [progress, setProgress] = useState(0);
	const progressRef = useRef(0);
	const isWrappingRef = useRef(false);
	const skyLayerRef = useRef<HTMLDivElement>(null);
	const washLayerRef = useRef<HTMLDivElement>(null);
	const clockLabelRef = useRef<HTMLSpanElement>(null);
	const hourHandRef = useRef<HTMLSpanElement>(null);
	const minuteHandRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		let pendingFrame = 0;
		let wrapResetFrame = 0;
		const root = document.documentElement;
		const body = document.body;
		const previousRootOverscroll = root.style.overscrollBehavior;
		const previousBodyOverscroll = body.style.overscrollBehavior;
		const scrollbarStyle = document.createElement("style");

		scrollbarStyle.textContent = `
			.sky-cycle-scroll-hidden,
			.sky-cycle-scroll-hidden body {
				scrollbar-width: none;
				-ms-overflow-style: none;
				overscroll-behavior: contain;
			}

			.sky-cycle-scroll-hidden::-webkit-scrollbar,
			.sky-cycle-scroll-hidden body::-webkit-scrollbar {
				display: none;
				width: 0;
				height: 0;
			}
		`;
		document.head.appendChild(scrollbarStyle);
		root.classList.add("sky-cycle-scroll-hidden");
		root.style.overscrollBehavior = "contain";
		body.style.overscrollBehavior = "contain";

		const applyVisuals = (nextProgress: number) => {
			const visualState = getSkyVisualState(nextProgress);
			const clockState = getClockState(visualState.virtualHour);

			if (skyLayerRef.current) {
				skyLayerRef.current.style.background = visualState.skyBackground;
			}

			if (washLayerRef.current) {
				washLayerRef.current.style.background = visualState.washBackground;
			}

			if (clockLabelRef.current) {
				clockLabelRef.current.textContent = clockState.timeLabel;
			}

			if (hourHandRef.current) {
				hourHandRef.current.style.transform = `rotate(${
					clockState.hourAngle - 90
				}deg)`;
			}

			if (minuteHandRef.current) {
				minuteHandRef.current.style.transform = `rotate(${
					clockState.minuteAngle - 90
				}deg)`;
			}
		};

		const resetWrappingSoon = () => {
			if (wrapResetFrame) window.cancelAnimationFrame(wrapResetFrame);
			wrapResetFrame = window.requestAnimationFrame(() => {
				isWrappingRef.current = false;
				wrapResetFrame = 0;
			});
		};

		const updateProgress = () => {
			pendingFrame = 0;
			const maxScroll =
				document.documentElement.scrollHeight - window.innerHeight;
			if (maxScroll <= 0) {
				applyVisuals(0);
				setProgress(0);
				return;
			}

			const currentScrollY = window.scrollY;

			if (!isWrappingRef.current && currentScrollY >= maxScroll - 2) {
				isWrappingRef.current = true;
				window.scrollTo(0, 1);
				progressRef.current = 0;
				applyVisuals(0);
				setProgress(0);
				resetWrappingSoon();
				return;
			}

			const nextProgress = clamp(currentScrollY / maxScroll, 0, 1);
			if (Math.abs(nextProgress - progressRef.current) > 0.0001) {
				progressRef.current = nextProgress;
				applyVisuals(nextProgress);
				setProgress(nextProgress);
			}
		};

		const requestUpdate = () => {
			if (pendingFrame) return;
			pendingFrame = window.requestAnimationFrame(updateProgress);
		};

		const wrapToEnd = () => {
			const maxScroll =
				document.documentElement.scrollHeight - window.innerHeight;
			if (maxScroll <= 0) return;

			const nextScrollY = Math.max(1, maxScroll - 8);
			isWrappingRef.current = true;
			window.scrollTo(0, nextScrollY);

			const nextProgress = clamp(nextScrollY / maxScroll, 0, 1);
			progressRef.current = nextProgress;
			applyVisuals(nextProgress);
			setProgress(nextProgress);
			resetWrappingSoon();
		};

		const handleWheel = (event: WheelEvent) => {
			if (event.deltaY >= 0 || window.scrollY > 0 || isWrappingRef.current) {
				return;
			}

			event.preventDefault();
			wrapToEnd();
		};

		updateProgress();
		window.addEventListener("scroll", requestUpdate, { passive: true });
		window.addEventListener("resize", requestUpdate);
		window.addEventListener("wheel", handleWheel, { passive: false });

		return () => {
			if (pendingFrame) window.cancelAnimationFrame(pendingFrame);
			if (wrapResetFrame) window.cancelAnimationFrame(wrapResetFrame);
			scrollbarStyle.remove();
			root.classList.remove("sky-cycle-scroll-hidden");
			root.style.overscrollBehavior = previousRootOverscroll;
			body.style.overscrollBehavior = previousBodyOverscroll;
			window.removeEventListener("scroll", requestUpdate);
			window.removeEventListener("resize", requestUpdate);
			window.removeEventListener("wheel", handleWheel);
		};
	}, []);

	const visualState = getSkyVisualState(progress);

	return (
		<main className="relative min-h-[900dvh] bg-white">
			<section
				className="sticky top-0 h-dvh overflow-hidden"
				style={{
					background: rgb(visualState.frame.ambient),
				}}
			>
				<div
					ref={skyLayerRef}
					className="absolute inset-0"
					style={{
						background: visualState.skyBackground,
					}}
				/>
				<div
					ref={washLayerRef}
					className="absolute inset-0"
					style={{
						background: visualState.washBackground,
					}}
				/>
				<div
					className="absolute inset-0"
					style={{
						background:
							"radial-gradient(ellipse at 50% 50%, transparent 34%, rgb(0 0 0 / 0.08) 100%)",
					}}
				/>
				<SkyClock
					hour={visualState.virtualHour}
					clockLabelRef={clockLabelRef}
					hourHandRef={hourHandRef}
					minuteHandRef={minuteHandRef}
				/>
			</section>
		</main>
	);
}

function SkyClock({
	hour,
	clockLabelRef,
	hourHandRef,
	minuteHandRef,
}: {
	hour: number;
	clockLabelRef: RefObject<HTMLSpanElement | null>;
	hourHandRef: RefObject<HTMLSpanElement | null>;
	minuteHandRef: RefObject<HTMLSpanElement | null>;
}) {
	const clockState = getClockState(hour);

	return (
		<div className="pointer-events-none absolute top-5 right-5 z-10 flex flex-col items-center gap-2 text-white/86 sm:top-7 sm:right-7">
			<div className="relative size-20 rounded-full border border-white/36 bg-white/10 shadow-[0_18px_40px_rgb(0_0_0/0.14)] backdrop-blur-md sm:size-24">
				{Array.from({ length: 12 }, (_, index) => {
					const angle = index * 30;
					return (
						<span
							key={`tick-${angle}`}
							className="absolute top-1/2 left-1/2 h-px w-1.5 origin-left bg-white/60 sm:w-2"
							style={{
								transform: `rotate(${angle}deg) translateX(2.05rem)`,
							}}
						/>
					);
				})}
				<span
					ref={hourHandRef}
					className="absolute top-1/2 left-1/2 h-[2px] w-5 origin-left rounded-full bg-white/86 sm:w-6"
					style={{
						transform: `rotate(${clockState.hourAngle - 90}deg)`,
					}}
				/>
				<span
					ref={minuteHandRef}
					className="absolute top-1/2 left-1/2 h-px w-7 origin-left rounded-full bg-white/72 sm:w-8"
					style={{
						transform: `rotate(${clockState.minuteAngle - 90}deg)`,
					}}
				/>
				<span className="absolute top-1/2 left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
			</div>
			<span
				ref={clockLabelRef}
				className="rounded-full border border-white/24 bg-black/10 px-2.5 py-1 font-mono text-[11px] leading-none tracking-normal backdrop-blur-md"
			>
				{clockState.timeLabel}
			</span>
		</div>
	);
}
