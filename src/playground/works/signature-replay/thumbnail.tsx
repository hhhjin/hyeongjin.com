import { useEffect, useMemo, useRef } from "react";
import type { Point, Stroke } from "./types";

type SignatureReplayThumbnailProps = {
	/** When true (e.g. card hover on the playground index), play the drawing animation. */
	isHovering?: boolean;
};

// Fixed resolution for the SVG viewBox
const VIEWBOX_WIDTH = 1600;
const VIEWBOX_HEIGHT = 900;

// Convert a list of points to an SVG path string
const getPathData = (points: Point[]) => {
	if (points.length === 0) return "";
	return points
		.map((p, index) => {
			if (index === 0) {
				return points.length === 1
					? `M ${p.x.toFixed(2)} ${p.y.toFixed(2)} L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`
					: `M ${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
			}
			return `L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
		})
		.join(" ");
};

export function SignatureReplayThumbnail({
	isHovering = false,
}: SignatureReplayThumbnailProps) {
	const reqIdRef = useRef<number | undefined>(undefined);
	const pathRefs = useRef<(SVGPathElement | null)[]>([]);

	const strokes = useMemo(() => {
		const generatedStrokes: Stroke[] = [];
		let currentTime = 0;

		// 1. Face outline (Circle)
		const face: Point[] = [];
		const facePoints = 100;
		for (let i = 0; i <= facePoints; i++) {
			const t = i / facePoints;
			const angle = -Math.PI / 2 + t * 2 * Math.PI; // start at top
			const x = 800 + 300 * Math.cos(angle);
			const y = 450 + 300 * Math.sin(angle);

			// Speed curve: slower at start/end, faster in middle
			const speed = Math.sin(t * Math.PI);
			const dt = 25 - 20 * speed; // ranges from 5ms to 25ms per point
			currentTime += dt;

			face.push({ x, y, time: currentTime });
		}
		generatedStrokes.push({ points: face });

		currentTime += 180; // pause before next stroke

		// 2. Left Eye
		const leftEye: Point[] = [];
		const eyePoints = 15;
		for (let i = 0; i <= eyePoints; i++) {
			const t = i / eyePoints;
			// Small downward stroke
			const x = 680;
			const y = 330 + 40 * t;

			const speed = Math.sin(t * Math.PI);
			const dt = 20 - 14 * speed; // 6ms to 20ms
			currentTime += dt;

			leftEye.push({ x, y, time: currentTime });
		}
		generatedStrokes.push({ points: leftEye });

		currentTime += 150;

		// 3. Right Eye
		const rightEye: Point[] = [];
		for (let i = 0; i <= eyePoints; i++) {
			const t = i / eyePoints;
			// Small downward stroke
			const x = 920;
			const y = 330 + 40 * t;

			const speed = Math.sin(t * Math.PI);
			const dt = 20 - 14 * speed;
			currentTime += dt;

			rightEye.push({ x, y, time: currentTime });
		}
		generatedStrokes.push({ points: rightEye });

		currentTime += 250; // slightly longer pause before smile

		// 4. Smile
		const smile: Point[] = [];
		const smilePoints = 60;
		for (let i = 0; i <= smilePoints; i++) {
			const t = i / smilePoints;
			const x = 650 + 300 * t;
			const y = 520 + 100 * Math.sin(t * Math.PI);

			const speed = Math.sin(t * Math.PI);
			const dt = 22 - 17 * speed; // 5ms to 22ms
			currentTime += dt;

			smile.push({ x, y, time: currentTime });
		}
		generatedStrokes.push({ points: smile });

		return generatedStrokes;
	}, []);

	useEffect(() => {
		if (!isHovering) {
			if (reqIdRef.current !== undefined) {
				cancelAnimationFrame(reqIdRef.current);
				reqIdRef.current = undefined;
			}
			return;
		}

		// Clear paths for animation start
		strokes.forEach((_, i) => {
			const pathEl = pathRefs.current[i];
			if (pathEl) {
				pathEl.setAttribute("d", "");
			}
		});

		const allPointsWithStrokeIndex: {
			point: Point;
			strokeIndex: number;
		}[] = [];

		strokes.forEach((stroke, strokeIndex) => {
			stroke.points.forEach((point) => {
				allPointsWithStrokeIndex.push({
					point,
					strokeIndex,
				});
			});
		});

		if (allPointsWithStrokeIndex.length === 0) return;

		const firstTime = allPointsWithStrokeIndex[0].point.time;
		let startTime = 0;
		let currentIndex = 0;
		let cancelled = false;

		// Keep track of points drawn per stroke to generate path string
		const currentStrokePoints: Point[][] = strokes.map(() => []);

		const animate = (timestamp: number) => {
			if (cancelled) return;
			if (!startTime) startTime = timestamp;
			const elapsed = timestamp - startTime;

			let pathUpdated = false;

			while (currentIndex < allPointsWithStrokeIndex.length) {
				const { point, strokeIndex } = allPointsWithStrokeIndex[currentIndex];
				const targetTime = point.time - firstTime;

				if (elapsed >= targetTime) {
					currentStrokePoints[strokeIndex].push(point);
					pathUpdated = true;
					currentIndex++;
				} else {
					break;
				}
			}

			if (pathUpdated) {
				// Update DOM for active strokes
				currentStrokePoints.forEach((points, i) => {
					if (points.length > 0) {
						const pathEl = pathRefs.current[i];
						if (pathEl) {
							pathEl.setAttribute("d", getPathData(points));
						}
					}
				});
			}

			if (cancelled) return;
			if (currentIndex < allPointsWithStrokeIndex.length) {
				reqIdRef.current = requestAnimationFrame(animate);
			}
		};

		reqIdRef.current = requestAnimationFrame(animate);

		return () => {
			cancelled = true;
			if (reqIdRef.current !== undefined) {
				cancelAnimationFrame(reqIdRef.current);
				reqIdRef.current = undefined;
			}
		};
	}, [isHovering, strokes]);

	return (
		<div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
			<svg
				viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
				preserveAspectRatio="xMidYMid meet"
				className="w-full h-full block"
				aria-hidden="true"
			>
				{strokes.map((stroke, i) => {
					return (
						<path
							key={stroke.points[0].time}
							ref={(el) => {
								pathRefs.current[i] = el;
							}}
							d={isHovering ? "" : getPathData(stroke.points)}
							fill="none"
							stroke="currentColor"
							strokeWidth={12}
							strokeLinecap="round"
							strokeLinejoin="round"
							vectorEffect="nonScalingStroke"
						/>
					);
				})}
			</svg>
		</div>
	);
}
