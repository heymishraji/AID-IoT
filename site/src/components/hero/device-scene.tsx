"use client";
/* World A signature: the IIoT Bridge opens on scroll into the layers AID-IoT makes. Procedural model until CAD exists. */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const LAYERS = [
  { name: "The device", who: "housing we design", color: "#D9DCE0" },
  { name: "The board", who: "hardware we design", color: "#1E6B45" },
  { name: "The code inside it", who: "firmware we write", color: "#101317" },
  { name: "The link", who: "4G · Wi-Fi · mesh we manage", color: "#F1F2F4" },
  { name: "Signal", who: "the platform we run", color: "#F04E1A" },
  { name: "The app", who: "what your team reads", color: "#101317" },
];

function Rig({ progress }: { progress: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const lid = useRef<THREE.Mesh>(null);
  const plates = useRef<(THREE.Group | null)[]>([]);
  const { camera } = useThree();
  const p = useRef(0);
  useFrame((_, dt) => {
    p.current += (progress.current - p.current) * Math.min(1, dt * 6);
    const e = p.current < 0.5 ? 2 * p.current * p.current : -1 + (4 - 2 * p.current) * p.current;
    const gap = 0.12 + 0.85 * e;
    plates.current.forEach((g, i) => {
      if (!g) return;
      if (i === 0) { g.position.y = 0; return; }
      if (i === 1) { g.position.y = -0.08 + e * gap; g.visible = true; return; }
      const k = Math.max(0, Math.min(1, (e - 0.08 - (i - 2) * 0.06) / 0.35));
      g.position.y = -0.1 + k * i * gap; g.visible = k > 0.001; g.scale.setScalar(0.6 + 0.4 * k);
    });
    if (lid.current) { lid.current.position.y = 0.04 + e * 5.6; (lid.current.material as THREE.MeshPhysicalMaterial).opacity = 0.28 * (1 - e * 0.7) + 0.05; }
    if (group.current) { group.current.position.y = -e * 2.2; group.current.rotation.y = Math.sin(performance.now() / 4000) * 0.06; }
    const a = -0.4 + e * 0.6, r = 7.6 + e * 2.2;
    camera.position.set(Math.sin(a) * r, 2.4 + e * 2.6, Math.cos(a) * r);
    camera.lookAt(1.0 * e, 0.1 + e * 0.3, 0);
  });
  const std = (c: string, o: Partial<THREE.MeshStandardMaterialParameters> = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.55, metalness: 0.05, ...o });
  const mats = useMemo(() => ({ grey: std("#D9DCE0"), inner: std("#C4C8CE"), green: std("#1E6B45", { roughness: 0.4 }), ink: std("#101317"), orange: std("#F04E1A"), teal: std("#2A9D6C"), brass: std("#B08D57", { metalness: 0.7, roughness: 0.3 }), light: std("#F1F2F4") }), []);
  const W = 3.2, D = 2.6;
  return (
    <group ref={group}>
      {/* 0 enclosure */}
      <group ref={(el) => { plates.current[0] = el; }}>
        <mesh material={mats.grey} position={[0, -0.25, 0]}><boxGeometry args={[W, 0.5, D]} /></mesh>
        <mesh material={mats.inner} position={[0, -0.2, 0]}><boxGeometry args={[W - 0.3, 0.42, D - 0.3]} /></mesh>
      </group>
      <mesh ref={lid} position={[0, 0.04, 0]}><boxGeometry args={[W, 0.08, D]} /><meshPhysicalMaterial color="#ffffff" transparent opacity={0.28} roughness={0.05} clearcoat={1} /></mesh>
      {/* 1 board */}
      <group ref={(el) => { plates.current[1] = el; }}>
        <mesh material={mats.green}><boxGeometry args={[2.5, 0.06, 1.9]} /></mesh>
        <mesh material={mats.ink} position={[0.2, 0.08, 0]}><boxGeometry args={[0.6, 0.1, 0.6]} /></mesh>
        {[0, 1, 2, 3, 4].map((i) => <mesh key={i} material={mats.orange} position={[-1.05 + i * 0.25, 0.11, -0.75]}><boxGeometry args={[0.22, 0.16, 0.2]} /></mesh>)}
        {[0, 1, 2].map((i) => <mesh key={i} material={mats.teal} position={[-1.1, 0.11, -0.2 + i * 0.3]}><boxGeometry args={[0.2, 0.16, 0.2]} /></mesh>)}
        <mesh position={[0.9, 0.08, 0.7]}><sphereGeometry args={[0.05, 12, 12]} /><meshStandardMaterial color="#33ff88" emissive="#33ff88" emissiveIntensity={1.2} /></mesh>
        <mesh material={mats.ink} rotation={[0, 0, Math.PI / 2]} position={[1.55, 0.15, 0.4]}><cylinderGeometry args={[0.04, 0.04, 1.1, 12]} /></mesh>
        <mesh material={mats.brass} rotation={[0, 0, Math.PI / 2]} position={[1.3, 0.15, 0.4]}><cylinderGeometry args={[0.12, 0.12, 0.25, 16]} /></mesh>
      </group>
      {/* 2 firmware */}
      <group ref={(el) => { plates.current[2] = el; }}><mesh material={mats.ink}><boxGeometry args={[2.5, 0.03, 1.9]} /></mesh>
        {[0, 1, 2, 3, 4, 5].map((i) => <mesh key={i} material={mats.orange} position={[-1.0 + i * 0.4, 0.03, -0.6 + (i % 3) * 0.5]}><boxGeometry args={[0.3, 0.01, 0.06]} /></mesh>)}
      </group>
      {/* 3 link */}
      <group ref={(el) => { plates.current[3] = el; }}>
        {[0.5, 0.85, 1.2].map((r, i) => <mesh key={r} rotation={[Math.PI / 2, 0, 0]} position={[0, i * 0.02, 0]}><torusGeometry args={[r, 0.02, 10, 64]} /><meshStandardMaterial color="#101317" emissive="#F04E1A" emissiveIntensity={0.35} /></mesh>)}
        <mesh material={mats.ink}><sphereGeometry args={[0.1, 16, 16]} /></mesh>
      </group>
      {/* 4 signal */}
      <group ref={(el) => { plates.current[4] = el; }}><mesh material={mats.orange}><boxGeometry args={[2.5, 0.04, 1.9]} /></mesh>
        {[0, 1, 2, 3].map((i) => <mesh key={i} material={mats.ink} position={[-0.9 + i * 0.6, 0.03, 0]}><boxGeometry args={[0.4, 0.01, 1.4]} /></mesh>)}
      </group>
      {/* 5 app */}
      <group ref={(el) => { plates.current[5] = el; }}><mesh material={mats.ink}><boxGeometry args={[1.6, 0.04, 1.2]} /></mesh>
        <mesh material={mats.light} position={[0, 0.03, 0]}><boxGeometry args={[1.3, 0.01, 0.9]} /></mesh>
        <Html center position={[0, 0.06, 0]} transform occlude={false} rotation={[-Math.PI / 2, 0, 0]} scale={0.35} style={{ pointerEvents: "none" }}><div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 64, color: "#101317", whiteSpace: "nowrap" }}>842 °C</div></Html>
      </group>
    </group>
  );
}

export function DeviceScene({ progress, labels }: { progress: React.MutableRefObject<number>; labels: boolean }) {
  return (
    <div className="relative h-full w-full">
      <Canvas dpr={[1, 1.75]} camera={{ fov: 30, position: [4, 2.4, 7] }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
        <hemisphereLight intensity={1.1} color="#ffffff" groundColor="#553322" />
        <directionalLight intensity={1.6} position={[4, 7, 5]} />
        <directionalLight intensity={0.6} color="#ffe0cc" position={[-5, 2, -3]} />
        <Rig progress={progress} />
      </Canvas>
      <ol className={`pointer-events-none absolute right-5 top-1/2 flex -translate-y-1/2 flex-col-reverse gap-2 transition-opacity duration-500 ${labels ? "opacity-100" : "opacity-0"}`} aria-hidden={!labels}>
        {LAYERS.map((l) => <li key={l.name} className="rounded-[3px] bg-[#101317] px-3 py-2 text-[#F1F2F4]"><span className="display block text-[15px]">{l.name}</span><span className="block text-[12px] text-[#C9CDD5]">{l.who}</span></li>)}
      </ol>
    </div>
  );
}
