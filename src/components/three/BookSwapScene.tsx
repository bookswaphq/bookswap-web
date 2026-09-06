"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import {
  BOOK_DEPTH,
  CYCLE_SECONDS,
  HERO_INDEX,
  HERO_LEFT,
  HERO_RIGHT,
  LEFT_SPINES,
  PALETTE,
  RIGHT_SPINES,
  SHELF_X,
  type Spine,
  layoutRow,
} from "./scene-config";

/* ---------------------------------------------------------------- helpers */

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/* ------------------------------------------------------------------ book  */

type BookProps = {
  spine: Spine;
  position?: [number, number, number];
};

function Book({ spine, position = [0, 0, 0] }: BookProps) {
  return (
    <group position={position} rotation={[0, 0, spine.tilt ?? 0]}>
      <mesh position={[0, spine.h / 2, 0]} castShadow>
        <boxGeometry args={[spine.w, spine.h, BOOK_DEPTH]} />
        <meshStandardMaterial
          color={spine.color}
          roughness={0.72}
          metalness={0.02}
        />
      </mesh>

      {/* Page block, peeking out of the back of the spine. */}
      <mesh position={[0, spine.h / 2, -0.02]}>
        <boxGeometry args={[spine.w * 0.82, spine.h * 0.94, BOOK_DEPTH * 1.02]} />
        <meshStandardMaterial color="#FBF9F5" roughness={0.95} />
      </mesh>

      {spine.band ? (
        <mesh position={[0, spine.h * 0.68, BOOK_DEPTH / 2 + 0.001]}>
          <planeGeometry args={[spine.w * 0.56, 0.06]} />
          <meshBasicMaterial color="#FFFFFF" opacity={0.85} transparent />
        </mesh>
      ) : null}
    </group>
  );
}

/* ----------------------------------------------------------------- shelf  */

type ShelfProps = {
  spines: Spine[];
  x: number;
  /** The travelling book is rendered separately, so its slot stays empty. */
  hiddenIndex: number;
};

function Shelf({ spines, x, hiddenIndex }: ShelfProps) {
  const { offsets, width } = useMemo(() => layoutRow(spines), [spines]);
  const board = width + 0.5;

  return (
    <group position={[x, 0, 0]}>
      {/* Board the books stand on. */}
      <mesh position={[0, -0.07, 0]} receiveShadow>
        <boxGeometry args={[board, 0.14, BOOK_DEPTH + 0.34]} />
        <meshStandardMaterial color={PALETTE.wood} roughness={0.85} />
      </mesh>

      {/* Front lip, so the board reads as a shelf and not a plank. */}
      <mesh position={[0, -0.075, (BOOK_DEPTH + 0.34) / 2 + 0.02]}>
        <boxGeometry args={[board, 0.16, 0.04]} />
        <meshStandardMaterial color={PALETTE.woodEdge} roughness={0.9} />
      </mesh>

      {/* Uprights. */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[(side * board) / 2 - side * 0.06, 0.72, 0]}
          receiveShadow
        >
          <boxGeometry args={[0.12, 1.72, BOOK_DEPTH + 0.34]} />
          <meshStandardMaterial color={PALETTE.woodEdge} roughness={0.88} />
        </mesh>
      ))}

      {spines.map((spine, index) =>
        index === hiddenIndex ? null : (
          <Book key={index} spine={spine} position={[offsets[index], 0, 0]} />
        )
      )}
    </group>
  );
}

/* ------------------------------------------------- the two swapping books */

type TravellerProps = {
  spine: Spine;
  /** Slot centre, relative to its own shelf. */
  slotOffset: number;
  /** Slot centre on the opposite shelf. */
  otherSlotOffset: number;
  /** -1 starts on the left shelf, 1 starts on the right shelf. */
  origin: -1 | 1;
};

function Traveller({
  spine,
  slotOffset,
  otherSlotOffset,
  origin,
}: TravellerProps) {
  const group = useRef<THREE.Group>(null);

  const homeX = origin * SHELF_X + slotOffset;
  const awayX = -origin * SHELF_X + otherSlotOffset;

  useFrame(({ clock }) => {
    const node = group.current;
    if (!node) return;

    const elapsed = clock.getElapsedTime();
    const cycle = Math.floor(elapsed / CYCLE_SECONDS);
    const t = (elapsed % CYCLE_SECONDS) / CYCLE_SECONDS;

    // Rest → travel between 15% and 75% of the cycle → rest again.
    const p = easeInOutCubic(clamp01((t - 0.15) / 0.6));

    // Alternate cycles send the book back to where it came from, so the
    // two shelves keep trading the same pair of books forever.
    const returning = cycle % 2 === 1;
    const from = returning ? awayX : homeX;
    const to = returning ? homeX : awayX;

    const arc = Math.sin(Math.PI * p);

    node.position.x = THREE.MathUtils.lerp(from, to, p);
    node.position.y = arc * 0.95;
    // One book crosses in front, the other behind, so they never collide.
    node.position.z = arc * 0.85 * origin;

    node.rotation.y = p * Math.PI * 2 * origin;
    node.rotation.z = arc * 0.22 * -origin;
  });

  return (
    <group ref={group}>
      <Book spine={spine} />
    </group>
  );
}

/* ----------------------------------------------------------------- scene  */

const CAMERA_FOV = 38;
/** Half-width / half-height of the shelf composition, plus breathing room. */
const FRAME_HALF_WIDTH = 3.7;
const FRAME_HALF_HEIGHT = 1.5;
const GROUP_Y = -0.8;

function Scene() {
  const group = useRef<THREE.Group>(null);
  const { camera, size } = useThree();

  // Pull the camera back just far enough that both shelves stay in frame at
  // whatever aspect ratio the hero happens to be.
  useEffect(() => {
    const aspect = size.width / Math.max(1, size.height);
    const halfFov = (CAMERA_FOV * Math.PI) / 360;
    const forWidth = FRAME_HALF_WIDTH / (Math.tan(halfFov) * aspect);
    const forHeight = FRAME_HALF_HEIGHT / Math.tan(halfFov);

    camera.position.set(0, 0.2, Math.max(forWidth, forHeight));
    camera.updateProjectionMatrix();
  }, [camera, size]);

  const left = useMemo(() => layoutRow(LEFT_SPINES), []);
  const right = useMemo(() => layoutRow(RIGHT_SPINES), []);

  useFrame(({ clock, pointer }, delta) => {
    const node = group.current;
    if (!node) return;

    const elapsed = clock.getElapsedTime();
    const damp = Math.min(1, delta * 2.2);

    node.rotation.y = THREE.MathUtils.lerp(
      node.rotation.y,
      pointer.x * 0.2 + Math.sin(elapsed * 0.18) * 0.04,
      damp
    );
    node.rotation.x = THREE.MathUtils.lerp(
      node.rotation.x,
      -pointer.y * 0.08,
      damp
    );
    node.position.y = GROUP_Y + Math.sin(elapsed * 0.4) * 0.045;
  });

  return (
    <>
      <ambientLight intensity={0.75} />
      <hemisphereLight
        intensity={0.55}
        color="#FFFFFF"
        groundColor={PALETTE.primarySoft}
      />
      <directionalLight
        position={[4, 6, 5]}
        intensity={1.15}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight
        position={[-5, 3, 2]}
        intensity={0.4}
        color={PALETTE.primarySurface}
      />

      <group ref={group} position={[0, GROUP_Y, 0]}>
        <Shelf spines={LEFT_SPINES} x={-SHELF_X} hiddenIndex={HERO_INDEX} />
        <Shelf spines={RIGHT_SPINES} x={SHELF_X} hiddenIndex={HERO_INDEX} />

        <Traveller
          spine={HERO_LEFT}
          slotOffset={left.offsets[HERO_INDEX]}
          otherSlotOffset={right.offsets[HERO_INDEX]}
          origin={-1}
        />
        <Traveller
          spine={HERO_RIGHT}
          slotOffset={right.offsets[HERO_INDEX]}
          otherSlotOffset={left.offsets[HERO_INDEX]}
          origin={1}
        />

        <ContactShadows
          position={[0, -0.16, 0]}
          scale={14}
          blur={2.6}
          far={4}
          opacity={0.28}
          resolution={256}
          color={PALETTE.ink}
        />
      </group>
    </>
  );
}

/* --------------------------------------------------------------- exported */

export default function BookSwapScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      shadows
      camera={{ fov: CAMERA_FOV, position: [0, 0.2, 8], near: 0.1, far: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <Scene />
    </Canvas>
  );
}
