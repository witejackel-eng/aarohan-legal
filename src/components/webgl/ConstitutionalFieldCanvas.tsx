"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * "The Constitutional Field" — original procedural WebGL sculpture.
 *
 * Concept (brand brief §7.1):
 *   A floating three-dimensional structure composed of:
 *     - Thin planes
 *     - Layered grids
 *     - Intersecting lines
 *     - Ordered nodes
 *     - A central open space
 *     - A subtle ascending movement
 *     - Controlled red and brass highlights
 *     - Paper-like monochromatic surfaces
 *
 * Metaphorically represents:
 *     Constitutional structure, multiple levels of authority,
 *     precedent, interpretation, deliberation, balance between
 *     institutions.
 *
 * Interaction:
 *     Slow autonomous movement, small pointer response, gentle
 *     parallax, subtle light movement. No frantic rotation, no
 *     gaming aesthetic, no loud particle explosions, no excessive
 *     bloom.
 *
 * Performance:
 *     - Dynamic import via next/dynamic (see ConstitutionalField.tsx)
 *     - Cap device pixel ratio
 *     - Reduce geometry complexity on mobile
 *     - Pause animation when tab hidden
 *     - Respect prefers-reduced-motion
 *     - CSS/SVG fallback provided by parent
 *     - No external textures (procedural materials only)
 */

const PAPER = new THREE.Color("#F1EEE6");
const INK = new THREE.Color("#11110F");
const RED = new THREE.Color("#6A1F2B");
const BRASS = new THREE.Color("#A9844F");
const MUTED = new THREE.Color("#5F5C55");

function FieldPlanes({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);

  // Build N thin planes arranged in layered grids
  const planes = useMemo(() => {
    const out: Array<{
      position: [number, number, number];
      size: [number, number];
      color: THREE.Color;
      opacity: number;
    }> = [];

    const layers = 7;
    for (let l = 0; l < layers; l++) {
      const z = (l - (layers - 1) / 2) * 1.2;
      const w = 6.5 - l * 0.3;
      const h = 4.4 - l * 0.18;
      const color =
        l === 0
          ? RED.clone()
          : l === layers - 1
            ? BRASS.clone()
            : l % 2 === 0
              ? INK.clone()
              : MUTED.clone();
      out.push({
        position: [0, 0, z],
        size: [w, h],
        color,
        opacity: l === 0 ? 0.18 : l === layers - 1 ? 0.22 : 0.04 + l * 0.012,
      });
    }
    return out;
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    if (reduced) return;
    if (document.hidden) return;

    // Slow autonomous rotation
    group.current.rotation.y += delta * 0.05;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.06;

    // Subtle ascending drift
    group.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.18) * 0.08;

    // Pointer parallax (small)
    const { pointer } = state;
    group.current.rotation.z = pointer.x * 0.04;
  });

  return (
    <group ref={group}>
      {planes.map((p, i) => (
        <mesh key={i} position={p.position}>
          <planeGeometry args={p.size} />
          <meshBasicMaterial
            color={p.color}
            transparent
            opacity={p.opacity}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

function GridLines({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);

  const lines = useMemo(() => {
    const out: Array<{
      points: THREE.Vector3[];
      color: THREE.Color;
      opacity: number;
    }> = [];

    // Layered grids — intersecting lines on different planes
    const gridSize = 5;
    const step = 1.1;
    for (let layer = 0; layer < 3; layer++) {
      const z = (layer - 1) * 1.6;
      for (let i = -gridSize; i <= gridSize; i++) {
        const isAccent = i === 0 && layer === 1;
        const color = isAccent ? RED : layer === 0 ? INK : MUTED;
        out.push({
          points: [
            new THREE.Vector3(-gridSize * step, i * step, z),
            new THREE.Vector3(gridSize * step, i * step, z),
          ],
          color,
          opacity: isAccent ? 0.45 : 0.18 + layer * 0.06,
        });
        out.push({
          points: [
            new THREE.Vector3(i * step, -gridSize * step, z),
            new THREE.Vector3(i * step, gridSize * step, z),
          ],
          color,
          opacity: isAccent ? 0.45 : 0.18 + layer * 0.06,
        });
      }
    }

    // Diagonal intersecting lines — central axis
    out.push({
      points: [
        new THREE.Vector3(-4.5, -4.5, 1),
        new THREE.Vector3(4.5, 4.5, 1),
      ],
      color: BRASS,
      opacity: 0.4,
    });
    out.push({
      points: [
        new THREE.Vector3(4.5, -4.5, 1),
        new THREE.Vector3(-4.5, 4.5, 1),
      ],
      color: BRASS,
      opacity: 0.4,
    });

    return out;
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    if (reduced) return;
    if (document.hidden) return;
    group.current.rotation.y -= delta * 0.025;
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.07) * 0.04;
  });

  return (
    <group ref={group}>
      {lines.map((l, i) => {
        const geo = new THREE.BufferGeometry().setFromPoints(l.points);
        return (
          <line key={i}>
            {/* @ts-expect-error R3F primitive */}
            <primitive object={geo} attach="geometry" />
            <lineBasicMaterial
              color={l.color}
              transparent
              opacity={l.opacity}
            />
          </line>
        );
      })}
    </group>
  );
}

function Nodes({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    const out: Array<{
      position: [number, number, number];
      color: THREE.Color;
      size: number;
    }> = [];
    // Ordered nodes — intersections on the central layer
    const positions: Array<[number, number, number]> = [
      [-3.3, 0, 1.6],
      [3.3, 0, 1.6],
      [0, -3.3, 1.6],
      [0, 3.3, 1.6],
      [0, 0, 1.6],
      [-2.2, -2.2, 0],
      [2.2, 2.2, 0],
      [2.2, -2.2, 0],
      [-2.2, 2.2, 0],
      [0, 0, 3.2],
    ];
    positions.forEach((p, i) => {
      out.push({
        position: p,
        color: i === 4 ? RED : i === 9 ? BRASS : INK,
        size: i === 4 || i === 9 ? 0.09 : 0.05,
      });
    });
    return out;
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    if (reduced) return;
    if (document.hidden) return;
    group.current.rotation.y += delta * 0.03;
    // Pulse scale subtly
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.04;
    group.current.scale.setScalar(s);
  });

  return (
    <group ref={group}>
      {nodes.map((n, i) => (
        <mesh key={i} position={n.position}>
          <sphereGeometry args={[n.size, 16, 16]} />
          <meshBasicMaterial color={n.color} />
        </mesh>
      ))}
    </group>
  );
}

function Scene({ reduced }: { reduced: boolean }) {
  const { camera, size } = useThree();

  // Reduce complexity on mobile
  const mobile = size.width < 768;
  useMemo(() => {
    camera.position.set(0, 0, mobile ? 11 : 9);
    camera.lookAt(0, 0, 0);
  }, [camera, mobile]);

  return (
    <>
      <ambientLight intensity={1.1} />
      <FieldPlanes reduced={reduced} />
      <GridLines reduced={reduced} />
      <Nodes reduced={reduced} />
    </>
  );
}

export default function ConstitutionalFieldCanvas() {
  const reduced = usePrefersReducedMotion();

  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 0, 9], fov: 42, near: 0.1, far: 100 }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <color attach="background" args={["#F1EEE6"]} />
      <Scene reduced={reduced} />
    </Canvas>
  );
}
