import {
	IconMicrophone,
	IconPlayerPauseFilled,
	IconPlayerPlayFilled,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Spinner } from "@/components/ui/spinner";

type OrbMode = "idle" | "thinking" | "speaking";

const modes: OrbMode[] = ["idle", "thinking", "speaking"];

const orbVertexShader = `
	varying vec3 vLocalPosition;
	varying vec3 vNormal;
	varying vec3 vViewPosition;
	uniform float uTime;
	uniform float uEnergy;

	void main() {
		vLocalPosition = position;
		vNormal = normalize(normalMatrix * normal);
		vec4 worldPosition = modelMatrix * vec4(position, 1.0);
		vec4 mvPosition = viewMatrix * worldPosition;
		vViewPosition = -mvPosition.xyz;
		gl_Position = projectionMatrix * mvPosition;
	}
`;

const orbFragmentShader = `
	varying vec3 vLocalPosition;
	varying vec3 vNormal;
	varying vec3 vViewPosition;
	uniform float uTime;
	uniform float uEnergy;

	float hash(vec2 p) {
		p = fract(p * vec2(123.34, 456.21));
		p += dot(p, p + 45.32);
		return fract(p.x * p.y);
	}

	float valueNoise(vec2 p) {
		vec2 i = floor(p);
		vec2 f = fract(p);
		vec2 u = f * f * (3.0 - 2.0 * f);

		float a = hash(i);
		float b = hash(i + vec2(1.0, 0.0));
		float c = hash(i + vec2(0.0, 1.0));
		float d = hash(i + vec2(1.0, 1.0));

		return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
	}

	float fbm(vec2 p) {
		float value = 0.0;
		float amplitude = 0.52;
		mat2 rotate = mat2(0.82, -0.57, 0.57, 0.82);

		for (int i = 0; i < 5; i++) {
			value += valueNoise(p) * amplitude;
			p = rotate * p * 2.03 + 13.7;
			amplitude *= 0.5;
		}

		return value;
	}

	void main() {
		vec3 normal = normalize(vNormal);
		vec3 viewDirection = normalize(vViewPosition);
		float facing = max(dot(normal, viewDirection), 0.0);
		float edge = smoothstep(0.015, 0.18, facing);
		float rim = pow(1.0 - facing, 3.15);

		float vertical = smoothstep(-0.95, 0.92, vLocalPosition.y);
		float diagonal = vLocalPosition.x * 0.64 + vLocalPosition.y * 0.82;
		vec2 driftA = vec2(diagonal, vLocalPosition.z * 0.62 + vLocalPosition.y * 0.34);
		vec2 driftB = vec2(vLocalPosition.x * 0.45 - vLocalPosition.y * 0.7, vLocalPosition.z + diagonal * 0.18);
		float smokeA = fbm(driftA * 2.15 + vec2(uTime * 0.22, -uTime * 0.13));
		float smokeB = fbm(driftB * 3.1 + vec2(-uTime * 0.16, uTime * 0.2));
		float smokeC = fbm((driftA + driftB) * 1.55 + vec2(uTime * 0.1, uTime * 0.075));
		float smoke = smoothstep(0.3, 0.82, smokeA * 0.56 + smokeB * 0.36 + smokeC * 0.18);
		float ribbon =
			smoothstep(0.22, 0.84, smoke) *
			smoothstep(-0.62, 0.7, vLocalPosition.y) *
			smoothstep(0.96, 0.18, abs(vLocalPosition.z));
		float whiteBand = ribbon * (0.28 + uEnergy * 0.08);
		float bluePool = smoothstep(-0.05, -0.9, vLocalPosition.y + sin(vLocalPosition.x * 2.2 + uTime * 0.42) * 0.16);
		float blueSmoke = smoothstep(0.36, 0.78, smokeB) * smoothstep(-0.9, 0.2, -vLocalPosition.y);

		vec3 top = vec3(0.8, 0.99, 0.94);
		vec3 middle = vec3(0.34, 0.86, 1.0);
		vec3 bottom = vec3(0.0, 0.42, 1.0);
		vec3 color = mix(bottom, middle, smoothstep(-0.82, 0.24, vLocalPosition.y));
		color = mix(color, top, vertical * 0.78);
		color = mix(color, vec3(0.94, 1.0, 0.96), whiteBand);
		color = mix(color, vec3(0.0, 0.5, 1.0), bluePool * 0.56 + blueSmoke * 0.28);
		color = mix(color, vec3(0.5, 0.95, 1.0), smokeC * 0.2);
		color += rim * vec3(0.08, 0.45, 1.0) * 0.24;
		color = clamp(color * 1.08, 0.0, 1.0);

		float alpha = edge * (0.96 + uEnergy * 0.04);
		gl_FragColor = vec4(color, alpha);
	}
`;

function modeEnergy(mode: OrbMode, time: number) {
	if (mode === "idle") {
		return 0.1 + Math.sin(time * 1.1) * 0.02;
	}

	if (mode === "thinking") {
		return 0.24 + Math.sin(time * 2.2) * 0.045 + Math.sin(time * 3.4) * 0.02;
	}

	return (
		0.34 +
		Math.max(0, Math.sin(time * 6.2)) * 0.16 +
		Math.max(0, Math.sin(time * 10.1 + 0.8)) * 0.08
	);
}

function speakingPulse(mode: OrbMode, time: number) {
	if (mode !== "speaking") return 0;

	return (
		Math.max(0, Math.sin(time * 8.5)) * 0.55 +
		Math.max(0, Math.sin(time * 13.7 + 0.8)) * 0.28 +
		Math.max(0, Math.sin(time * 21.4 + 1.7)) * 0.17
	);
}

export function VoiceOrb() {
	const mountRef = useRef<HTMLDivElement>(null);
	const modeRef = useRef<OrbMode>("speaking");
	const runningRef = useRef(true);
	const frameRef = useRef<number | null>(null);
	const startAnimationRef = useRef<(() => void) | null>(null);
	const energyRef = useRef(0);
	const [mode, setMode] = useState<OrbMode>("speaking");
	const [isRunning, setIsRunning] = useState(true);
	const [isOrbReady, setIsOrbReady] = useState(false);

	useEffect(() => {
		modeRef.current = mode;
	}, [mode]);

	useEffect(() => {
		runningRef.current = isRunning;
		if (isRunning) {
			startAnimationRef.current?.();
			return;
		}

		if (frameRef.current !== null) {
			cancelAnimationFrame(frameRef.current);
			frameRef.current = null;
		}
	}, [isRunning]);

	useEffect(() => {
		const mount = mountRef.current;
		if (!mount) return;

		setIsOrbReady(false);
		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
			powerPreference: "high-performance",
		});
		renderer.domElement.style.display = "block";
		renderer.domElement.style.width = "100%";
		renderer.domElement.style.height = "100%";
		renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
		renderer.outputColorSpace = THREE.SRGBColorSpace;
		renderer.setClearColor(0xffffff, 0);
		mount.appendChild(renderer.domElement);

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 20);
		camera.position.set(0, 0, 5.2);

		const uniforms = {
			uTime: { value: 0 },
			uEnergy: { value: 0 },
		};
		const orbGeometry = new THREE.SphereGeometry(1, 128, 96);
		const orbMaterial = new THREE.ShaderMaterial({
			vertexShader: orbVertexShader,
			fragmentShader: orbFragmentShader,
			uniforms,
			transparent: true,
			depthWrite: false,
		});
		const orb = new THREE.Mesh(orbGeometry, orbMaterial);
		orb.scale.setScalar(1.12);
		scene.add(orb);

		const glowMaterial = new THREE.MeshBasicMaterial({
			color: 0x98e9ff,
			transparent: true,
			opacity: 0.035,
			blending: THREE.AdditiveBlending,
			depthWrite: false,
			side: THREE.BackSide,
		});
		const glow = new THREE.Mesh(
			new THREE.SphereGeometry(1.07, 96, 64),
			glowMaterial,
		);
		glow.scale.setScalar(1.08);
		scene.add(glow);

		const resize = () => {
			const rect = mount.getBoundingClientRect();
			const width = Math.max(1, rect.width);
			const height = Math.max(1, rect.height);
			renderer.setSize(width, height, false);
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
		};

		const resizeObserver = new ResizeObserver(resize);
		resizeObserver.observe(mount);
		resize();

		let previousTimestamp = 0;
		let animationTime = 0;
		let hasRendered = false;
		const animate = (timestamp: number) => {
			frameRef.current = null;
			if (!runningRef.current) {
				previousTimestamp = timestamp;
				return;
			}

			if (previousTimestamp === 0) {
				previousTimestamp = timestamp;
			}

			const deltaTime = Math.min((timestamp - previousTimestamp) / 1000, 0.05);
			previousTimestamp = timestamp;

			animationTime += deltaTime;

			const currentMode = modeRef.current;
			const targetEnergy = modeEnergy(currentMode, animationTime);
			energyRef.current += (targetEnergy - energyRef.current) * 0.075;
			const energy = Math.max(0, Math.min(1, energyRef.current));
			const pulse = speakingPulse(currentMode, animationTime);
			const voiceScale = pulse * 0.07;

			uniforms.uTime.value = animationTime;
			uniforms.uEnergy.value = energy;
			orb.rotation.y =
				Math.sin(animationTime * 0.28) * 0.18 + animationTime * 0.07;
			orb.rotation.x = Math.sin(animationTime * 0.34) * 0.045;
			orb.scale.setScalar(1.12 + energy * 0.028 + voiceScale);
			glow.scale.setScalar(1.06 + energy * 0.026);
			glowMaterial.opacity = 0.018 + energy * 0.026;

			renderer.render(scene, camera);
			if (!hasRendered) {
				hasRendered = true;
				setIsOrbReady(true);
			}
			frameRef.current = requestAnimationFrame(animate);
		};
		const startAnimation = () => {
			if (frameRef.current !== null) return;
			previousTimestamp = 0;
			frameRef.current = requestAnimationFrame(animate);
		};
		startAnimationRef.current = startAnimation;
		startAnimation();

		return () => {
			if (frameRef.current !== null) {
				cancelAnimationFrame(frameRef.current);
				frameRef.current = null;
			}
			startAnimationRef.current = null;
			resizeObserver.disconnect();
			renderer.domElement.remove();
			orbGeometry.dispose();
			orbMaterial.dispose();
			glow.geometry.dispose();
			glowMaterial.dispose();
			renderer.dispose();
		};
	}, []);

	return (
		<main className="fixed inset-0 overflow-hidden bg-white text-foreground">
			<div className="absolute inset-0 flex items-center justify-center">
				<div className="aspect-square w-[min(42vw,19rem)] max-w-[24rem]">
					<div ref={mountRef} className="h-full w-full" />
				</div>
			</div>
			{!isOrbReady ? (
				<div className="absolute inset-0 flex items-center justify-center bg-white">
					<Spinner className="size-6 text-muted-foreground" />
				</div>
			) : null}

			<ButtonGroup className="absolute top-4 left-1/2 max-w-[calc(100vw-2rem)] -translate-x-1/2 overflow-x-auto">
				{modes.map((item) => (
					<Button
						key={item}
						variant={mode === item ? "default" : "outline"}
						onClick={() => setMode(item)}
						className="capitalize"
					>
						{item === "speaking" ? <IconMicrophone /> : null}
						{item}
					</Button>
				))}
				<Button
					size="icon"
					variant="outline"
					onClick={() => setIsRunning((value) => !value)}
					aria-label={isRunning ? "Pause" : "Play"}
				>
					{isRunning ? <IconPlayerPauseFilled /> : <IconPlayerPlayFilled />}
				</Button>
			</ButtonGroup>
		</main>
	);
}
