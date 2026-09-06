"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, RoundedBox } from "@react-three/drei";
import {
  BOOK_DEPTH,
  CYCLE_SECONDS,
  HERO_INDEX,
  HERO_LEFT,
  HERO_RIGHT,
  LEFT_SPINES,
  PALETTE,
  RIGHT_SPINES,
  SHELF_TOP_Y,
  SHELF_X,
  SHELF_Z,
  type Spine,
  bloomAt,
  layoutRow,
  meetingAt,
  smoothstep,
} from "./scene-config";
import {
  makeArchTexture,
  makeGlowTexture,
  makeSilhouetteTexture,
} from "./textures";

const CAMERA_FOV = 34;
const FRAME_HALF_WIDTH = 4.35;
const FRAME_HALF_HEIGHT = 2.06;
/** Vertical centre of the composition — the camera looks straight at it. */
const LOOK_Y = 1.6;
/** The pendant hangs on the outer side, leaving the books a clear flight path. */
const LAMP_X = 0.74;

/* ------------------------------------------------------------------ book  */

type BookProps = {
  spine: Spine;
  position?: [number, number, number];
};

/** A book standing on its shelf, spine out. */
function Book({ spine, position = [0, 0, 0] }: BookProps) {
  return (
    <group position={position} rotation={[0, 0, spine.tilt ?? 0]}>
      <RoundedBox
        args={[spine.w, spine.h, BOOK_DEPTH]}
        radius={0.018}
        smoothness={3}
        position={[0, spine.h / 2, 0]}
      >
        <meshStandardMaterial
          color={spine.color}
          roughness={0.86}
          metalness={0}
        />
      </RoundedBox>

      {/* Page block peeking out behind the spine. */}
      <mesh position={[0, spine.h / 2, -0.015]}>
        <boxGeometry
          args={[spine.w * 0.78, spine.h * 0.93, BOOK_DEPTH * 1.03]}
        />
        <meshStandardMaterial color="#F6EEDC" roughness={0.98} />
      </mesh>

      {spine.band ? (
        <mesh position={[0, spine.h * 0.7, BOOK_DEPTH / 2 + 0.002]}>
          <planeGeometry args={[spine.w * 0.5, 0.035]} />
          <meshBasicMaterial color={PALETTE.lampCore} transparent opacity={0.8} />
        </mesh>
      ) : null}
    </group>
  );
}

/* ------------------------------------------------------------------ nook  */

type NookProps = {
  /** -1 for the left nook, 1 for the right one. */
  side: -1 | 1;
  spines: Spine[];
  arch: THREE.Texture;
  silhouette: THREE.Texture;
  glow: THREE.Texture;
  /** Colour this nook takes on when it receives a book, per cycle parity. */
  arriving: [string, string];
};

/**
 * One reading nook: a painted alcove, a pendant lamp, a shelf, and a reader
 * sitting just out of focus behind it. The lamp swells and takes on the colour
 * of the arriving book as a swap completes.
 */
function Nook({
  side,
  spines,
  arch,
  silhouette,
  glow,
  arriving,
}: NookProps) {
  const { offsets, width } = useMemo(() => layoutRow(spines), [spines]);
  const board = width + 0.34;

  const lamp = useRef<THREE.PointLight>(null);
  const wallGlow = useRef<THREE.Mesh>(null);
  const bulbGlow = useRef<THREE.Mesh>(null);

  const warm = useMemo(() => new THREE.Color(PALETTE.lamp), []);
  const accents = useMemo(
    () => arriving.map((hex) => new THREE.Color(hex)),
    [arriving]
  );
  const scratch = useMemo(() => new THREE.Color(), []);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    const cycle = Math.floor(elapsed / CYCLE_SECONDS);
    const t = (elapsed % CYCLE_SECONDS) / CYCLE_SECONDS;

    const bloom = bloomAt(t);
    // A slow breath in the lamp, so the nook is never completely still.
    const breath = 0.96 + Math.sin(elapsed * 0.6 + side) * 0.04;
    const accent = accents[cycle % accents.length];

    scratch.copy(warm).lerp(accent, bloom * 0.55);

    if (lamp.current) {
      lamp.current.intensity = (2.6 + bloom * 3.4) * breath;
      lamp.current.color.copy(scratch);
    }

    if (wallGlow.current) {
      const material = wallGlow.current.material as THREE.MeshBasicMaterial;
      material.opacity = (0.3 + bloom * 0.42) * breath;
      material.color.copy(scratch);
      const scale = 1 + bloom * 0.16;
      wallGlow.current.scale.set(3.5 * scale, 3.2 * scale, 1);
    }

    if (bulbGlow.current) {
      const material = bulbGlow.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.55 + bloom * 0.35;
      material.color.copy(scratch);
    }
  });

  return (
    <group position={[side * SHELF_X, 0, 0]}>
      {/* Painted alcove. */}
      <mesh position={[0, 1.6, -1.3]}>
        <planeGeometry args={[3.9, 4.05]} />
        <meshBasicMaterial map={arch} transparent toneMapped={false} />
      </mesh>

      {/* Reader, sitting out of focus under the lamp. */}
      <mesh position={[side * 0.52, 0.44, -1.18]} scale={[-side, 1, 1]}>
        <planeGeometry args={[1.62, 1.82]} />
        <meshBasicMaterial
          map={silhouette}
          color={PALETTE.silhouette}
          transparent
          opacity={0.115}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Lamplight on the back wall. */}
      <mesh ref={wallGlow} position={[side * LAMP_X, 1.95, -1.24]} scale={[3.5, 3.2, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={glow}
          color={PALETTE.lamp}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Pendant lamp. */}
      <mesh position={[side * LAMP_X, 3.24, -0.15]}>
        <cylinderGeometry args={[0.012, 0.012, 0.86, 6]} />
        <meshBasicMaterial color={PALETTE.shade} />
      </mesh>
      <mesh position={[side * LAMP_X, 2.68, -0.15]}>
        <coneGeometry args={[0.3, 0.36, 26, 1, true]} />
        <meshStandardMaterial
          color={PALETTE.shade}
          roughness={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[side * LAMP_X, 2.52, -0.15]}>
        <sphereGeometry args={[0.085, 16, 16]} />
        <meshBasicMaterial color={PALETTE.lampCore} toneMapped={false} />
      </mesh>
      <mesh ref={bulbGlow} position={[side * LAMP_X, 2.5, -0.14]} scale={[1.5, 1.5, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={glow}
          color={PALETTE.lamp}
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <pointLight
        ref={lamp}
        position={[side * LAMP_X, 2.4, 0.2]}
        intensity={2.6}
        distance={7}
        decay={1.6}
        color={PALETTE.lamp}
      />

      {/* Shelf. */}
      <mesh position={[0, 1.02, -0.62]} scale={[board * 1.1, 0.5, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={glow}
          color="#2A2130"
          transparent
          opacity={0.18}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <RoundedBox
        args={[board, 0.1, 0.52]}
        radius={0.03}
        smoothness={3}
        position={[0, SHELF_TOP_Y - 0.05, SHELF_Z]}
      >
        <meshStandardMaterial color={PALETTE.wood} roughness={0.9} />
      </RoundedBox>
      <mesh position={[0, SHELF_TOP_Y - 0.12, SHELF_Z + 0.27]}>
        <boxGeometry args={[board, 0.05, 0.03]} />
        <meshStandardMaterial color={PALETTE.woodDark} roughness={0.95} />
      </mesh>

      {spines.map((spine, index) =>
        index === HERO_INDEX ? null : (
          <Book
            key={index}
            spine={spine}
            position={[offsets[index], SHELF_TOP_Y, SHELF_Z]}
          />
        )
      )}
    </group>
  );
}

/* ------------------------------------------------------------ travellers  */

type Key = [t: number, x: number, y: number, z: number, ry: number, rz: number];

/** The flight path of one book, as a short storyboard of poses. */
function keyframes(from: number, to: number, origin: -1 | 1): Key[] {
  const lane = 0.44 * origin;
  // One book crosses in front of the other, so they never intersect.
  const crossZ = origin === -1 ? 1.02 : 0.06;

  return [
    [0, from, SHELF_TOP_Y, SHELF_Z, 0, 0],
    [0.09, from, SHELF_TOP_Y, SHELF_Z, 0, 0],
    [0.22, from * 0.93, 1.82, 0.6, 0.18 * origin, -0.05 * origin],
    [0.36, lane, 2.16, 0.6, 0.44 * origin, 0.04 * origin],
    [0.5, lane * 0.66, 2.1, 0.6, 0.5 * origin, -0.04 * origin],
    [0.64, -lane, 2.2, crossZ, -0.26 * origin, 0],
    [0.78, to * 0.93, 1.82, 0.6, 0, 0.05 * origin],
    [0.89, to, SHELF_TOP_Y, SHELF_Z, 0, 0],
    [1, to, SHELF_TOP_Y, SHELF_Z, 0, 0],
  ];
}

type TravellerProps = {
  spine: Spine;
  slotOffset: number;
  otherSlotOffset: number;
  /** -1 starts in the left nook, 1 starts in the right one. */
  origin: -1 | 1;
};

function Traveller({
  spine,
  slotOffset,
  otherSlotOffset,
  origin,
}: TravellerProps) {
  const group = useRef<THREE.Group>(null);
  const material = useRef<THREE.MeshStandardMaterial>(null);

  const home = origin * SHELF_X + slotOffset;
  const away = -origin * SHELF_X + otherSlotOffset;

  const paths = useMemo(
    () => [keyframes(home, away, origin), keyframes(away, home, origin)],
    [home, away, origin]
  );

  useFrame(({ clock }) => {
    const node = group.current;
    if (!node) return;

    const elapsed = clock.getElapsedTime();
    const cycle = Math.floor(elapsed / CYCLE_SECONDS);
    const t = (elapsed % CYCLE_SECONDS) / CYCLE_SECONDS;

    // Alternate cycles carry the book back, so the two nooks keep trading.
    const keys = paths[cycle % 2];

    let index = 0;
    while (index < keys.length - 2 && t > keys[index + 1][0]) index += 1;

    const a = keys[index];
    const b = keys[index + 1];
    const u = smoothstep(a[0], b[0], t);

    node.position.set(
      THREE.MathUtils.lerp(a[1], b[1], u),
      THREE.MathUtils.lerp(a[2], b[2], u),
      THREE.MathUtils.lerp(a[3], b[3], u)
    );
    node.rotation.set(0, THREE.MathUtils.lerp(a[4], b[4], u), THREE.MathUtils.lerp(a[5], b[5], u));

    // Once it lands, the new book warms the shelf it joined.
    if (material.current) {
      material.current.emissiveIntensity = bloomAt(t) * 0.45;
    }
  });

  return (
    <group ref={group}>
      <RoundedBox
        args={[spine.w, spine.h, BOOK_DEPTH]}
        radius={0.018}
        smoothness={3}
        position={[0, spine.h / 2, 0]}
      >
        <meshStandardMaterial
          ref={material}
          color={spine.color}
          emissive={spine.color}
          emissiveIntensity={0}
          roughness={0.82}
        />
      </RoundedBox>
      <mesh position={[0, spine.h / 2, -0.015]}>
        <boxGeometry
          args={[spine.w * 0.78, spine.h * 0.93, BOOK_DEPTH * 1.03]}
        />
        <meshStandardMaterial color="#F6EEDC" roughness={0.98} />
      </mesh>
      <mesh position={[0, spine.h * 0.7, BOOK_DEPTH / 2 + 0.002]}>
        <planeGeometry args={[spine.w * 0.5, 0.035]} />
        <meshBasicMaterial color={PALETTE.lampCore} transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

/** The soft light that gathers between the books while they hover together. */
function MeetingGlow({ glow }: { glow: THREE.Texture }) {
  const mesh = useRef<THREE.Mesh>(null);
  const light = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const node = mesh.current;
    if (!node) return;

    const t = (clock.getElapsedTime() % CYCLE_SECONDS) / CYCLE_SECONDS;
    const presence = meetingAt(t);

    const material = node.material as THREE.MeshBasicMaterial;
    material.opacity = presence * 0.72;
    const scale = 0.55 + presence * 0.5;
    node.scale.set(scale, scale, 1);

    if (light.current) light.current.intensity = presence * 2.6;
  });

  return (
    <group position={[0, 2.14, 0.42]}>
      <mesh ref={mesh}>
        <planeGeometry args={[2.4, 2.4]} />
        <meshBasicMaterial
          map={glow}
          color={PALETTE.lampCore}
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <pointLight
        ref={light}
        position={[0, 0.1, 1.1]}
        intensity={0}
        distance={4.5}
        decay={1.7}
        color={PALETTE.lampCore}
      />
    </group>
  );
}

/* ----------------------------------------------------------------- scene  */

function Scene() {
  const parallax = useRef<THREE.Group>(null);
  const { size } = useThree();

  const arch = useMemo(() => makeArchTexture(), []);
  const silhouette = useMemo(() => makeSilhouetteTexture(), []);
  const glow = useMemo(() => makeGlowTexture(), []);

  useEffect(
    () => () => {
      arch.dispose();
      silhouette.dispose();
      glow.dispose();
    },
    [arch, silhouette, glow]
  );

  // Stand the camera back far enough that both nooks stay in frame, whatever
  // shape the hero panel happens to be.
  const distance = useMemo(() => {
    const aspect = size.width / Math.max(1, size.height);
    const halfFov = (CAMERA_FOV * Math.PI) / 360;
    const forWidth = FRAME_HALF_WIDTH / (Math.tan(halfFov) * aspect);
    const forHeight = FRAME_HALF_HEIGHT / Math.tan(halfFov);

    return Math.max(forWidth, forHeight);
  }, [size.width, size.height]);

  const left = useMemo(() => layoutRow(LEFT_SPINES), []);
  const right = useMemo(() => layoutRow(RIGHT_SPINES), []);

  useFrame(({ clock, pointer }, delta) => {
    const node = parallax.current;
    if (!node) return;

    const elapsed = clock.getElapsedTime();
    const damp = Math.min(1, delta * 1.8);

    node.rotation.y = THREE.MathUtils.lerp(
      node.rotation.y,
      pointer.x * 0.12 + Math.sin(elapsed * 0.15) * 0.02,
      damp
    );
    node.rotation.x = THREE.MathUtils.lerp(
      node.rotation.x,
      -pointer.y * 0.045,
      damp
    );
  });

  return (
    <>
      <PerspectiveCamera
        makeDefault
        fov={CAMERA_FOV}
        near={0.1}
        far={40}
        position={[0, LOOK_Y, distance]}
      />

      {/* Dim, warm fill — the lamps are meant to do the work. */}
      <ambientLight intensity={0.55} color="#FFF1DC" />
      <hemisphereLight
        intensity={0.35}
        color="#FFE7C4"
        groundColor={PALETTE.floor}
      />
      <directionalLight position={[0, 4, 6]} intensity={0.5} color="#FFF6E8" />

      <group ref={parallax} position={[0, LOOK_Y, 0]}>
        <group position={[0, -LOOK_Y, 0]}>
          <Nook
            side={-1}
            spines={LEFT_SPINES}
            arch={arch}
            silhouette={silhouette}
            glow={glow}
            arriving={[HERO_RIGHT.color, HERO_LEFT.color]}
          />
          <Nook
            side={1}
            spines={RIGHT_SPINES}
            arch={arch}
            silhouette={silhouette}
            glow={glow}
            arriving={[HERO_LEFT.color, HERO_RIGHT.color]}
          />

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

          <MeetingGlow glow={glow} />
        </group>
      </group>
    </>
  );
}

/* --------------------------------------------------------------- exported */

export default function BookSwapScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <Scene />
    </Canvas>
  );
}
