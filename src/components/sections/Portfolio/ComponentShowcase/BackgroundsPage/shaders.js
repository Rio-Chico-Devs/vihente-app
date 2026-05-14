/**
 * shaders.js — Shader Wallpapers
 * 5 interactive WebGL fragment shaders + WallpaperRenderer host.
 * Vanilla JS, zero deps. ES module; also assigns to window for non-module usage.
 *
 * Design rule: static base pattern + tightly localised cursor accent.
 * No screen-wide animation. Cursor influence falls off quickly.
 */

/* ─── GLSL preamble shared by all shaders ───────────────────────────────── */

const COMMON = /* glsl */`
precision mediump float;

uniform vec2  u_res;
uniform float u_time;
uniform vec2  u_mouse;
uniform vec4  u_click;
uniform vec3  u_accent;
uniform float u_density;
uniform float u_motion;
uniform float u_glow;
uniform float u_mono;

float h11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

vec2 h21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.xx + p3.yz) * p3.zy);
}

vec3 accent() {
  return mix(u_accent, vec3(1.0), u_mono);
}
`;

/* ─── 1. HAZE ─── amber #FFC061 ─────────────────────────────────────────── */
/* Stratified horizontal bands. Cursor lifts its own band locally.           */

const HAZE_FRAG = COMMON + /* glsl */`
void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  vec2 m = vec2(u_mouse.x * aspect, u_mouse.y);

  float n = u_density * 8.0 + 1.0;
  float bandY = uv.y * n;
  float bi    = floor(bandY);
  float bf    = fract(bandY);

  float r0 = h11(bi * 37.43);
  float bandBright = 0.02 + r0 * 0.13;

  float edge = smoothstep(0.0, 0.1, bf) * smoothstep(1.0, 0.9, bf);

  float cm     = floor(u_mouse.y * n);
  float yProx  = exp(-abs(bi - cm) * 1.5);
  float hd     = abs(uv.x - u_mouse.x);
  float xProx  = exp(-hd * hd * 9.0);
  float halo   = yProx * xProx * u_glow;

  vec3 base = vec3(0.025, 0.030, 0.040);
  vec3 acc  = accent();

  vec3 col = base;
  col += vec3(bandBright * 0.70, bandBright * 0.75, bandBright) * edge;
  col += acc * halo * 0.65;

  vec2 ck = vec2(u_click.x * aspect, u_click.y);
  col += acc * exp(-distance(p, ck) * 5.0) * exp(-u_click.z * 3.0) * u_glow * 0.7;

  gl_FragColor = vec4(col, 1.0);
}
`;

/* ─── 2. MESH ─── cyan #8DEAFF ──────────────────────────────────────────── */
/* Static dot grid. Cursor brightens nearby dots.                             */

const MESH_FRAG = COMMON + /* glsl */`
void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  vec2 m = vec2(u_mouse.x * aspect, u_mouse.y);

  float spacing = 0.1 / u_density;
  vec2 gp = p / spacing;
  vec2 gi = floor(gp);
  vec2 gf = fract(gp) - 0.5;

  float rv      = h11(h21(gi).x);
  float dotR    = spacing * (0.10 + rv * 0.08);
  float dotDist = length(gf) * spacing;
  float dotMask = 1.0 - smoothstep(dotR, dotR + spacing * 0.04, dotDist);

  vec2  dotWorld   = (gi + 0.5) * spacing;
  float cursorDist = distance(dotWorld, m);
  float cursorPow  = exp(-cursorDist * cursorDist * 18.0) * u_glow;

  vec3 base = vec3(0.025, 0.035, 0.050);
  vec3 acc  = accent();

  vec3 dotColor = mix(vec3(0.07, 0.10, 0.14), acc, cursorPow * 2.5) * (0.3 + cursorPow * 1.2);
  vec3 col = base + dotColor * dotMask;

  vec2  ck      = vec2(u_click.x * aspect, u_click.y);
  float ckd     = distance(p, ck);
  float ripple  = sin(ckd * 22.0 - u_click.z * 10.0);
  float ripEnv  = exp(-ckd * 4.0) * exp(-u_click.z * 1.8);
  col += acc * max(0.0, ripple) * ripEnv * u_glow * 0.35;

  gl_FragColor = vec4(col, 1.0);
}
`;

/* ─── 3. STRATA ─── lime #B3FF73 ────────────────────────────────────────── */
/* Topographic contours from static fbm noise. Cursor lifts a small mound.  */

const STRATA_FRAG = COMMON + /* glsl */`

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = h11(h21(i              ).x);
  float b = h11(h21(i + vec2(1,0)  ).x);
  float c = h11(h21(i + vec2(0,1)  ).x);
  float d = h11(h21(i + vec2(1,1)  ).x);
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p0) {
  vec2  q = p0;
  float v = 0.5000 * vnoise(q); q *= 2.1;
  v += 0.2500 * vnoise(q); q *= 2.1;
  v += 0.1250 * vnoise(q); q *= 2.1;
  v += 0.0625 * vnoise(q); q *= 2.1;
  v += 0.0312 * vnoise(q);
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  vec2 m = vec2(u_mouse.x * aspect, u_mouse.y);

  float h = fbm(p * u_density * 2.2 + vec2(5.3, 1.7));

  float cm    = distance(p, m);
  float mound = exp(-cm * cm * 10.0) * 0.35 * u_glow;
  h += mound;

  float cf    = 9.0;
  float bands = fract(h * cf);
  float line  = 1.0 - smoothstep(0.0, 0.06, min(bands, 1.0 - bands));

  vec3 base = vec3(0.020, 0.028, 0.020);
  vec3 acc  = accent();

  float bright = 0.25 + h * 0.40 + mound * 2.5;
  vec3 col = base + acc * line * bright;
  col += acc * 0.015 * h;

  vec2 ck = vec2(u_click.x * aspect, u_click.y);
  col += acc * exp(-distance(p, ck) * 6.0) * exp(-u_click.z * 3.0) * u_glow * 0.6;

  gl_FragColor = vec4(col, 1.0);
}
`;

/* ─── 4. PRISM ─── magenta #FF4080 ──────────────────────────────────────── */
/* Triangle-tiled crystal. Cursor is the directional light source.           */

const PRISM_FRAG = COMMON + /* glsl */`
void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  vec2 m = vec2(u_mouse.x * aspect, u_mouse.y);

  float sc  = u_density * 6.0;
  vec2  q   = p * sc;
  vec2  qi  = floor(q);
  vec2  qf  = fract(q);

  bool upper = (qf.x + qf.y) < 1.0;
  float tidy = upper ? 0.0 : 1.0;

  float r1 = h11(h21(qi).x + tidy * 3.71);
  float r2 = h11(r1 * 23.1 + 4.7);

  vec2 triCenterLocal = upper ? vec2(0.33) : vec2(0.67);
  vec2 triWorld = (qi + triCenterLocal) / sc;

  vec2  toLight   = m - triWorld;
  float lightDist = length(toLight);
  toLight = lightDist > 0.001 ? toLight / lightDist : vec2(0.0, 1.0);

  float angle   = r1 * 6.28318;
  vec2  normal  = vec2(cos(angle), sin(angle));
  float diffuse = dot(toLight, normal) * 0.5 + 0.5;

  float cursorDist = distance(p, m);
  float localLight = exp(-cursorDist * cursorDist * 5.0) * u_glow;

  float diagDist = abs(qf.x + qf.y - 1.0);
  float hEdge    = min(qf.x, 1.0 - qf.x);
  float vEdge    = min(qf.y, 1.0 - qf.y);
  float edgeDist = min(min(diagDist * 0.7, hEdge), vEdge);
  float edgeMask = smoothstep(0.0, 0.04, edgeDist);

  vec3 base = vec3(0.03 + r2 * 0.04, 0.030, 0.04 + r1 * 0.03);
  vec3 acc  = accent();

  vec3 col  = base * edgeMask;
  col += acc * diffuse * localLight * 1.8 * edgeMask;
  col += acc * 0.015 * r1;

  float drift = u_motion * sin(u_time * 0.4 + r1 * 6.28318) * 0.06;
  col += acc * max(0.0, drift);

  vec2 ck = vec2(u_click.x * aspect, u_click.y);
  col += acc * exp(-distance(p, ck) * 4.0) * exp(-u_click.z * 2.5) * u_glow * 0.5;

  gl_FragColor = vec4(col, 1.0);
}
`;

/* ─── 5. FIELD ─── blue #4DA0FF ─────────────────────────────────────────── */
/* Magnetic grid; lines bend gently toward cursor. Click = local pulse.      */

const FIELD_FRAG = COMMON + /* glsl */`
void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  vec2 m = vec2(u_mouse.x * aspect, u_mouse.y);

  vec2  toMouse = m - p;
  float md      = length(toMouse);
  float force   = 0.018 * u_glow / (md * md + 0.04);
  vec2  bent    = p + toMouse * force;

  float spacing = 1.0 / (u_density * 9.0);
  vec2  gf      = fract(bent / spacing);

  float hLine = abs(gf.y - 0.5);
  float vLine = abs(gf.x - 0.5);
  float lw    = 0.04;
  float grid  = 1.0 - smoothstep(0.0, lw, min(hLine, vLine));
  float cross_= (1.0 - smoothstep(0.0, lw * 1.5, hLine)) *
                (1.0 - smoothstep(0.0, lw * 1.5, vLine));

  vec3  base       = vec3(0.025, 0.035, 0.060);
  vec3  acc        = accent();
  float cursorGlow = exp(-md * md * 5.0) * u_glow;

  vec3 lineColor = mix(vec3(0.06, 0.08, 0.15), acc * 0.7, cursorGlow * 2.0);
  vec3 col = base;
  col += lineColor * grid * (0.4 + cursorGlow * 0.8);
  col += acc * cross_ * cursorGlow * 0.5;

  vec2  ck      = vec2(u_click.x * aspect, u_click.y);
  float ckd     = distance(p, ck);
  float wave    = sin(ckd * 24.0 - u_click.z * 10.0);
  float waveEnv = exp(-ckd * 3.5) * exp(-u_click.z * 1.5);
  col += acc * max(0.0, wave * waveEnv) * u_glow * 0.4;

  gl_FragColor = vec4(col, 1.0);
}
`;

/* ─── WALLPAPERS catalogue ───────────────────────────────────────────────── */

export const WALLPAPERS = [
  { id: 'haze',   name: 'HAZE',   accent: '#FFC061', frag: HAZE_FRAG   },
  { id: 'mesh',   name: 'MESH',   accent: '#8DEAFF', frag: MESH_FRAG   },
  { id: 'strata', name: 'STRATA', accent: '#B3FF73', frag: STRATA_FRAG },
  { id: 'prism',  name: 'PRISM',  accent: '#FF4080', frag: PRISM_FRAG  },
  { id: 'field',  name: 'FIELD',  accent: '#4DA0FF', frag: FIELD_FRAG  },
];

/* ─── WallpaperRenderer ──────────────────────────────────────────────────── */

export class WallpaperRenderer {
  constructor(canvas, frag, accent) {
    this._canvas      = canvas;
    this._frag        = frag;
    this._accentHex   = accent;
    this._tweaks      = { density: 1.0, motion: 0.0, glow: 0.55, ease: 8.0, mono: false };
    this._rawMouse    = [0.5, 0.5];
    this._smoothMouse = [0.5, 0.5];
    this._lastClick   = [0.5, 0.5];
    this._clickT      = -1;
    this._t0          = performance.now();
    this._lastTs      = null;
    this._rafId       = null;
    this._running     = false;
    this._gl          = null;
    this._prog        = null;
    this._uniforms    = {};
    this._lastW       = 0;
    this._lastH       = 0;

    this._init();
    this._bindEvents();
  }

  _init() {
    const canvas = this._canvas;
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) { console.warn('[ShaderWallpaper] WebGL not available'); return; }
    this._gl = gl;

    gl.getExtension('OES_standard_derivatives');

    const VERT = `attribute vec2 a_pos; void main(){ gl_Position=vec4(a_pos,0.0,1.0); }`;
    const prog = this._compile(VERT, this._frag);
    if (!prog) return;
    this._prog = prog;

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    gl.useProgram(prog);
    ['u_res','u_time','u_mouse','u_click','u_accent','u_density','u_motion','u_glow','u_mono']
      .forEach(n => { this._uniforms[n] = gl.getUniformLocation(prog, n); });

    this._applyAccent();
  }

  _compile(vert, frag) {
    const gl = this._gl;
    const mk = (type, src) => {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error('[ShaderWallpaper] Shader compile error:', gl.getShaderInfoLog(sh));
        return null;
      }
      return sh;
    };
    const vs = mk(gl.VERTEX_SHADER,   vert);
    const fs = mk(gl.FRAGMENT_SHADER, frag);
    if (!vs || !fs) return null;
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('[ShaderWallpaper] Program link error:', gl.getProgramInfoLog(prog));
      return null;
    }
    return prog;
  }

  _applyAccent() {
    const gl = this._gl;
    if (!gl || !this._uniforms.u_accent) return;
    const h = this._accentHex.replace('#', '');
    const expand = h.length === 3
      ? [h[0]+h[0], h[1]+h[1], h[2]+h[2]]
      : [h.slice(0,2), h.slice(2,4), h.slice(4,6)];
    gl.uniform3f(this._uniforms.u_accent,
      parseInt(expand[0], 16) / 255,
      parseInt(expand[1], 16) / 255,
      parseInt(expand[2], 16) / 255);
  }

  _bindEvents() {
    const c = this._canvas;
    this._onMove = (e) => {
      const r = c.getBoundingClientRect();
      this._rawMouse[0] = (e.clientX - r.left)  / r.width;
      this._rawMouse[1] = 1.0 - (e.clientY - r.top) / r.height;
    };
    this._onDown = (e) => {
      const r = c.getBoundingClientRect();
      this._lastClick[0] = (e.clientX - r.left)  / r.width;
      this._lastClick[1] = 1.0 - (e.clientY - r.top) / r.height;
      this._clickT = performance.now();
    };
    c.addEventListener('pointermove', this._onMove);
    c.addEventListener('pointerdown', this._onDown);
  }

  _frame(ts) {
    if (!this._running) return;
    this._rafId = requestAnimationFrame(t => this._frame(t));

    const gl = this._gl;
    if (!gl || !this._prog) return;

    /* Resize */
    const rect = this._canvas.getBoundingClientRect();
    const dpr  = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = Math.round(rect.width  * dpr);
    const h = Math.round(rect.height * dpr);
    if (w !== this._lastW || h !== this._lastH) {
      this._canvas.width  = w;
      this._canvas.height = h;
      gl.viewport(0, 0, w, h);
      this._lastW = w; this._lastH = h;
    }

    /* Timing */
    if (this._lastTs === null) this._lastTs = ts;
    const dt = Math.min((ts - this._lastTs) / 1000, 0.1);
    this._lastTs = ts;
    const elapsed = (ts - this._t0) / 1000;

    /* Smooth mouse */
    const α = 1.0 - Math.exp(-this._tweaks.ease * dt);
    this._smoothMouse[0] += (this._rawMouse[0] - this._smoothMouse[0]) * α;
    this._smoothMouse[1] += (this._rawMouse[1] - this._smoothMouse[1]) * α;

    /* Upload uniforms */
    gl.useProgram(this._prog);
    const U = this._uniforms;
    gl.uniform2f(U.u_res,    w, h);
    gl.uniform1f(U.u_time,   elapsed);
    gl.uniform2f(U.u_mouse,  this._smoothMouse[0], this._smoothMouse[1]);

    const secSinceClick = this._clickT >= 0 ? (ts - this._clickT) / 1000 : 999.0;
    gl.uniform4f(U.u_click, this._lastClick[0], this._lastClick[1], secSinceClick, 0.0);

    gl.uniform1f(U.u_density, this._tweaks.density);
    gl.uniform1f(U.u_motion,  this._tweaks.motion);
    gl.uniform1f(U.u_glow,    this._tweaks.glow);
    gl.uniform1f(U.u_mono,    this._tweaks.mono ? 1.0 : 0.0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  /** Update tweaks without re-creating the renderer. */
  setTweaks(t) {
    Object.assign(this._tweaks, t);
  }

  /** Override the accent colour at any time. */
  setAccent(hex) {
    this._accentHex = hex;
    if (this._gl) { this._gl.useProgram(this._prog); this._applyAccent(); }
  }

  /** Begin RAF loop. Safe to call multiple times. */
  start_() {
    if (this._running || !this._gl) return;
    this._running = true;
    this._lastTs  = null;
    this._rafId   = requestAnimationFrame(ts => this._frame(ts));
  }

  /** Pause without releasing GL context. */
  stop_() {
    this._running = false;
    if (this._rafId) { cancelAnimationFrame(this._rafId); this._rafId = null; }
  }

  /** Release all resources. */
  destroy() {
    this.stop_();
    if (this._canvas) {
      this._canvas.removeEventListener('pointermove', this._onMove);
      this._canvas.removeEventListener('pointerdown', this._onDown);
    }
    this._gl = null; this._prog = null; this._canvas = null;
  }
}

/* Expose on window for non-module consumption */
if (typeof window !== 'undefined') {
  window.WALLPAPERS = WALLPAPERS;
  window.WallpaperRenderer = WallpaperRenderer;
}
