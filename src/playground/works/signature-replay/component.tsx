import { IconEraser, IconPlayerPlayFilled } from "@tabler/icons-react";
import {
	type PointerEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { m } from "@/paraglide/messages";
import type { Point, Stroke } from "./types";

export function SignatureReplay() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [strokes, setStrokes] = useState<Stroke[]>([]);
	const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
	const [isDrawing, setIsDrawing] = useState(false);
	const [isReplaying, setIsReplaying] = useState(false);

	const strokesRef = useRef<Stroke[]>([]);
	const currentStrokeRef = useRef<Stroke | null>(null);

	useEffect(() => {
		strokesRef.current = strokes;
	}, [strokes]);

	useEffect(() => {
		currentStrokeRef.current = currentStroke;
	}, [currentStroke]);

	const redraw = useCallback((ctx: CanvasRenderingContext2D) => {
		const drawStroke = (stroke: Stroke) => {
			stroke.points.forEach((point, index) => {
				if (index === 0) {
					ctx.beginPath();
					ctx.moveTo(point.x, point.y);
					ctx.lineTo(point.x, point.y);
					ctx.stroke();
				} else {
					const prevPoint = stroke.points[index - 1];
					ctx.beginPath();
					ctx.moveTo(prevPoint.x, prevPoint.y);
					ctx.lineTo(point.x, point.y);
					ctx.stroke();
				}
			});
		};

		strokesRef.current.forEach(drawStroke);
		if (currentStrokeRef.current) {
			drawStroke(currentStrokeRef.current);
		}
	}, []);

	const updateCanvasSize = useCallback(() => {
		const canvas = canvasRef.current;
		const container = containerRef.current;
		if (!canvas || !container) return;

		const rect = container.getBoundingClientRect();
		const dpr = window.devicePixelRatio || 1;
		canvas.width = rect.width * dpr;
		canvas.height = rect.height * dpr;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		ctx.scale(dpr, dpr);
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
		ctx.lineWidth = 3;
		ctx.strokeStyle = getComputedStyle(canvas).color;

		// If we're resizing, we need to redraw
		redraw(ctx);
	}, [redraw]);

	// Initial setup and resize listener
	useEffect(() => {
		updateCanvasSize();
		const handleResize = () => updateCanvasSize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [updateCanvasSize]);

	const startDrawing = (e: PointerEvent<HTMLCanvasElement>) => {
		if (isReplaying) return;

		const canvas = canvasRef.current;
		if (!canvas) return;

		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		setIsDrawing(true);
		const newPoint = { x, y, time: performance.now() };
		setCurrentStroke({ points: [newPoint] });

		const ctx = canvas.getContext("2d");
		if (ctx) {
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(x, y);
			ctx.stroke();
		}

		canvas.setPointerCapture(e.pointerId);
	};

	const draw = (e: PointerEvent<HTMLCanvasElement>) => {
		if (!isDrawing || !currentStroke || isReplaying) return;

		const canvas = canvasRef.current;
		if (!canvas) return;

		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const newPoint = { x, y, time: performance.now() };
		setCurrentStroke((prev) => {
			if (!prev) return null;
			return { points: [...prev.points, newPoint] };
		});

		const ctx = canvas.getContext("2d");
		if (ctx) {
			const lastPoint = currentStroke.points[currentStroke.points.length - 1];
			ctx.beginPath();
			ctx.moveTo(lastPoint.x, lastPoint.y);
			ctx.lineTo(x, y);
			ctx.stroke();
		}
	};

	const endDrawing = (e: PointerEvent<HTMLCanvasElement>) => {
		if (!isDrawing || isReplaying) return;

		const canvas = canvasRef.current;
		if (canvas) {
			canvas.releasePointerCapture(e.pointerId);
		}

		setIsDrawing(false);
		if (currentStroke && currentStroke.points.length > 0) {
			setStrokes((prev) => [...prev, currentStroke]);
		}
		setCurrentStroke(null);
	};

	const clearCanvas = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const rect = canvas.getBoundingClientRect();
		ctx.clearRect(0, 0, rect.width, rect.height);
	}, []);

	const handleReset = () => {
		if (isReplaying) return;
		clearCanvas();
		setStrokes([]);
		setCurrentStroke(null);
	};

	const handleReplay = () => {
		if (strokes.length === 0 || isReplaying) return;

		setIsReplaying(true);
		clearCanvas();

		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d");
		if (!ctx) {
			setIsReplaying(false);
			return;
		}

		// Flatten all points and compute relative times
		const allPoints: { point: Point; isStart: boolean }[] = [];
		strokes.forEach((stroke) => {
			stroke.points.forEach((point, index) => {
				allPoints.push({
					point,
					isStart: index === 0,
				});
			});
		});

		if (allPoints.length === 0) {
			setIsReplaying(false);
			return;
		}

		const firstTime = allPoints[0].point.time;
		let startTime = 0;
		let currentIndex = 0;
		let reqId: number;

		const animate = (timestamp: number) => {
			if (!startTime) startTime = timestamp;
			const elapsed = timestamp - startTime;

			while (currentIndex < allPoints.length) {
				const { point, isStart } = allPoints[currentIndex];
				const targetTime = point.time - firstTime;

				if (elapsed >= targetTime) {
					if (isStart) {
						ctx.beginPath();
						ctx.moveTo(point.x, point.y);
						ctx.lineTo(point.x, point.y);
						ctx.stroke();
					} else {
						const prevPoint = allPoints[currentIndex - 1].point;
						ctx.beginPath();
						ctx.moveTo(prevPoint.x, prevPoint.y);
						ctx.lineTo(point.x, point.y);
						ctx.stroke();
					}
					currentIndex++;
				} else {
					break; // wait for next frame
				}
			}

			if (currentIndex < allPoints.length) {
				reqId = requestAnimationFrame(animate);
			} else {
				setIsReplaying(false);
			}
		};

		reqId = requestAnimationFrame(animate);

		return () => {
			cancelAnimationFrame(reqId);
		};
	};

	return (
		<div
			ref={containerRef}
			className="fixed inset-0 w-full h-full bg-background overflow-hidden touch-none"
		>
			<canvas
				ref={canvasRef}
				className="w-full h-full cursor-crosshair block text-foreground"
				onPointerDown={startDrawing}
				onPointerMove={draw}
				onPointerUp={endDrawing}
				onPointerCancel={endDrawing}
			/>

			<ButtonGroup className="absolute top-4 left-1/2 -translate-x-1/2">
				<Button
					variant="outline"
					onClick={handleReset}
					disabled={isReplaying || (strokes.length === 0 && !currentStroke)}
					aria-label={m.signature_replay_reset()}
				>
					<IconEraser /> Clear
				</Button>
				<Button
					variant="outline"
					onClick={handleReplay}
					disabled={isReplaying || strokes.length === 0}
				>
					<IconPlayerPlayFilled />
					{m.signature_replay_play()}
				</Button>
			</ButtonGroup>
		</div>
	);
}
