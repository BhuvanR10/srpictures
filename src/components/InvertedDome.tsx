"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  Component,
  type ReactNode,
} from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ApertureLoader from "./ApertureLoader";

// Register Three.js JSX elements for R3F catalogue
extend({ Mesh: THREE.Mesh, ShaderMaterial: THREE.ShaderMaterial });

// --- GLSL Shaders ---

const vertexShader = /* glsl */ `
attribute vec2 aCell;

uniform vec2 uResolution;
uniform vec2 uOffset;
uniform vec2 uTile;
uniform vec2 uPitch;
uniform vec2 uHalfCount;
uniform vec2 uAtlasGrid;
uniform vec2 uInset;
uniform float uRotation;
uniform float uCurve;
uniform float uCurveRadius;
uniform float uZoom;
uniform float uSeed;
uniform float uImageCount;

varying vec2 vUv;
varying vec2 vLocal;
varying float vEdge;

float safeMod(float x, float m) {
  return x - m * floor(x / m);
}

float getTileIndex(vec2 cell, float N, float seed) {
  if (N <= 1.0) return 0.0;
  float cx = safeMod(cell.x, N);
  float cy = safeMod(cell.y, N);
  float p1 = safeMod(N, 7.0) != 0.0 ? 7.0 : (safeMod(N, 11.0) != 0.0 ? 11.0 : 13.0);
  float p2 = safeMod(N, 13.0) != 0.0 ? 13.0 : (safeMod(N, 17.0) != 0.0 ? 17.0 : 5.0);
  if (safeMod(p2, N) == safeMod(p1, N)) {
    p2 = safeMod(N, 5.0) != 0.0 ? 5.0 : 3.0;
  }
  float k = safeMod(cx * p1 + cy * p2 + seed * 3.0, N);
  float p3 = safeMod(N, 17.0) != 0.0 ? 17.0 : 19.0;
  return floor(safeMod(k * p3 + 7.0, N));
}

vec2 lens(vec2 screen) {
  vec2 res = max(uResolution, vec2(1.0, 1.0));
  vec2 n = screen / res - 0.5;
  float aspect = res.x / res.y;
  n.x *= aspect;
  float rad = max(uCurveRadius, 0.001);
  float t = length(n) / rad;
  float z = sqrt(max(0.5 - t * t, 0.0004));
  n *= uZoom + uCurve / max(z, 0.001);
  n.x /= max(aspect, 0.001);
  return (n + 0.5) * res;
}

void main() {
  vec2 pitch = max(uPitch, vec2(1.0, 1.0));
  vec2 cell = aCell - uHalfCount + floor(uOffset / pitch);
  vec2 origin = cell * pitch - uOffset + uResolution * 0.5;

  vec2 local = uv * uTile;
  vec2 centre = origin + uTile * 0.5;
  vec2 rel = local - uTile * 0.5;
  float c = cos(uRotation);
  float s = sin(uRotation);
  rel = vec2(rel.x * c - rel.y * s, rel.x * s + rel.y * c);
  vec2 screen = lens(centre + rel);

  vec2 n = screen / uResolution - 0.5;
  n.x *= uResolution.x / uResolution.y;
  vEdge = length(n);

  float index = clamp(floor(getTileIndex(cell, uImageCount, uSeed)), 0.0, max(uImageCount - 1.0, 0.0));
  float col = safeMod(index, uAtlasGrid.x);
  float row = floor(index / uAtlasGrid.x);
  vec2 slot = vec2(clamp(col, 0.0, uAtlasGrid.x - 1.0), clamp(row, 0.0, uAtlasGrid.y - 1.0));

  vec2 padded = clamp(mix(uInset, 1.0 - uInset, vec2(uv.x, 1.0 - uv.y)), uInset, 1.0 - uInset);
  vUv = clamp((slot + padded) / uAtlasGrid, vec2(0.0001, 0.0001), vec2(0.9999, 0.9999));
  vLocal = local;

  vec2 clip = screen / uResolution * 2.0 - 1.0;
  gl_Position = vec4(clip, 0.0, 1.0);
}
`;

const fragmentShader = /* glsl */ `
precision highp float;

uniform sampler2D uAtlas;
uniform vec2 uTile;
uniform float uRadius;
uniform float uGrayscale;
uniform float uVignette;
uniform float uVignetteReach;

varying vec2 vUv;
varying vec2 vLocal;
varying float vEdge;

float roundedBox(vec2 p, vec2 extent, float r) {
  vec2 q = abs(p) - extent + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

void main() {
  vec4 tex = texture2D(uAtlas, vUv);
  vec2 extent = uTile * 0.5;
  float r = min(uRadius, min(extent.x, extent.y));
  float d = roundedBox(vLocal - extent, extent, r);
  float aa = fwidth(d);
  float shape = 1.0 - smoothstep(-aa, aa, d);
  if (shape < 0.003) discard;

  vec3 color = tex.rgb;

  if (uGrayscale > 0.01) {
    float luma = dot(tex.rgb, vec3(0.299, 0.587, 0.114));
    color = mix(tex.rgb, vec3(luma), uGrayscale);
    if (uGrayscale > 0.5) {
      color = clamp((color - 0.5) * 1.15 + 0.52, 0.0, 1.0);
    }
  } else {
    // Subtle luxury vibrance enhancement
    color = clamp((color - 0.5) * 1.04 + 0.51, 0.0, 1.0);
  }

  if (uVignette > 0.001) {
    float fade = smoothstep(0.0, uVignetteReach, vEdge);
    color *= 1.0 - uVignette * fade;
  }
  gl_FragColor = vec4(color, tex.a * shape);
}
`;

// --- Math & Texture Helpers ---

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));
const safeMod = (x: number, m: number) => x - m * Math.floor(x / m);

const getTileIndex = (cellX: number, cellY: number, N: number, seed = 0): number => {
  if (N <= 1) return 0;
  const cx = safeMod(cellX, N);
  const cy = safeMod(cellY, N);
  const p1 = safeMod(N, 7) !== 0 ? 7 : safeMod(N, 11) !== 0 ? 11 : 13;
  let p2 = safeMod(N, 13) !== 0 ? 13 : safeMod(N, 17) !== 0 ? 17 : 5;
  if (safeMod(p2, N) === safeMod(p1, N)) {
    p2 = safeMod(N, 5) !== 0 ? 5 : 3;
  }
  const k = safeMod(cx * p1 + cy * p2 + seed * 3, N);
  const p3 = safeMod(N, 17) !== 0 ? 17 : 19;
  return Math.floor(safeMod(k * p3 + 7, N));
};

const loadImage = (src: string): Promise<HTMLImageElement | null> =>
  new Promise((resolve) => {
    const img = new Image();
    if (src.startsWith("http://") || src.startsWith("https://")) {
      img.crossOrigin = "anonymous";
    }
    img.decoding = "async";
    img.onload = () => {
      if ("decode" in img && typeof img.decode === "function") {
        img.decode().then(() => resolve(img)).catch(() => resolve(img));
      } else {
        resolve(img);
      }
    };
    img.onerror = () => {
      if (img.crossOrigin) {
        const fallback = new Image();
        fallback.onload = () => resolve(fallback);
        fallback.onerror = () => resolve(null);
        fallback.src = src;
      } else {
        resolve(null);
      }
    };
    img.src = src;
  });

interface AtlasData {
  texture: THREE.CanvasTexture;
  columns: number;
  rows: number;
  count: number;
  inset: { x: number; y: number };
}

function buildTextureAtlas(
  images: HTMLImageElement[],
  aspect: number,
  maxAnisotropy: number
): AtlasData | null {
  const count = images.length;
  if (!count) return null;

  const cols = Math.max(Math.ceil(Math.sqrt(count)), 1);
  const rows = Math.max(Math.ceil(count / cols), 1);
  const safeAspect = Math.max(aspect, 0.1);
  let slotWidth = 512;
  let slotHeight = Math.round(512 / safeAspect);

  const maxDimension = Math.max(slotWidth * cols, slotHeight * rows);
  if (maxDimension > 2048) {
    const scale = 2048 / maxDimension;
    slotWidth = Math.max(Math.floor(slotWidth * scale), 16);
    slotHeight = Math.max(Math.floor(slotHeight * scale), 16);
  }

  const canvas = document.createElement("canvas");
  canvas.width = slotWidth * cols;
  canvas.height = slotHeight * rows;
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) return null;

  // Solid dark background ensures zero unpainted artifacts
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // Fill all slots in the grid (wrapping around if needed) so there are zero empty slots
  const totalSlots = cols * rows;
  for (let idx = 0; idx < totalSlots; idx++) {
    const img = images[idx % count];
    const col = idx % cols;
    const row = Math.floor(idx / cols);
    const x = col * slotWidth;
    const y = row * slotHeight;
    const nw = img.naturalWidth || img.width || slotWidth;
    const nh = img.naturalHeight || img.height || slotHeight;
    const scale = Math.max(slotWidth / Math.max(nw, 1), slotHeight / Math.max(nh, 1));
    const w = nw * scale;
    const h = nh * scale;

    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, slotWidth, slotHeight);
    ctx.clip();
    ctx.drawImage(img, x + (slotWidth - w) / 2, y + (slotHeight - h) / 2, w, h);
    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.anisotropy = maxAnisotropy;
  texture.needsUpdate = true;

  return {
    texture,
    columns: cols,
    rows,
    count,
    inset: { x: slotWidth > 0 ? 2.0 / slotWidth : 0, y: slotHeight > 0 ? 2.0 / slotHeight : 0 },
  };
}

// --- Inner WebGL Scene ---

interface SceneProps {
  sources: string[];
  tileWidth: number;
  tileHeight: number;
  gap: number;
  borderRadius: number;
  curve: number;
  curveRadius: number;
  zoom: number;
  tileRotation: number;
  grayscale: number;
  vignette: number;
  autoScrollX: number;
  autoScrollY: number;
  axis: "both" | "x" | "y";
  friction: number;
  segments: number;
  seed: number;
  readMotion: () => {
    offset: { x: number; y: number };
    velocity: { x: number; y: number };
    dragging: boolean;
    wake: () => void;
  };
  onReady: () => void;
}

const DomeScene: React.FC<SceneProps> = ({
  sources,
  tileWidth,
  tileHeight,
  gap,
  borderRadius,
  curve,
  curveRadius,
  zoom,
  tileRotation,
  grayscale,
  vignette,
  autoScrollX,
  autoScrollY,
  axis,
  friction,
  segments,
  seed,
  readMotion,
  onReady,
}) => {
  const { gl, size, invalidate } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const [atlas, setAtlas] = useState<AtlasData | null>(null);
  const aspect = tileWidth / Math.max(tileHeight, 1);

  useEffect(() => {
    let canceled = false;
    const maxAnisotropy = gl?.capabilities?.getMaxAnisotropy?.() ?? 16;

    Promise.all(sources.map(loadImage)).then((loaded) => {
      if (canceled) return;
      const validImages = loaded.filter(
        (img): img is HTMLImageElement => img !== null
      );
      const builtAtlas = buildTextureAtlas(validImages, aspect, maxAnisotropy);
      setAtlas(builtAtlas);
      if (builtAtlas) onReady();
      invalidate();
    });

    return () => {
      canceled = true;
    };
  }, [sources, aspect, gl, invalidate, onReady]);

  useEffect(() => {
    if (atlas) return () => atlas.texture.dispose();
  }, [atlas]);

  useEffect(() => {
    const motion = readMotion();
    motion.wake = invalidate;
    return () => {
      motion.wake = () => {};
    };
  }, [readMotion, invalidate]);

  const pitchX = tileWidth + gap;
  const pitchY = tileHeight + gap;
  const cols = Math.min(Math.ceil((1.35 * size.width) / pitchX) + 3, 60);
  const rows = Math.min(Math.ceil((1.35 * size.height) / pitchY) + 3, 60);
  const instanceCount = Math.min(cols * rows, 900);
  const segs = Math.round(clamp(segments, 4, 64));

  const geometry = useMemo(() => {
    const plane = new THREE.PlaneGeometry(1, 1, segs, segs);
    const instGeometry = new THREE.InstancedBufferGeometry();
    instGeometry.index = plane.index;
    instGeometry.setAttribute("position", plane.getAttribute("position"));
    instGeometry.setAttribute("uv", plane.getAttribute("uv"));

    const cells = new Float32Array(2 * instanceCount);
    for (let i = 0; i < instanceCount; i++) {
      cells[2 * i] = i % cols;
      cells[2 * i + 1] = Math.floor(i / cols);
    }
    instGeometry.setAttribute("aCell", new THREE.InstancedBufferAttribute(cells, 2));
    instGeometry.instanceCount = instanceCount;
    return instGeometry;
  }, [segs, instanceCount, cols]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  const uniforms = useMemo(
    () => ({
      uAtlas: { value: null as THREE.Texture | null },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uOffset: { value: new THREE.Vector2(0, 0) },
      uTile: { value: new THREE.Vector2(1, 1) },
      uPitch: { value: new THREE.Vector2(1, 1) },
      uHalfCount: { value: new THREE.Vector2(0, 0) },
      uAtlasGrid: { value: new THREE.Vector2(1, 1) },
      uInset: { value: new THREE.Vector2(0, 0) },
      uRotation: { value: 0 },
      uCurve: { value: 0.3 },
      uCurveRadius: { value: 1.0 },
      uZoom: { value: 0.1 },
      uSeed: { value: 0 },
      uImageCount: { value: 1 },
      uRadius: { value: 0 },
      uGrayscale: { value: 0 },
      uVignette: { value: 0 },
      uVignetteReach: { value: 1 },
    }),
    []
  );

  useEffect(() => {
    invalidate();
  }, [
    atlas,
    tileWidth,
    tileHeight,
    gap,
    borderRadius,
    curve,
    curveRadius,
    zoom,
    tileRotation,
    grayscale,
    vignette,
    seed,
    size,
    invalidate,
  ]);

  useFrame((_, delta) => {
    const mat = materialRef.current;
    const motion = readMotion();
    if (!mat || !atlas) return;

    // Constrain delta-time to avoid physics jumps
    const dt = Math.min(delta, 0.033);

    if (!motion.dragging) {
      // Exponential frame-rate independent friction damping
      const frictionFactor = Math.pow(clamp(friction, 0, 0.99), 60 * dt);
      motion.velocity.x *= frictionFactor;
      motion.velocity.y *= frictionFactor;
      if (Math.abs(motion.velocity.x) < 0.001) motion.velocity.x = 0;
      if (Math.abs(motion.velocity.y) < 0.001) motion.velocity.y = 0;
      motion.offset.x += motion.velocity.x * dt * 60;
      motion.offset.y += motion.velocity.y * dt * 60;
    }

    if (axis !== "y") motion.offset.x += autoScrollX * dt;
    if (axis !== "x") motion.offset.y -= autoScrollY * dt;

    const minDim = Math.max(Math.min(size.width, size.height), 1);
    const diagRatio = Math.hypot(size.width / minDim, size.height / minDim);

    const u = mat.uniforms;
    u.uAtlas.value = atlas.texture;
    u.uResolution.value.set(size.width, size.height);
    u.uOffset.value.set(motion.offset.x, motion.offset.y);
    u.uTile.value.set(tileWidth, tileHeight);
    u.uPitch.value.set(pitchX, pitchY);
    u.uHalfCount.value.set(Math.floor(cols / 2), Math.floor(rows / 2));
    u.uAtlasGrid.value.set(atlas.columns, atlas.rows);
    u.uInset.value.set(atlas.inset.x, atlas.inset.y);
    u.uRotation.value = (tileRotation * Math.PI) / 180;
    u.uCurve.value = Math.max(curve, 0);
    u.uCurveRadius.value = 0.72 * diagRatio * Math.max(curveRadius, 1);
    u.uZoom.value = Math.max(zoom, 0.05);
    u.uSeed.value = Math.round(clamp(seed, 0, 1000));
    u.uImageCount.value = atlas.count;
    u.uRadius.value = Math.max(borderRadius, 0);
    u.uGrayscale.value = clamp(grayscale, 0, 1);
    u.uVignette.value = clamp(vignette, 0, 1);
    u.uVignetteReach.value = 0.5 * diagRatio;
  });

  if (!atlas || size.width <= 0 || size.height <= 0) return null;

  return (
    <mesh geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
};

// --- WebGL Capability & 2D Canvas Fallback Engine ---

function isWebGLSupported(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: true }) ||
      canvas.getContext("webgl", { failIfMajorPerformanceCaveat: true });
    return !!gl;
  } catch {
    return false;
  }
}

class CanvasErrorBoundary extends Component<
  { onError: () => void; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err: unknown) {
    console.warn("WebGL Canvas failed, falling back cleanly to 2D Dome:", err);
    this.props.onError();
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

// Pre-cached image metadata for 60fps 2D rendering
interface ImageMeta {
  img: HTMLImageElement;
  sx: number;
  sy: number;
  sw: number;
  sh: number;
}

function computeAffine(
  x0: number, y0: number,
  x1: number, y1: number,
  x2: number, y2: number,
  u0: number, v0: number,
  u1: number, v1: number,
  u2: number, v2: number
) {
  const delta = (u0 - u2) * (v1 - v2) - (u1 - u2) * (v0 - v2);
  if (Math.abs(delta) < 1e-6) return null;
  const a = ((x0 - x2) * (v1 - v2) - (x1 - x2) * (v0 - v2)) / delta;
  const b = ((y0 - y2) * (v1 - v2) - (y1 - y2) * (v0 - v2)) / delta;
  const c = ((x1 - x2) * (u0 - u2) - (x0 - x2) * (u1 - u2)) / delta;
  const d = ((y1 - y2) * (u0 - u2) - (y0 - y2) * (u1 - u2)) / delta;
  const e = x0 - a * u0 - c * v0;
  const f = y0 - b * u0 - d * v0;
  return { a, b, c, d, e, f };
}

function drawTexturedTriangle(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x0: number, y0: number,
  x1: number, y1: number,
  x2: number, y2: number,
  u0: number, v0: number,
  u1: number, v1: number,
  u2: number, v2: number
) {
  const m = computeAffine(x0, y0, x1, y1, x2, y2, u0, v0, u1, v1, u2, v2);
  if (!m) return;

  // 0.5px sub-pixel centroid expansion to eliminate internal hairline raster seams
  const cx = (x0 + x1 + x2) * 0.3333333333;
  const cy = (y0 + y1 + y2) * 0.3333333333;
  const ex0 = x0 + (x0 - cx) * 0.02;
  const ey0 = y0 + (y0 - cy) * 0.02;
  const ex1 = x1 + (x1 - cx) * 0.02;
  const ey1 = y1 + (y1 - cy) * 0.02;
  const ex2 = x2 + (x2 - cx) * 0.02;
  const ey2 = y2 + (y2 - cy) * 0.02;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(ex0, ey0);
  ctx.lineTo(ex1, ey1);
  ctx.lineTo(ex2, ey2);
  ctx.closePath();
  ctx.clip();
  ctx.transform(m.a, m.b, m.c, m.d, m.e, m.f);
  ctx.drawImage(img, 0, 0);
  ctx.restore();
}

interface Interactive2DDomeProps {
  images: string[];
  tileWidth: number;
  tileHeight: number;
  gap: number;
  borderRadius: number;
  curve: number;
  curveRadius?: number;
  zoom?: number;
  grayscale?: number;
  axis: "both" | "x" | "y";
  autoScrollX: number;
  autoScrollY: number;
  friction: number;
  seed: number;
  readMotion: () => {
    offset: { x: number; y: number };
    velocity: { x: number; y: number };
    dragging: boolean;
    wake: () => void;
  };
  onReady: () => void;
}

const Interactive2DDome: React.FC<Interactive2DDomeProps> = ({
  images,
  tileWidth,
  tileHeight,
  gap,
  borderRadius,
  curve,
  curveRadius = 1.5,
  zoom = 0.1,
  grayscale = 0,
  axis,
  autoScrollX,
  autoScrollY,
  friction,
  seed,
  readMotion,
  onReady,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loadedMetaRef = useRef<ImageMeta[]>([]);

  // Pre-load images & pre-compute crop rectangles
  useEffect(() => {
    let canceled = false;
    Promise.all(images.map(loadImage)).then((imgs) => {
      if (canceled) return;
      const valid = imgs.filter((img): img is HTMLImageElement => img !== null);
      const cardAspect = tileWidth / Math.max(tileHeight, 1);
      const metas: ImageMeta[] = valid.map((img) => {
        const nw = img.naturalWidth || img.width || 1;
        const nh = img.naturalHeight || img.height || 1;
        const imgAspect = nw / nh;
        let sx = 0, sy = 0, sw = nw, sh = nh;
        if (imgAspect > cardAspect) {
          sw = nh * cardAspect;
          sx = (nw - sw) / 2;
        } else {
          sh = nw / cardAspect;
          sy = (nh - sh) / 2;
        }
        return { img, sx, sy, sw, sh };
      });
      loadedMetaRef.current = metas;
      if (metas.length > 0) onReady();
    });
    return () => {
      canceled = true;
    };
  }, [images, tileWidth, tileHeight, onReady]);

  // Pre-compute local contour & grid geometry in typed arrays (zero runtime trig)
  const localGeometry = useMemo(() => {
    const r = Math.min(borderRadius, tileWidth * 0.4, tileHeight * 0.4);
    const cornerSteps = 3;
    const contourLx = new Float64Array(28);
    const contourLy = new Float64Array(28);
    let idx = 0;

    // Top edge
    for (let i = 0; i <= 3; i++) {
      contourLx[idx] = r + (i / 3) * (tileWidth - 2 * r);
      contourLy[idx] = 0;
      idx++;
    }
    // Top-Right corner
    const trC = { x: tileWidth - r, y: r };
    for (let i = 1; i <= cornerSteps; i++) {
      const angle = -Math.PI / 2 + (i / (cornerSteps + 1)) * (Math.PI / 2);
      contourLx[idx] = trC.x + r * Math.cos(angle);
      contourLy[idx] = trC.y + r * Math.sin(angle);
      idx++;
    }
    // Right edge
    for (let j = 0; j <= 3; j++) {
      contourLx[idx] = tileWidth;
      contourLy[idx] = r + (j / 3) * (tileHeight - 2 * r);
      idx++;
    }
    // Bottom-Right corner
    const brC = { x: tileWidth - r, y: tileHeight - r };
    for (let i = 1; i <= cornerSteps; i++) {
      const angle = (i / (cornerSteps + 1)) * (Math.PI / 2);
      contourLx[idx] = brC.x + r * Math.cos(angle);
      contourLy[idx] = brC.y + r * Math.sin(angle);
      idx++;
    }
    // Bottom edge
    for (let i = 0; i <= 3; i++) {
      contourLx[idx] = tileWidth - r - (i / 3) * (tileWidth - 2 * r);
      contourLy[idx] = tileHeight;
      idx++;
    }
    // Bottom-Left corner
    const blC = { x: r, y: tileHeight - r };
    for (let i = 1; i <= cornerSteps; i++) {
      const angle = Math.PI / 2 + (i / (cornerSteps + 1)) * (Math.PI / 2);
      contourLx[idx] = blC.x + r * Math.cos(angle);
      contourLy[idx] = blC.y + r * Math.sin(angle);
      idx++;
    }
    // Left edge
    for (let j = 0; j <= 3; j++) {
      contourLx[idx] = 0;
      contourLy[idx] = tileHeight - r - (j / 3) * (tileHeight - 2 * r);
      idx++;
    }
    // Top-Left corner
    const tlC = { x: r, y: r };
    for (let i = 1; i <= cornerSteps; i++) {
      const angle = Math.PI + (i / (cornerSteps + 1)) * (Math.PI / 2);
      contourLx[idx] = tlC.x + r * Math.cos(angle);
      contourLy[idx] = tlC.y + r * Math.sin(angle);
      idx++;
    }

    // 2x2 grid points (4 quads = 8 triangles) for inner surface warping
    const gridLx = new Float64Array(9);
    const gridLy = new Float64Array(9);
    for (let j = 0; j <= 2; j++) {
      for (let i = 0; i <= 2; i++) {
        const gIdx = j * 3 + i;
        gridLx[gIdx] = (i / 2) * tileWidth;
        gridLy[gIdx] = (j / 2) * tileHeight;
      }
    }

    return { contourLx, contourLy, gridLx, gridLy, count: idx };
  }, [tileWidth, tileHeight, borderRadius]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animId: number;
    let lastTime = performance.now();

    // Zero-allocation reusable buffers for projected points
    const pContourX = new Float64Array(28);
    const pContourY = new Float64Array(28);
    const pGridX = new Float64Array(9);
    const pGridY = new Float64Array(9);
    const tempPoint = new Float64Array(2);

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.033);
      lastTime = time;

      const motion = readMotion();
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      if (w > 0 && h > 0) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const targetW = Math.round(w * dpr);
        const targetH = Math.round(h * dpr);
        if (canvas.width !== targetW || canvas.height !== targetH) {
          canvas.width = targetW;
          canvas.height = targetH;
        }

        ctx.save();
        ctx.scale(dpr, dpr);

        // Solid pitch black background
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, w, h);

        if (!motion.dragging) {
          const frictionFactor = Math.pow(clamp(friction, 0, 0.99), 60 * dt);
          motion.velocity.x *= frictionFactor;
          motion.velocity.y *= frictionFactor;
          if (Math.abs(motion.velocity.x) < 0.001) motion.velocity.x = 0;
          if (Math.abs(motion.velocity.y) < 0.001) motion.velocity.y = 0;
          motion.offset.x += motion.velocity.x * dt * 60;
          motion.offset.y += motion.velocity.y * dt * 60;
        }

        if (axis !== "y") motion.offset.x += autoScrollX * dt;
        if (axis !== "x") motion.offset.y -= autoScrollY * dt;

        const metas = loadedMetaRef.current;
        if (metas.length > 0) {
          const pitchX = tileWidth + gap;
          const pitchY = tileHeight + gap;
          const aspect = w / Math.max(h, 1);
          const minDim = Math.max(Math.min(w, h), 1);
          const diagRatio = Math.hypot(w / minDim, h / minDim);
          const radParam = 0.72 * diagRatio * Math.max(curveRadius, 1);
          const zoomParam = Math.max(zoom, 0.05);

          // Fast zero-allocation inline lens projection
          const projectFast = (
            screenX: number,
            screenY: number,
            out: Float64Array,
            outIdx: number
          ): boolean => {
            const nx = (screenX / w - 0.5) * aspect;
            const ny = screenY / h - 0.5;
            const dist = Math.hypot(nx, ny);
            const t = dist / radParam;
            if (t * t >= 0.499) return false;
            const z = Math.sqrt(Math.max(0.5 - t * t, 0.0004));
            const factor = zoomParam + curve / z;
            out[outIdx] = ((nx * factor) / aspect + 0.5) * w;
            out[outIdx + 1] = (ny * factor + 0.5) * h;
            return true;
          };

          const colsCount = Math.min(Math.ceil((1.35 * w) / pitchX) + 3, 40);
          const rowsCount = Math.min(Math.ceil((1.35 * h) / pitchY) + 3, 30);
          const halfCols = Math.floor(colsCount / 2);
          const halfRows = Math.floor(rowsCount / 2);
          const baseCellX = Math.floor(motion.offset.x / pitchX);
          const baseCellY = Math.floor(motion.offset.y / pitchY);

          const { contourLx, contourLy, gridLx, gridLy, count } = localGeometry;

          // Color & contrast setup
          if (grayscale > 0.05) {
            ctx.filter = `grayscale(${Math.round(grayscale * 100)}%) contrast(115%) brightness(105%)`;
          } else {
            ctx.filter = "contrast(104%) saturate(106%)";
          }
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";

          for (let ry = 0; ry < rowsCount; ry++) {
            for (let cx = 0; cx < colsCount; cx++) {
              const cellX = cx - halfCols + baseCellX;
              const cellY = ry - halfRows + baseCellY;

              const originX = cellX * pitchX - motion.offset.x + w * 0.5;
              const originY = cellY * pitchY - motion.offset.y + h * 0.5;

              // Fast center culling check
              if (!projectFast(originX + tileWidth * 0.5, originY + tileHeight * 0.5, tempPoint, 0)) {
                continue;
              }
              const px = tempPoint[0];
              const py = tempPoint[1];
              if (px < -160 || px > w + 160 || py < -160 || py > h + 160) {
                continue;
              }

              // Project perimeter contour directly into typed arrays
              let contourValid = true;
              for (let k = 0; k < count; k++) {
                if (!projectFast(originX + contourLx[k], originY + contourLy[k], tempPoint, 0)) {
                  contourValid = false;
                  break;
                }
                pContourX[k] = tempPoint[0];
                pContourY[k] = tempPoint[1];
              }
              if (!contourValid) continue;

              // Project 9 grid vertices
              let gridValid = true;
              for (let k = 0; k < 9; k++) {
                if (!projectFast(originX + gridLx[k], originY + gridLy[k], tempPoint, 0)) {
                  gridValid = false;
                  break;
                }
                pGridX[k] = tempPoint[0];
                pGridY[k] = tempPoint[1];
              }
              if (!gridValid) continue;

              const metaIdx = getTileIndex(cellX, cellY, metas.length, seed);
              const meta = metas[metaIdx];
              if (!meta) continue;

              ctx.save();
              ctx.beginPath();
              ctx.moveTo(pContourX[0], pContourY[0]);
              for (let k = 1; k < count; k++) {
                ctx.lineTo(pContourX[k], pContourY[k]);
              }
              ctx.closePath();
              ctx.clip();

              // Draw the 4 quads (8 textured triangles)
              for (let j = 0; j < 2; j++) {
                for (let i = 0; i < 2; i++) {
                  const idx0 = j * 3 + i;
                  const idx1 = j * 3 + (i + 1);
                  const idx2 = (j + 1) * 3 + (i + 1);
                  const idx3 = (j + 1) * 3 + i;

                  const x0 = pGridX[idx0], y0 = pGridY[idx0];
                  const x1 = pGridX[idx1], y1 = pGridY[idx1];
                  const x2 = pGridX[idx2], y2 = pGridY[idx2];
                  const x3 = pGridX[idx3], y3 = pGridY[idx3];

                  const u0 = meta.sx + (i * 0.5) * meta.sw;
                  const u1 = meta.sx + ((i + 1) * 0.5) * meta.sw;
                  const v0 = meta.sy + (j * 0.5) * meta.sh;
                  const v1 = meta.sy + ((j + 1) * 0.5) * meta.sh;

                  // Triangle 1
                  drawTexturedTriangle(ctx, meta.img, x0, y0, x1, y1, x2, y2, u0, v0, u1, v0, u1, v1);
                  // Triangle 2
                  drawTexturedTriangle(ctx, meta.img, x0, y0, x2, y2, x3, y3, u0, v0, u1, v1, u0, v1);
                }
              }

              ctx.restore();
            }
          }
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [
    tileWidth,
    tileHeight,
    gap,
    curve,
    curveRadius,
    zoom,
    axis,
    friction,
    autoScrollX,
    autoScrollY,
    seed,
    grayscale,
    localGeometry,
    readMotion,
  ]);

  return <canvas ref={canvasRef} className="h-full w-full block pointer-events-none" />;
};

// --- Main InvertedDome Component ---

export interface InvertedDomeProps {
  images: string[];
  tileWidth?: number;
  tileHeight?: number;
  gap?: number;
  borderRadius?: number;
  curve?: number;
  curveRadius?: number;
  zoom?: number;
  tileRotation?: number;
  grayscale?: number;
  vignette?: number;
  autoScrollX?: number;
  autoScrollY?: number;
  enableDrag?: boolean;
  enableWheel?: boolean;
  axis?: "both" | "x" | "y";
  dragSensitivity?: number;
  wheelSensitivity?: number;
  friction?: number;
  segments?: number;
  seed?: number;
  backgroundColor?: string;
  dpr?: number;
  openOnClick?: boolean;
  onTileClick?: (index: number, src: string) => void;
  onLoad?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const InvertedDome: React.FC<InvertedDomeProps> = ({
  images,
  tileWidth = 230,
  tileHeight = 180,
  gap = 16,
  borderRadius = 16,
  curve = 0.34,
  curveRadius = 1.5,
  zoom = 0.1,
  tileRotation = 0,
  grayscale = 0,
  vignette = 0.0,
  autoScrollX = 12,
  autoScrollY = 0,
  enableDrag = true,
  enableWheel = true,
  axis = "both",
  dragSensitivity = 1.0,
  wheelSensitivity = 0.5,
  friction = 0.92,
  segments = 20,
  seed = 0,
  backgroundColor = "#000000",
  dpr = 2,
  openOnClick = true,
  onTileClick,
  onLoad,
  className = "",
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const motionRef = useRef({
    offset: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    dragging: false,
    wake: () => {},
  });
  const readMotion = useCallback(() => motionRef.current, []);

  const [ready, setReady] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(true);
  const [useWebGL, setUseWebGL] = useState<boolean>(() => {
    try {
      return isWebGLSupported();
    } catch {
      return false;
    }
  });

  const shouldReduceMotion = useReducedMotion();
  const screenDpr = useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(min-resolution: 2dppx)");
      mq.addEventListener("change", onStoreChange);
      window.addEventListener("resize", onStoreChange);
      return () => {
        mq.removeEventListener("change", onStoreChange);
        window.removeEventListener("resize", onStoreChange);
      };
    },
    () => window.devicePixelRatio || 1,
    () => 1
  );
  const effectiveDpr = Math.min(screenDpr, Math.max(dpr, 0.5));
  const validImages = useMemo(() => images.filter(Boolean), [images]);

  const handleReady = useCallback(() => {
    setReady(true);
    onLoad?.();
  }, [onLoad]);

  // Pause rendering when scrolled out of view
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Raycasting / Inverse Lens Hit-Testing
  const hitTest = useCallback(
    (clientX: number, clientY: number): number | null => {
      const el = containerRef.current;
      if (!el || !validImages.length) return null;
      const rect = el.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (!w || !h) return null;

      const unproject = (
        x: number,
        y: number,
        width: number,
        height: number,
        zoomVal: number,
        curveVal: number,
        radiusVal: number
      ) => {
        const aspect = width / height;
        const nx = (x / width - 0.5) * aspect;
        const ny = y / height - 0.5;
        const targetDist = Math.hypot(nx, ny);
        if (targetDist < 1e-6) return { x: 0.5 * width, y: 0.5 * height };

        const forwardLens = (dist: number) => {
          const t = dist / radiusVal;
          return (
            dist *
            (zoomVal + curveVal / Math.sqrt(Math.max(0.5 - t * t, 0.0004)))
          );
        };

        let low = 0;
        let high = radiusVal * Math.SQRT1_2;
        if (forwardLens(high) < targetDist) return null;

        for (let i = 0; i < 40; i++) {
          const mid = (low + high) / 2;
          if (forwardLens(mid) < targetDist) low = mid;
          else high = mid;
        }
        const resolvedDist = (low + high) / 2 / targetDist;
        return {
          x: ((nx * resolvedDist) / aspect + 0.5) * width,
          y: (ny * resolvedDist + 0.5) * height,
        };
      };

      const minDim = Math.max(Math.min(w, h), 1);
      const diagRatio = Math.hypot(w / minDim, h / minDim);
      const radiusParam = 0.72 * diagRatio * Math.max(curveRadius, 1);

      const clickScreenY = useWebGL
        ? h - (clientY - rect.top)
        : clientY - rect.top;

      const unprojected = unproject(
        clientX - rect.left,
        clickScreenY,
        w,
        h,
        Math.max(zoom, 0.05),
        Math.max(curve, 0),
        radiusParam
      );
      if (!unprojected) return null;

      const { offset } = motionRef.current;
      const worldX = unprojected.x - 0.5 * w + offset.x;
      const worldY = unprojected.y - 0.5 * h + offset.y;

      const pitchX = tileWidth + gap;
      const pitchY = tileHeight + gap;
      const rad = (-tileRotation * Math.PI) / 180;
      const cosR = Math.cos(rad);
      const sinR = Math.sin(rad);

      const baseCol = Math.floor(worldX / pitchX);
      const baseRow = Math.floor(worldY / pitchY);

      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const col = baseCol + dx;
          const row = baseRow + dy;
          const localX = worldX - (col * pitchX + 0.5 * tileWidth);
          const localY = worldY - (row * pitchY + 0.5 * tileHeight);
          const rotX = localX * cosR - localY * sinR;
          const rotY = localX * sinR + localY * cosR;

          if (
            Math.abs(rotX) <= 0.5 * tileWidth &&
            Math.abs(rotY) <= 0.5 * tileHeight
          ) {
            return getTileIndex(
              col,
              row,
              validImages.length,
              Math.round(clamp(seed, 0, 1000))
            );
          }
        }
      }
      return null;
    },
    [
      validImages,
      useWebGL,
      zoom,
      curve,
      curveRadius,
      tileWidth,
      tileHeight,
      gap,
      tileRotation,
      seed,
    ]
  );

  // High-precision pointer velocity & inertia tracking
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const motion = motionRef.current;
    const lastPos = { x: 0, y: 0 };
    const clickTrack = { x: 0, y: 0, time: 0, armed: false };
    const isYOnly = axis === "y";
    const isXOnly = axis === "x";

    const velocityTracker = {
      points: [] as { x: number; y: number; t: number }[],
      add(x: number, y: number) {
        const now = performance.now();
        this.points.push({ x, y, t: now });
        if (this.points.length > 5) this.points.shift();
      },
      getVelocity() {
        if (this.points.length < 2) return { vx: 0, vy: 0 };
        const now = performance.now();
        const newest = this.points[this.points.length - 1];
        if (now - newest.t > 75) return { vx: 0, vy: 0 }; // User stopped before lifting
        const oldest = this.points[0];
        const dt = (newest.t - oldest.t) / 1000;
        if (dt < 0.015) return { vx: 0, vy: 0 };
        return {
          vx: (newest.x - oldest.x) / dt,
          vy: (newest.y - oldest.y) / dt,
        };
      },
      reset() {
        this.points = [];
      },
    };

    const isInsideLightbox = (e: Event) =>
      (e.target as HTMLElement)?.closest("[data-dome-lightbox]") !== null;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 || isInsideLightbox(e)) return;
      clickTrack.x = e.clientX;
      clickTrack.y = e.clientY;
      clickTrack.time = performance.now();
      clickTrack.armed = openOnClick || !!onTileClick;

      if (enableDrag) {
        e.preventDefault();
        el.setPointerCapture(e.pointerId);
        velocityTracker.reset();
        velocityTracker.add(e.clientX, e.clientY);
        motion.dragging = true;
        motion.velocity.x = 0;
        motion.velocity.y = 0;
        lastPos.x = e.clientX;
        lastPos.y = e.clientY;
        setIsDragging(true);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!motion.dragging) return;
      velocityTracker.add(e.clientX, e.clientY);
      const dx = isYOnly ? 0 : (e.clientX - lastPos.x) * dragSensitivity;
      const dy = isXOnly ? 0 : (e.clientY - lastPos.y) * dragSensitivity;
      lastPos.x = e.clientX;
      lastPos.y = e.clientY;

      motion.offset.x -= dx;
      motion.offset.y += dy;
      motion.wake();
    };

    const onPointerUp = (e: PointerEvent) => {
      const wasDragging = motion.dragging;
      motion.dragging = false;
      if (el.hasPointerCapture(e.pointerId)) {
        el.releasePointerCapture(e.pointerId);
      }
      if (wasDragging) {
        setIsDragging(false);
        const vel = velocityTracker.getVelocity();
        // Calibrated smooth fling momentum (normalized per 60fps frame)
        const maxFling = 50;
        motion.velocity.x = clamp(-vel.vx * (1 / 60) * dragSensitivity, -maxFling, maxFling);
        motion.velocity.y = clamp(vel.vy * (1 / 60) * dragSensitivity, -maxFling, maxFling);
        motion.wake();
      }

      const moveDist = Math.hypot(
        e.clientX - clickTrack.x,
        e.clientY - clickTrack.y
      );
      if (
        clickTrack.armed &&
        e.type === "pointerup" &&
        moveDist < 6 &&
        performance.now() - clickTrack.time < 500
      ) {
        const hitIdx = hitTest(e.clientX, e.clientY);
        if (hitIdx !== null) {
          onTileClick?.(hitIdx, validImages[hitIdx]);
          if (openOnClick) {
            motion.velocity.x = 0;
            motion.velocity.y = 0;
            setActiveImageIndex(hitIdx);
          }
        }
      }
      clickTrack.armed = false;
    };

    const onWheel = (e: WheelEvent) => {
      if (!enableWheel || isInsideLightbox(e)) return;
      e.preventDefault();
      // Smooth out trackpad and wheel delta spikes
      const dx = Math.abs(e.deltaX) < 120 ? e.deltaX : Math.sign(e.deltaX) * 120;
      const dy = Math.abs(e.deltaY) < 120 ? e.deltaY : Math.sign(e.deltaY) * 120;
      if (!isYOnly) motion.velocity.x += dx * wheelSensitivity * 0.15;
      if (!isXOnly) motion.velocity.y -= dy * wheelSensitivity * 0.15;
      motion.wake();
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      el.removeEventListener("wheel", onWheel);
    };
  }, [
    enableDrag,
    enableWheel,
    axis,
    dragSensitivity,
    wheelSensitivity,
    openOnClick,
    onTileClick,
    hitTest,
    validImages,
  ]);

  // Close lightbox on Escape
  useEffect(() => {
    if (activeImageIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveImageIndex(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeImageIndex]);

  const activeSrc =
    openOnClick && activeImageIndex !== null
      ? validImages[activeImageIndex]
      : null;

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full overflow-hidden select-none bg-black ${
        enableDrag
          ? isDragging
            ? "cursor-grabbing"
            : "cursor-grab"
          : "cursor-pointer"
      } ${className}`}
      style={{
        backgroundColor: "#000000",
        touchAction: enableDrag ? "none" : undefined,
      }}
    >
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: ready ? 1 : 0 }}
      >
        {useWebGL ? (
          <CanvasErrorBoundary onError={() => setUseWebGL(false)}>
            <Canvas
              orthographic
              dpr={effectiveDpr}
              frameloop={isInView ? "always" : "never"}
              gl={{
                antialias: true,
                alpha: false,
                powerPreference: "high-performance",
              }}
            >
              <DomeScene
                sources={validImages}
                tileWidth={tileWidth}
                tileHeight={tileHeight}
                gap={gap}
                borderRadius={borderRadius}
                curve={curve}
                curveRadius={curveRadius}
                zoom={zoom}
                tileRotation={tileRotation}
                grayscale={grayscale}
                vignette={vignette}
                autoScrollX={shouldReduceMotion ? 0 : autoScrollX}
                autoScrollY={shouldReduceMotion ? 0 : autoScrollY}
                axis={axis}
                friction={shouldReduceMotion ? 0 : friction}
                segments={segments}
                seed={seed}
                readMotion={readMotion}
                onReady={handleReady}
              />
            </Canvas>
          </CanvasErrorBoundary>
        ) : (
          <Interactive2DDome
            images={validImages}
            tileWidth={tileWidth}
            tileHeight={tileHeight}
            gap={gap}
            borderRadius={borderRadius}
            curve={curve}
            curveRadius={curveRadius}
            zoom={zoom}
            grayscale={grayscale}
            axis={axis}
            autoScrollX={shouldReduceMotion ? 0 : autoScrollX}
            autoScrollY={shouldReduceMotion ? 0 : autoScrollY}
            friction={shouldReduceMotion ? 0 : friction}
            seed={seed}
            readMotion={readMotion}
            onReady={handleReady}
          />
        )}
      </div>

      {/* Theme-Matched Aperture Loading State */}
      <AnimatePresence>
        {!ready && (
          <motion.div
            key="dome-loading-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm pointer-events-none"
          >
            <ApertureLoader label="Loading Inverted Dome Gallery..." size="lg" />
          </motion.div>
        )}
      </AnimatePresence>

      {children && (
        <div className="pointer-events-none relative z-10 h-full w-full">
          {children}
        </div>
      )}

      {/* Internal Lightbox Modal (if openOnClick is true) */}
      <AnimatePresence>
        {activeSrc && (
          <motion.div
            data-dome-lightbox=""
            role="dialog"
            aria-modal="true"
            aria-label="Expanded gallery preview"
            className="absolute inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/85 p-6 backdrop-blur-xl sm:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={() => setActiveImageIndex(null)}
          >
            <motion.img
              src={activeSrc}
              alt="Gallery Preview"
              draggable={false}
              className="max-h-full max-w-full cursor-default object-contain shadow-2xl"
              style={{ borderRadius: Math.max(borderRadius, 0) }}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              aria-label="Close preview"
              className="absolute top-5 right-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none"
              onClick={() => setActiveImageIndex(null)}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const M = InvertedDome;
export default InvertedDome;
