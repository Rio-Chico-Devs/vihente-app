import { useEffect, useRef } from 'react';

// Self-contained 3D spinning coin canvas animation.
// Fills whatever container it's placed in.
// Props: onCoinClick (called on click for easter-egg counter),
//        colorR/G/B  (primary colour, 0-255 each)
export default function CoinLogo3D({ onCoinClick, colorR = 0, colorG = 255, colorB = 255 }) {
  const canvasRef      = useRef(null);
  const onClickRef     = useRef(onCoinClick);

  // Keep callback ref current without restarting animation
  useEffect(() => { onClickRef.current = onCoinClick; }, [onCoinClick]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { desynchronized: true });
    if (!ctx) return;

    const CR = colorR, CG = colorG, CB = colorB;

    let W, H, CX, CY, R;
    let t0 = 0, prevTs = 0;
    let glitchT = 0;
    const GLITCH_DUR = 0.75;
    let alive = true;
    let breathe = 1; // slow glow pulse, updated each frame

    // ── Sizing ──────────────────────────────────────────────────────────────
    function resize() {
      const dpr  = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      W = rect.width  || canvas.offsetWidth  || 480;
      H = rect.height || canvas.offsetHeight || 480;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      CX = W / 2;
      CY = H / 2;
      R  = Math.min(W, H) * 0.40;
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    function handleClick() {
      glitchT = GLITCH_DUR;
      if (onClickRef.current) onClickRef.current();
    }
    canvas.addEventListener('click', handleClick);

    // ── 3D math ──────────────────────────────────────────────────────────────
    function rotY(x, y, z, a) {
      return [x * Math.cos(a) + z * Math.sin(a), y, -x * Math.sin(a) + z * Math.cos(a)];
    }
    function rotX(x, y, z, a) {
      return [x, y * Math.cos(a) - z * Math.sin(a), y * Math.sin(a) + z * Math.cos(a)];
    }

    const CAM_Z = 5.5;
    function project(x, y, z) {
      const d = CAM_Z - z;
      if (d < 0.01) return null;
      const f = CAM_Z / d;
      return [CX + x * R * f, CY - y * R * f, z];
    }
    function xfm(px, py, faceZ, spinA, tiltA) {
      let [x, y, z] = [px, py, faceZ];
      [x, y, z] = rotY(x, y, z, spinA);
      [x, y, z] = rotX(x, y, z, tiltA);
      return project(x, y, z);
    }

    // ── Eye geometry ─────────────────────────────────────────────────────────
    const S    = 1 / 238;
    const norm = (x, y) => [(x - 500) * S, -(y - 500) * S];

    function cubicBezier(ax, ay, bx, by, cx, cy, dx, dy, t) {
      const u = 1 - t;
      return [
        u*u*u*ax + 3*u*u*t*bx + 3*u*t*t*cx + t*t*t*dx,
        u*u*u*ay + 3*u*u*t*by + 3*u*t*t*cy + t*t*t*dy,
      ];
    }

    const eyeSegs = [
      [norm(350,500), norm(390,430), norm(440,400), norm(500,400)],
      [norm(500,400), norm(560,400), norm(610,430), norm(650,500)],
      [norm(650,500), norm(610,570), norm(560,600), norm(500,600)],
      [norm(500,600), norm(440,600), norm(390,570), norm(350,500)],
    ];

    function sampleBezier(seg, n) {
      const pts = [];
      for (let i = 0; i < n; i++)
        pts.push(cubicBezier(...seg[0], ...seg[1], ...seg[2], ...seg[3], i / n));
      return pts;
    }

    const EYE_PTS   = eyeSegs.flatMap(s => sampleBezier(s, 20));

    function circlePts(r, n) {
      return Array.from({ length: n + 1 }, (_, i) => {
        const a = (i / n) * Math.PI * 2;
        return [Math.cos(a) * r, Math.sin(a) * r];
      });
    }

    const IRIS_R  = 80 * S;
    const PUPIL_R = 35 * S;

    const IRIS_PTS  = circlePts(IRIS_R,  44);
    const PUPIL_PTS = circlePts(PUPIL_R, 28);
    const RIM_PTS   = circlePts(1.0, 72);

    const THICKNESS = 0.30;

    // Half-band widths (normalised coin units) — each element gets an inner
    // and outer cylindrical wall so it looks like a real extruded band.
    const RIM_HB  = 0.044;
    const EYE_HB  = 0.036;
    const IRIS_HB = 0.028;
    const PUP_HB  = 0.022;

    const RIM_OUTER  = circlePts(1.0      + RIM_HB,  72);
    const RIM_INNER  = circlePts(1.0      - RIM_HB,  72);
    const IRIS_OUTER = circlePts(IRIS_R   + IRIS_HB, 44);
    const IRIS_INNER = circlePts(IRIS_R   - IRIS_HB, 44);
    const PUP_OUTER  = circlePts(PUPIL_R  + PUP_HB,  28);
    const PUP_INNER  = circlePts(PUPIL_R  - PUP_HB,  28);

    // Eye path inner/outer: radial offset at each point
    function offsetEyePts(delta) {
      return EYE_PTS.map(([x, y]) => {
        const r = Math.sqrt(x * x + y * y);
        if (r < 0.001) return [x, y];
        const f = (r + delta) / r;
        return [x * f, y * f];
      });
    }
    const EYE_OUTER = offsetEyePts( EYE_HB);
    const EYE_INNER = offsetEyePts(-EYE_HB);
    const ZF =  THICKNESS / 2;
    const ZB = -THICKNESS / 2;

    // ── Helpers ───────────────────────────────────────────────────────────────
    function polyPath(pts, faceZ, spinA, tiltA, mirrorX) {
      ctx.beginPath();
      let started = false;
      for (const [px, py] of pts) {
        const p = xfm(px * mirrorX, py, faceZ, spinA, tiltA);
        if (!p) continue;
        if (!started) { ctx.moveTo(p[0], p[1]); started = true; }
        else ctx.lineTo(p[0], p[1]);
      }
    }

    // ── Ambient glow (modulated by breathe) ──────────────────────────────────
    function drawGlow(abscos) {
      const glowR = R * (1.35 + 0.05 * abscos);
      const g = ctx.createRadialGradient(CX, CY, R * 0.4, CX, CY, glowR);
      g.addColorStop(0,   `rgba(${CR},${CG},${CB},${(0.055 * abscos * breathe).toFixed(4)})`);
      g.addColorStop(0.5, `rgba(${CR},${CG},${CB},${(0.013 * breathe).toFixed(4)})`);
      g.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    }

    // ── Coin face ─────────────────────────────────────────────────────────────
    function drawFace(faceZ, spinA, tiltA, isFront, faceAlpha, isNear) {
      if (faceAlpha < 0.015) return;
      const mirrorX = isFront ? 1 : -1;
      const ea    = Math.min(1, faceAlpha * (isNear ? 1.1 : 0.75));
      const lwRim = isNear ? (9.0 + faceAlpha * 7.0) : (4.0 + faceAlpha * 4.0);
      const lwEye = isNear ? (6.0 + faceAlpha * 7.0) : (3.0 + faceAlpha * 3.0);

      // Fake rim glow: one wide+faint pass before the main stroke.
      if (isNear && faceAlpha > 0.45) {
        ctx.lineWidth   = lwRim * 2.6;
        ctx.strokeStyle = `rgba(${CR},${CG},${CB},${(ea * 0.09 * breathe).toFixed(3)})`;
        polyPath(RIM_PTS, faceZ, spinA, tiltA, 1);
        ctx.closePath(); ctx.stroke();
      }

      ctx.strokeStyle = `rgba(${CR},${CG},${CB},${ea.toFixed(3)})`;
      ctx.lineWidth   = lwRim;
      polyPath(RIM_PTS, faceZ, spinA, tiltA, 1);
      ctx.closePath(); ctx.stroke();

      ctx.lineWidth = lwEye;
      polyPath(EYE_PTS, faceZ, spinA, tiltA, mirrorX);
      ctx.closePath(); ctx.stroke();

      ctx.lineWidth = lwEye * 0.84;
      polyPath(IRIS_PTS, faceZ, spinA, tiltA, mirrorX);
      ctx.closePath(); ctx.stroke();

      ctx.lineWidth = lwEye * 0.68;
      polyPath(PUPIL_PTS, faceZ, spinA, tiltA, mirrorX);
      ctx.closePath(); ctx.stroke();
    }

    // ── Filled quad walls ─────────────────────────────────────────────────────
    // inward=true flips the outward normal so inner cylindrical walls are
    // camera-facing from the inside (needed for ring interiors).
    function buildPathQuads(pts, spinA, tiltA, closed, inward = false) {
      const quads = [];
      const n     = pts.length;
      const count = closed ? n : n - 1;
      for (let i = 0; i < count; i++) {
        const [px0, py0] = pts[i];
        const [px1, py1] = pts[(i + 1) % n];
        const mx = (px0 + px1) / 2, my = (py0 + py1) / 2;
        const mlen = Math.sqrt(mx * mx + my * my);
        if (mlen < 0.001) continue;
        const nx = inward ? -(mx / mlen) : (mx / mlen);
        const ny = inward ? -(my / mlen) : (my / mlen);
        const normalCamZ = -nx * Math.sin(spinA);
        const c1 = xfm(px0, py0, ZF, spinA, tiltA);
        const c2 = xfm(px1, py1, ZF, spinA, tiltA);
        const c3 = xfm(px1, py1, ZB, spinA, tiltA);
        const c4 = xfm(px0, py0, ZB, spinA, tiltA);
        if (!c1 || !c2 || !c3 || !c4) continue;
        const avgZ    = (c1[2] + c2[2] + c3[2] + c4[2]) / 4;
        const diffuse = Math.max(0, ny * 0.85 + normalCamZ * 0.32);
        // 0.06 ambient keeps back-facing quads dimly visible through hollow face
        const shade   = 0.06 + (0.08 + diffuse * 0.44) * Math.max(0, normalCamZ);
        quads.push({ c1, c2, c3, c4, normalCamZ, shade, avgZ });
      }
      return quads;
    }

    // Annular cap faces at ZF or ZB: flat quads connecting outer to inner edge,
    // closing each ring into a proper solid 3D band (like a washer).
    function buildCapQuads(outerPts, innerPts, faceZ, spinA, tiltA, closed = false) {
      const sign      = faceZ > 0 ? 1 : -1;
      const faceNormZ = sign * Math.cos(spinA) * Math.cos(tiltA);
      if (faceNormZ <= 0) return [];
      const shade = faceNormZ * 0.65;
      const n     = Math.min(outerPts.length, innerPts.length);
      const count = closed ? n : n - 1;
      const quads = [];
      for (let i = 0; i < count; i++) {
        const j  = (i + 1) % n;
        const c1 = xfm(outerPts[i][0], outerPts[i][1], faceZ, spinA, tiltA);
        const c2 = xfm(outerPts[j][0], outerPts[j][1], faceZ, spinA, tiltA);
        const c3 = xfm(innerPts[j][0], innerPts[j][1], faceZ, spinA, tiltA);
        const c4 = xfm(innerPts[i][0], innerPts[i][1], faceZ, spinA, tiltA);
        if (!c1 || !c2 || !c3 || !c4) continue;
        const avgZ = (c1[2] + c2[2] + c3[2] + c4[2]) / 4;
        quads.push({ c1, c2, c3, c4, shade, avgZ });
      }
      return quads;
    }

    // Each ring element gets: outer cylindrical wall + inner cylindrical wall
    // + flat annular caps at ZF and ZB. Together these form a complete solid band.
    function drawEdge(spinA, tiltA) {
      const quads = [];

      const walls = [
        [RIM_OUTER,  false, false],
        [RIM_INNER,  false, true ],
        [EYE_OUTER,  true,  false],
        [EYE_INNER,  true,  true ],
        [IRIS_OUTER, false, false],
        [IRIS_INNER, false, true ],
        [PUP_OUTER,  false, false],
        [PUP_INNER,  false, true ],
      ];
      for (const [pts, closed, inward] of walls) {
        for (const q of buildPathQuads(pts, spinA, tiltA, closed, inward)) {
          quads.push(q); // all quads included — back-facing render dimly through hollow face
        }
      }

      // Annular caps close each ring into a solid 3D band
      const caps = [
        [RIM_OUTER,  RIM_INNER,  false],
        [EYE_OUTER,  EYE_INNER,  true ],
        [IRIS_OUTER, IRIS_INNER, false],
        [PUP_OUTER,  PUP_INNER,  false],
      ];
      for (const [outer, inner, closed] of caps) {
        for (const q of buildCapQuads(outer, inner, ZF, spinA, tiltA, closed)) quads.push(q);
        for (const q of buildCapQuads(outer, inner, ZB, spinA, tiltA, closed)) quads.push(q);
      }

      quads.sort((a, b) => a.avgZ - b.avgZ);
      for (const { c1, c2, c3, c4, shade } of quads) {
        const s = Math.min(1, shade);
        ctx.fillStyle = `rgb(${Math.round(s*CR*0.70)},${Math.round(s*CG*0.63)},${Math.round(s*CB*0.82)})`;
        ctx.beginPath();
        ctx.moveTo(c1[0], c1[1]); ctx.lineTo(c2[0], c2[1]);
        ctx.lineTo(c3[0], c3[1]); ctx.lineTo(c4[0], c4[1]);
        ctx.closePath();
        ctx.fill();
      }
    }

    // ── Glitch overlay (clipped to coin area) ─────────────────────────────────
    function drawGlitch(intensity) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(CX, CY, R * 1.38, 0, Math.PI * 2);
      ctx.clip();

      const xL     = CX - R * 1.4;
      const glitchW = R * 2.8;
      const yMin   = CY - R * 1.3;
      const yRange = R * 2.6;

      const bands = Math.floor(2 + intensity * 6);
      for (let i = 0; i < bands; i++) {
        const y = yMin + Math.random() * yRange;
        const h = 1 + Math.random() * 4;
        const a = (0.06 + Math.random() * 0.18 * intensity).toFixed(3);
        ctx.fillStyle = `rgba(${CR},${CG},${CB},${a})`;
        ctx.fillRect(xL, y, glitchW, h);
      }

      if (intensity > 0.88) {
        ctx.fillStyle = `rgba(${CR},${CG},${CB},${((intensity - 0.88) * 4 * 0.10).toFixed(3)})`;
        ctx.fillRect(xL, yMin, glitchW, yRange);
      }
      ctx.restore();
    }

    // ── Render loop ───────────────────────────────────────────────────────────
    function loop(ts) {
      if (!alive) return;
      if (!t0) { t0 = ts; prevTs = ts; }
      const time = (ts - t0) / 1000;
      const dt   = Math.min((ts - prevTs) / 1000, 0.05);
      prevTs = ts;

      if (glitchT > 0) glitchT = Math.max(0, glitchT - dt);
      const glitchI = glitchT / GLITCH_DUR;

      // Slow breathing pulse — ~10.5s period, range 0.68 → 1.0
      breathe = 0.68 + 0.32 * (0.5 + 0.5 * Math.sin(time * 0.6));

      const stutter = glitchI > 0 ? Math.sin(time * 28) * 0.18 * glitchI * glitchI : 0;
      const spinA   = 0.74 * time + stutter;
      const tiltA   = 0.07 * Math.sin(time * 0.55);
      const cosSpin = Math.cos(spinA);
      const abscos  = Math.abs(cosSpin);

      ctx.clearRect(0, 0, W, H);
      drawGlow(abscos);

      // edgeFloor keeps faces softly visible when coin is edge-on (cosSpin≈0)
      // so the animation never fully "turns off" mid-spin.
      const edgeFloor = 0.14 * (1 - abscos);
      const fF_near   = Math.max(0,  cosSpin);
      const fF_alpha  = Math.max(edgeFloor, fF_near + Math.max(0, -cosSpin) * 0.30);
      const fF_isNear = cosSpin >= 0;
      const fB_near   = Math.max(0, -cosSpin);
      const fB_alpha  = Math.max(edgeFloor, fB_near + Math.max(0,  cosSpin) * 0.30);
      const fB_isNear = cosSpin < 0;

      if (cosSpin >= 0) {
        drawFace(ZB, spinA, tiltA, false, fB_alpha, fB_isNear);
        drawEdge(spinA, tiltA);
        drawFace(ZF, spinA, tiltA, true,  fF_alpha, fF_isNear);
      } else {
        drawFace(ZF, spinA, tiltA, true,  fF_alpha, fF_isNear);
        drawEdge(spinA, tiltA);
        drawFace(ZB, spinA, tiltA, false, fB_alpha, fB_isNear);
      }

      if (glitchI > 0) drawGlitch(glitchI);
      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);

    return () => {
      alive = false;
      ro.disconnect();
      canvas.removeEventListener('click', handleClick);
    };
  }, [colorR, colorG, colorB]); // restarts only on theme change

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block', cursor: 'crosshair' }}
    />
  );
}
