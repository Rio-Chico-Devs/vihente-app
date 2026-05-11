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
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const CR = colorR, CG = colorG, CB = colorB;

    let W, H, CX, CY, R;
    let t0 = 0, prevTs = 0;
    let glitchT = 0;
    const GLITCH_DUR = 0.75;
    let alive = true;

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

    const EYE_PTS   = eyeSegs.flatMap(s => sampleBezier(s, 28));

    function circlePts(r, n) {
      return Array.from({ length: n + 1 }, (_, i) => {
        const a = (i / n) * Math.PI * 2;
        return [Math.cos(a) * r, Math.sin(a) * r];
      });
    }

    const IRIS_PTS  = circlePts(80 * S, 56);
    const PUPIL_PTS = circlePts(35 * S, 40);
    const RIM_PTS   = circlePts(1.0, 96);

    const THICKNESS = 0.22;
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

    // ── Ambient glow ──────────────────────────────────────────────────────────
    function drawGlow(abscos) {
      const glowR = R * (1.4 + 0.06 * abscos);
      const g = ctx.createRadialGradient(CX, CY, R * 0.4, CX, CY, glowR);
      g.addColorStop(0,   `rgba(${CR},${CG},${CB},${(0.065 * abscos).toFixed(4)})`);
      g.addColorStop(0.5, `rgba(${CR},${CG},${CB},0.014)`);
      g.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    }

    // ── Coin face ─────────────────────────────────────────────────────────────
    function drawFace(faceZ, spinA, tiltA, isFront, faceAlpha, isNear) {
      if (faceAlpha < 0.015) return;
      const mirrorX = isFront ? 1 : -1;
      const ea    = Math.min(1, faceAlpha * (isNear ? 1.3 : 0.85));
      const lwRim = isNear ? (9.0 + faceAlpha * 7.0) : (4.0 + faceAlpha * 4.0);
      const lwEye = isNear ? (6.0 + faceAlpha * 7.0) : (3.0 + faceAlpha * 3.0);

      if (isNear && faceAlpha > 0.60) {
        ctx.shadowColor = `rgba(${CR},${CG},${CB},0.60)`;
        ctx.shadowBlur  = 13 * faceAlpha;
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

      ctx.shadowBlur = 0;
    }

    // ── Filled quad walls ─────────────────────────────────────────────────────
    function buildPathQuads(pts, spinA, tiltA, closed) {
      const quads = [];
      const n     = pts.length;
      const count = closed ? n : n - 1;
      for (let i = 0; i < count; i++) {
        const [px0, py0] = pts[i];
        const [px1, py1] = pts[(i + 1) % n];
        const mx = (px0 + px1) / 2, my = (py0 + py1) / 2;
        const mlen = Math.sqrt(mx * mx + my * my);
        if (mlen < 0.001) continue;
        const nx = mx / mlen, ny = my / mlen;
        const normalCamZ = -nx * Math.sin(spinA);
        const c1 = xfm(px0, py0, ZF, spinA, tiltA);
        const c2 = xfm(px1, py1, ZF, spinA, tiltA);
        const c3 = xfm(px1, py1, ZB, spinA, tiltA);
        const c4 = xfm(px0, py0, ZB, spinA, tiltA);
        if (!c1 || !c2 || !c3 || !c4) continue;
        const avgZ    = (c1[2] + c2[2] + c3[2] + c4[2]) / 4;
        const diffuse = Math.max(0, ny * 0.85 + normalCamZ * 0.32);
        const shade   = (0.10 + diffuse * 0.50) * Math.abs(normalCamZ);
        quads.push({ c1, c2, c3, c4, normalCamZ, shade, avgZ });
      }
      return quads;
    }

    function drawEdge(spinA, tiltA) {
      const N = 96, quads = [];

      for (let i = 0; i < N; i++) {
        const a1 = (i / N) * Math.PI * 2, a2 = ((i + 1) / N) * Math.PI * 2;
        const am = (a1 + a2) / 2;
        const nx = Math.cos(am), ny = Math.sin(am);
        const normalCamZ = -nx * Math.sin(spinA);
        const c1 = xfm(Math.cos(a1), Math.sin(a1), ZF, spinA, tiltA);
        const c2 = xfm(Math.cos(a2), Math.sin(a2), ZF, spinA, tiltA);
        const c3 = xfm(Math.cos(a2), Math.sin(a2), ZB, spinA, tiltA);
        const c4 = xfm(Math.cos(a1), Math.sin(a1), ZB, spinA, tiltA);
        if (!c1 || !c2 || !c3 || !c4) continue;
        const avgZ    = (c1[2] + c2[2] + c3[2] + c4[2]) / 4;
        const diffuse = Math.max(0, ny * 0.85 + normalCamZ * 0.32);
        const shade   = (0.10 + diffuse * 0.50) * Math.abs(normalCamZ);
        quads.push({ c1, c2, c3, c4, normalCamZ, shade, avgZ });
      }

      for (const q of buildPathQuads(EYE_PTS,   spinA, tiltA, true))  quads.push(q);
      for (const q of buildPathQuads(IRIS_PTS,  spinA, tiltA, false)) quads.push(q);
      for (const q of buildPathQuads(PUPIL_PTS, spinA, tiltA, false)) quads.push(q);

      quads.sort((a, b) => a.avgZ - b.avgZ);

      for (const { c1, c2, c3, c4, normalCamZ, shade } of quads) {
        ctx.beginPath();
        ctx.moveTo(c1[0], c1[1]); ctx.lineTo(c2[0], c2[1]);
        ctx.lineTo(c3[0], c3[1]); ctx.lineTo(c4[0], c4[1]);
        ctx.closePath();

        if (normalCamZ > 0) {
          const s  = Math.min(1, shade);
          // Scale primary colour by shade: 0.70/0.63/0.82 preserve the
          // original teal tint for cyan and equivalent warmth for amber.
          ctx.fillStyle = `rgb(${Math.round(s*CR*0.70)},${Math.round(s*CG*0.63)},${Math.round(s*CB*0.82)})`;
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(${Math.round(CR*0.07)},${Math.round(CG*0.07)},${Math.round(CB*0.07)},0.70)`;
          ctx.fill();
        }
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

      const stutter = glitchI > 0 ? Math.sin(time * 28) * 0.18 * glitchI * glitchI : 0;
      const spinA   = 0.74 * time + stutter;
      const tiltA   = 0.07 * Math.sin(time * 0.55);
      const cosSpin = Math.cos(spinA);
      const abscos  = Math.abs(cosSpin);

      ctx.clearRect(0, 0, W, H);
      drawGlow(abscos);

      const fF_near   = Math.max(0,  cosSpin);
      const fF_ghost  = Math.max(0, -cosSpin) * 0.30;
      const fF_alpha  = fF_near + fF_ghost;
      const fF_isNear = cosSpin >= 0;
      const fB_near   = Math.max(0, -cosSpin);
      const fB_ghost  = Math.max(0,  cosSpin) * 0.30;
      const fB_alpha  = fB_near + fB_ghost;
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
