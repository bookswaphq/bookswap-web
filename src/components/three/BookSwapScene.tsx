"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, RoundedBox } from "@react-three/drei";
import {
  BOARD_WIDTH,
  BOOK_DEPTH,
  CYCLE_SECONDS,
  type FlatBook,
  HERO_INDEX,
  HERO_LEFT,
  HERO_RIGHT,
  LEFT_FRAME_X,
  LEFT_SPINES,
  PALETTE,
  PROP_X,
  RIGHT_MUG_X,
  RIGHT_SPINES,
  RIGHT_STACK,
  RIGHT_STACK_X,
  SHELF_Z,
  SHELVES,
  type Spine,
  bloomAt,
  layoutRow,
  meetingAt,
  smoothstep,
} from "./scene-config";
import { makeGlowTexture, makeIvyTexture, makeMountainTexture } from "./textures";

const CAMERA_FOV = 34;
const FRAME_HALF_WIDTH = 3.9;
const FRAME_HALF_HEIGHT = 1.38;
/** Vertical centre of the composition — the camera looks straight at it. */
const LOOK_Y = 1.55;

/* ------------------------------------------------------------------ book  */

/** A book standing on its shelf, spine out. */
function Book({
  spine,
  position = [0, 0, 0],
}: {
  spine: Spine;
  position?: [number, number, number];
}) {
  return (
    <group position={position} rotation={[0, 0, spine.tilt ?? 0]}>
      <RoundedBox
        args={[spine.w, spine.h, BOOK_DEPTH]}
        radius={0.018}
        smoothness={3}
        position={[0, spine.h / 2, 0]}
      >
        <meshStandardMaterial color={spine.color} roughness={0.86} metalness={0} />
      </RoundedBox>

      {/* Page block peeking out behind the spine. */}
      <mesh position={[0, spine.h / 2, -0.015]}>
        <boxGeometry args={[spine.w * 0.78, spine.h * 0.93, BOOK_DEPTH * 1.03]} />
        <meshStandardMaterial color="#F4EEE2" roughness={0.98} />
      </mesh>

      {spine.band ? (
        <mesh position={[0, spine.h * 0.7, BOOK_DEPTH / 2 + 0.002]}>
          <planeGeometry args={[spine.w * 0.5, 0.032]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.75} />
        </mesh>
      ) : null}
    </group>
  );
}

/** A few books lying flat, the way they end up on a real shelf. */
function FlatStack({
  books,
  position,
}: {
  books: FlatBook[];
  position: [number, number, number];
}) {
  // Cumulative heights, so each book sits on the one below it.
  const placed = useMemo(
    () =>
      books.map((book, index) => ({
        book,
        y: books.slice(0, index).reduce((sum, below) => sum + below.h, 0) + book.h / 2,
      })),
    [books]
  );

  return (
    <group position={position}>
      {placed.map(({ book, y }, index) => (
        <group key={index} position={[0, y, 0]} rotation={[0, book.skew, 0]}>
          <RoundedBox args={[book.w, book.h, book.d]} radius={0.012} smoothness={3}>
            <meshStandardMaterial color={book.color} roughness={0.88} />
          </RoundedBox>
          {/* The page edge, so the stack reads as books and not as blocks. */}
          <mesh position={[book.w * 0.5 - 0.012, 0, 0]}>
            <boxGeometry args={[0.02, book.h * 0.82, book.d * 0.94]} />
            <meshStandardMaterial color="#F4EEE2" roughness={0.98} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ----------------------------------------------------- the plant shelf's props */

/** A sage pot with something green trailing over the edge of the shelf. */
function Plant({
  ivy,
  position,
}: {
  ivy: THREE.Texture;
  position: [number, number, number];
}) {
  return (
    <group position={position}>
      <mesh position={[0, 0.13, 0]}>
        <cylinderGeometry args={[0.145, 0.115, 0.26, 22]} />
        <meshStandardMaterial color={PALETTE.sage} roughness={0.92} />
      </mesh>
      <mesh position={[0, 0.27, 0]}>
        <cylinderGeometry args={[0.16, 0.155, 0.05, 22]} />
        <meshStandardMaterial color={PALETTE.sageDark} roughness={0.92} />
      </mesh>

      {/* The greenery itself, painted and hung just in front of the shelf edge. */}
      <mesh position={[0.03, -0.42, 0.31]}>
        <planeGeometry args={[0.86, 1.6]} />
        <meshBasicMaterial map={ivy} transparent depthWrite={false} toneMapped={false} />
      </mesh>
    </group>
  );
}

/** A small framed drawing of a mountain, leaning back on the shelf. */
function Frame({
  picture,
  position,
}: {
  picture: THREE.Texture;
  position: [number, number, number];
}) {
  return (
    <group position={position} rotation={[-0.13, -0.16, 0]}>
      <RoundedBox
        args={[0.52, 0.44, 0.035]}
        radius={0.012}
        smoothness={3}
        position={[0, 0.22, 0]}
      >
        <meshStandardMaterial color={PALETTE.tan} roughness={0.85} />
      </RoundedBox>
      <mesh position={[0, 0.22, 0.021]}>
        <planeGeometry args={[0.44, 0.36]} />
        <meshBasicMaterial map={picture} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------ the reading corner's props */

/** A small plum table lamp — the only warm light in the scene. */
function PlumLamp({
  glow,
  position,
  bloom,
}: {
  glow: THREE.Texture;
  position: [number, number, number];
  bloom: React.RefObject<number>;
}) {
  const light = useRef<THREE.PointLight>(null);
  const halo = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const breath = 0.96 + Math.sin(clock.getElapsedTime() * 0.7) * 0.04;
    const swell = 1 + (bloom.current ?? 0) * 1.4;

    if (light.current) light.current.intensity = 1.5 * breath * swell;
    if (halo.current) {
      const material = halo.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.34 * breath * swell;
    }
  });

  return (
    <group position={position}>
      <mesh position={[0, 0.025, 0]}>
        <cylinderGeometry args={[0.12, 0.14, 0.05, 20]} />
        <meshStandardMaterial color={PALETTE.plumDeep} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 0.32, 12]} />
        <meshStandardMaterial color={PALETTE.plumDeep} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.47, 0]}>
        <cylinderGeometry args={[0.12, 0.19, 0.24, 26, 1, true]} />
        <meshStandardMaterial
          color={PALETTE.plum}
          roughness={0.75}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, 0.36, 0]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial color={PALETTE.lampWarm} toneMapped={false} />
      </mesh>

      <mesh ref={halo} position={[0, 0.3, 0.06]} scale={[1.5, 1.5, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={glow}
          color={PALETTE.lampWarm}
          transparent
          opacity={0.34}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <pointLight
        ref={light}
        position={[0, 0.34, 0.16]}
        intensity={1.5}
        distance={3.4}
        decay={1.8}
        color={PALETTE.lampWarm}
      />
    </group>
  );
}

/** A ceramic mug, left at the front of the shelf. */
function Mug({ position, handle }: { position: [number, number, number]; handle: -1 | 1 }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.125, 0]}>
        <cylinderGeometry args={[0.115, 0.098, 0.25, 22]} />
        <meshStandardMaterial color={PALETTE.cream} roughness={0.55} />
      </mesh>
      <mesh position={[0, 0.245, 0]}>
        <cylinderGeometry args={[0.092, 0.092, 0.02, 22]} />
        <meshStandardMaterial color="#6B4A2E" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.118, 0.118, 0.038, 22]} />
        <meshStandardMaterial color={PALETTE.plum} roughness={0.6} />
      </mesh>
      <mesh position={[handle * 0.13, 0.125, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.062, 0.018, 8, 20]} />
        <meshStandardMaterial color={PALETTE.cream} roughness={0.55} />
      </mesh>
    </group>
  );
}

/** Reading glasses, folded and leaning against the stack. */
function Glasses({ position }: { position: [number, number, number] }) {
  const metal = (
    <meshStandardMaterial color={PALETTE.ink} roughness={0.4} metalness={0.25} />
  );

  return (
    <group position={position} rotation={[-0.22, 0.24, 0.05]}>
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 0.095, 0, 0]}>
          <torusGeometry args={[0.082, 0.013, 8, 22]} />
          {metal}
        </mesh>
      ))}
      <mesh>
        <boxGeometry args={[0.036, 0.013, 0.013]} />
        {metal}
      </mesh>
      {/* Folded temples, tucked back behind the lenses. */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[side * 0.15, -0.01, -0.08]}
          rotation={[0, side * 0.55, 0]}
        >
          <boxGeometry args={[0.012, 0.012, 0.18]} />
          {metal}
        </mesh>
      ))}
    </group>
  );
}

/* ----------------------------------------------------------------- shelf  */

type ShelfProps = {
  /** -1 for the left shelf, 1 for the right one. */
  side: -1 | 1;
  shelf: (typeof SHELVES)["left"] | (typeof SHELVES)["right"];
  spines: Spine[];
  room: "plants" | "corner";
  ivy: THREE.Texture;
  picture: THREE.Texture;
  glow: THREE.Texture;
  /** Colour this shelf takes on when it receives a book, per cycle parity. */
  arriving: [string, string];
};

function Shelf({
  side,
  shelf,
  spines,
  room,
  ivy,
  picture,
  glow,
  arriving,
}: ShelfProps) {
  const { offsets } = useMemo(() => layoutRow(spines), [spines]);

  const wash = useRef<THREE.Mesh>(null);
  const bloom = useRef(0);

  const base = useMemo(() => new THREE.Color(PALETTE.shadow), []);
  const accents = useMemo(() => arriving.map((hex) => new THREE.Color(hex)), [arriving]);
  const scratch = useMemo(() => new THREE.Color(), []);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    const cycle = Math.floor(elapsed / CYCLE_SECONDS);
    const t = (elapsed % CYCLE_SECONDS) / CYCLE_SECONDS;

    bloom.current = bloomAt(t);

    if (wash.current) {
      const material = wash.current.material as THREE.MeshBasicMaterial;
      const accent = accents[cycle % accents.length];
      scratch.copy(base).lerp(accent, 0.35 + bloom.current * 0.5);
      material.color.copy(scratch);
      material.opacity = 0.3 + bloom.current * 0.34;
    }
  });

  const top = shelf.top;

  return (
    <group position={[shelf.x, 0, 0]}>
      {/* Shadow the shelf drops behind and below itself. */}
      <mesh
        position={[0, top - 0.26, SHELF_Z - 0.45]}
        scale={[BOARD_WIDTH * 0.78, 0.86, 1]}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={glow}
          color={PALETTE.shadow}
          transparent
          opacity={0.24}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      {/* The darker line right under the board. */}
      <mesh
        ref={wash}
        position={[0, top - 0.13, SHELF_Z - 0.32]}
        scale={[BOARD_WIDTH * 0.56, 0.34, 1]}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={glow}
          color={PALETTE.shadow}
          transparent
          opacity={0.3}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Board and its two brackets. */}
      <RoundedBox
        args={[BOARD_WIDTH, 0.09, 0.5]}
        radius={0.025}
        smoothness={3}
        position={[0, top - 0.045, SHELF_Z]}
      >
        <meshStandardMaterial color={shelf.wood} roughness={0.9} />
      </RoundedBox>
      <mesh position={[0, top - 0.075, SHELF_Z + 0.25]}>
        <boxGeometry args={[BOARD_WIDTH, 0.035, 0.02]} />
        <meshStandardMaterial color={shelf.edge} roughness={0.95} />
      </mesh>
      {[-1, 1].map((bracket) => (
        <mesh
          key={bracket}
          position={[bracket * (BOARD_WIDTH / 2 - 0.5), top - 0.17, SHELF_Z - 0.04]}
        >
          <boxGeometry args={[0.1, 0.17, 0.34]} />
          <meshStandardMaterial color={shelf.edge} roughness={0.9} />
        </mesh>
      ))}

      {spines.map((spine, index) =>
        index === HERO_INDEX ? null : (
          <Book key={index} spine={spine} position={[offsets[index], top, SHELF_Z]} />
        )
      )}

      {room === "plants" ? (
        <>
          <Plant ivy={ivy} position={[side * PROP_X, top, SHELF_Z]} />
          <Frame picture={picture} position={[-side * LEFT_FRAME_X, top, SHELF_Z - 0.02]} />
        </>
      ) : (
        <>
          <PlumLamp glow={glow} position={[side * PROP_X, top, SHELF_Z]} bloom={bloom} />
          <FlatStack books={RIGHT_STACK} position={[side * RIGHT_STACK_X, top, SHELF_Z]} />
          <Glasses position={[side * (RIGHT_STACK_X + 0.02), top + 0.1, SHELF_Z + 0.27]} />
          <Mug position={[side * RIGHT_MUG_X, top, SHELF_Z + 0.02]} handle={side} />
        </>
      )}
    </group>
  );
}

/* ------------------------------------------------------------ travellers  */

type Key = [t: number, x: number, y: number, z: number, ry: number, rz: number];

/** The flight path of one book, as a short storyboard of poses. */
function keyframes(
  from: number,
  to: number,
  fromY: number,
  toY: number,
  origin: -1 | 1
): Key[] {
  const lane = 0.44 * origin;
  // One book crosses in front of the other, so they never intersect.
  const crossZ = origin === -1 ? 0.95 : 0.05;

  return [
    [0, from, fromY, SHELF_Z, 0, 0],
    [0.09, from, fromY, SHELF_Z, 0, 0],
    [0.22, from * 0.93, 1.5, 0.5, 0.18 * origin, -0.05 * origin],
    [0.36, lane, 1.78, 0.55, 0.44 * origin, 0.04 * origin],
    [0.5, lane * 0.66, 1.74, 0.55, 0.5 * origin, -0.04 * origin],
    [0.64, -lane, 1.82, crossZ, -0.26 * origin, 0],
    [0.78, to * 0.93, 1.5, 0.5, 0, 0.05 * origin],
    [0.89, to, toY, SHELF_Z, 0, 0],
    [1, to, toY, SHELF_Z, 0, 0],
  ];
}

function Traveller({
  spine,
  slotOffset,
  otherSlotOffset,
  origin,
}: {
  spine: Spine;
  slotOffset: number;
  otherSlotOffset: number;
  /** -1 starts on the left shelf, 1 starts on the right one. */
  origin: -1 | 1;
}) {
  const group = useRef<THREE.Group>(null);
  const material = useRef<THREE.MeshStandardMaterial>(null);

  const own = origin === -1 ? SHELVES.left : SHELVES.right;
  const other = origin === -1 ? SHELVES.right : SHELVES.left;

  const home = own.x + slotOffset;
  const away = other.x + otherSlotOffset;

  const paths = useMemo(
    () => [
      keyframes(home, away, own.top, other.top, origin),
      keyframes(away, home, other.top, own.top, origin),
    ],
    [home, away, own.top, other.top, origin]
  );

  useFrame(({ clock }) => {
    const node = group.current;
    if (!node) return;

    const elapsed = clock.getElapsedTime();
    const cycle = Math.floor(elapsed / CYCLE_SECONDS);
    const t = (elapsed % CYCLE_SECONDS) / CYCLE_SECONDS;

    // Alternate cycles carry the book back, so the two shelves keep trading.
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
    node.rotation.set(
      0,
      THREE.MathUtils.lerp(a[4], b[4], u),
      THREE.MathUtils.lerp(a[5], b[5], u)
    );

    // Once it lands, the new book warms the shelf it joined.
    if (material.current) {
      material.current.emissiveIntensity = bloomAt(t) * 0.4;
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
        <boxGeometry args={[spine.w * 0.78, spine.h * 0.93, BOOK_DEPTH * 1.03]} />
        <meshStandardMaterial color="#F4EEE2" roughness={0.98} />
      </mesh>
      <mesh position={[0, spine.h * 0.7, BOOK_DEPTH / 2 + 0.002]}>
        <planeGeometry args={[spine.w * 0.5, 0.032]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.75} />
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
    material.opacity = presence * 0.6;
    const scale = 0.55 + presence * 0.5;
    node.scale.set(scale, scale, 1);

    if (light.current) light.current.intensity = presence * 2.2;
  });

  return (
    <group position={[0, 1.78, 0.38]}>
      <mesh ref={mesh}>
        <planeGeometry args={[2.4, 2.4]} />
        <meshBasicMaterial
          map={glow}
          color="#FFF3DE"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <pointLight
        ref={light}
        position={[0, 0.1, 1]}
        intensity={0}
        distance={4}
        decay={1.7}
        color="#FFF3DE"
      />
    </group>
  );
}

/* ----------------------------------------------------------------- scene  */

function Scene() {
  const parallax = useRef<THREE.Group>(null);
  const { size } = useThree();

  const ivy = useMemo(() => makeIvyTexture(), []);
  const picture = useMemo(() => makeMountainTexture(), []);
  const glow = useMemo(() => makeGlowTexture(), []);

  useEffect(
    () => () => {
      ivy.dispose();
      picture.dispose();
      glow.dispose();
    },
    [ivy, picture, glow]
  );

  // Stand the camera back far enough that both shelves stay in frame, whatever
  // shape the hero happens to be.
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
      pointer.x * 0.1 + Math.sin(elapsed * 0.15) * 0.015,
      damp
    );
    node.rotation.x = THREE.MathUtils.lerp(node.rotation.x, -pointer.y * 0.04, damp);
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

      {/* Even, neutral daylight — the plum lamp is the only warm source. */}
      <ambientLight intensity={1.15} color="#FFFDF8" />
      <hemisphereLight intensity={0.5} color="#FFFFFF" groundColor="#D8D3C9" />
      <directionalLight position={[-3, 5, 6]} intensity={1.15} color="#FFFBF2" />
      <directionalLight position={[5, 2, 3]} intensity={0.35} color="#F0F2FF" />

      <group ref={parallax} position={[0, LOOK_Y, 0]}>
        <group position={[0, -LOOK_Y, 0]}>
          <Shelf
            side={-1}
            shelf={SHELVES.left}
            spines={LEFT_SPINES}
            room="plants"
            ivy={ivy}
            picture={picture}
            glow={glow}
            arriving={[HERO_RIGHT.color, HERO_LEFT.color]}
          />
          <Shelf
            side={1}
            shelf={SHELVES.right}
            spines={RIGHT_SPINES}
            room="corner"
            ivy={ivy}
            picture={picture}
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
