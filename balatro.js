/* Balatro shader background — vanilla JS port (no React), ogl loaded via CDN ESM.
   Colors match RANDTOPIC brand: coral / violeta / tinta. */
import { Renderer, Program, Mesh, Triangle } from "https://cdn.jsdelivr.net/npm/ogl@1.0.11/src/index.js";

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;
#define PI 3.14159265359

uniform float iTime;
uniform vec3 iResolution;
uniform float uSpinRotation;
uniform float uSpinSpeed;
uniform vec2 uOffset;
uniform vec4 uColor1;
uniform vec4 uColor2;
uniform vec4 uColor3;
uniform float uContrast;
uniform float uLighting;
uniform float uSpinAmount;
uniform float uPixelFilter;
uniform float uSpinEase;
uniform bool uIsRotate;
uniform vec2 uMouse;

varying vec2 vUv;

vec4 effect(vec2 screenSize, vec2 screen_coords) {
    float pixel_size = length(screenSize.xy) / uPixelFilter;
    vec2 uv = (floor(screen_coords.xy * (1.0 / pixel_size)) * pixel_size - 0.5 * screenSize.xy) / length(screenSize.xy) - uOffset;
    float uv_len = length(uv);

    float speed = (uSpinRotation * uSpinEase * 0.2);
    if (uIsRotate) speed = iTime * speed;
    speed += 302.2;

    float mouseInfluence = (uMouse.x * 2.0 - 1.0);
    speed += mouseInfluence * 0.1;

    float new_pixel_angle = atan(uv.y, uv.x) + speed - uSpinEase * 20.0 * (uSpinAmount * uv_len + (1.0 - uSpinAmount));
    vec2 mid = (screenSize.xy / length(screenSize.xy)) / 2.0;
    uv = (vec2(uv_len * cos(new_pixel_angle) + mid.x, uv_len * sin(new_pixel_angle) + mid.y) - mid);

    uv *= 30.0;
    float baseSpeed = iTime * uSpinSpeed;
    speed = baseSpeed + mouseInfluence * 2.0;

    vec2 uv2 = vec2(uv.x + uv.y);
    for (int i = 0; i < 5; i++) {
        uv2 += sin(max(uv.x, uv.y)) + uv;
        uv += 0.5 * vec2(
            cos(5.1123314 + 0.353 * uv2.y + speed * 0.131121),
            sin(uv2.x - 0.113 * speed)
        );
        uv -= cos(uv.x + uv.y) - sin(uv.x * 0.711 - uv.y);
    }

    float contrast_mod = (0.25 * uContrast + 0.5 * uSpinAmount + 1.2);
    float paint_res = min(2.0, max(0.0, length(uv) * 0.035 * contrast_mod));
    float c1p = max(0.0, 1.0 - contrast_mod * abs(1.0 - paint_res));
    float c2p = max(0.0, 1.0 - contrast_mod * abs(paint_res));
    float c3p = 1.0 - min(1.0, c1p + c2p);
    float light = (uLighting - 0.2) * max(c1p * 5.0 - 4.0, 0.0) + uLighting * max(c2p * 5.0 - 4.0, 0.0);

    return (0.3 / uContrast) * uColor1 + (1.0 - 0.3 / uContrast) * (uColor1 * c1p + uColor2 * c2p + vec4(c3p * uColor3.rgb, c3p * uColor1.a)) + light;
}

void main() {
    vec2 uv = vUv * iResolution.xy;
    gl_FragColor = effect(iResolution.xy, uv);
}
`;

function hexToVec4(hex) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  return [r, g, b, 1];
}

let instance = null;

/* Arranca el shader sobre `container`. options en colores de marca RANDTOPIC. */
export function startBalatro(container, options = {}) {
  if (instance) return instance;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;

  const {
    color1 = "#ff6f5e", // coral
    color2 = "#7c5cff", // violeta
    color3 = "#2b2140", // tinta
    spinRotation = -2.0,
    spinSpeed = 3.2,
    contrast = 3.0,
    lighting = 0.35,
    spinAmount = 0.25,
    pixelFilter = 900.0,
    isRotate = false,
    mouseInteraction = true,
  } = options;

  const renderer = new Renderer({ alpha: true });
  const gl = renderer.gl;
  gl.clearColor(0, 0, 0, 0);

  function resize() {
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    if (program) {
      program.uniforms.iResolution.value = [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height];
    }
  }
  window.addEventListener("resize", resize);

  const geometry = new Triangle(gl);
  const program = new Program(gl, {
    vertex: vertexShader,
    fragment: fragmentShader,
    uniforms: {
      iTime: { value: 0 },
      iResolution: { value: [1, 1, 1] },
      uSpinRotation: { value: spinRotation },
      uSpinSpeed: { value: spinSpeed },
      uOffset: { value: [0, 0] },
      uColor1: { value: hexToVec4(color1) },
      uColor2: { value: hexToVec4(color2) },
      uColor3: { value: hexToVec4(color3) },
      uContrast: { value: contrast },
      uLighting: { value: lighting },
      uSpinAmount: { value: spinAmount },
      uPixelFilter: { value: pixelFilter },
      uSpinEase: { value: 1.0 },
      uIsRotate: { value: isRotate },
      uMouse: { value: [0.5, 0.5] },
    },
  });
  resize();

  const mesh = new Mesh(gl, { geometry, program });
  let rafId;
  function update(time) {
    rafId = requestAnimationFrame(update);
    program.uniforms.iTime.value = time * 0.001;
    renderer.render({ scene: mesh });
  }
  rafId = requestAnimationFrame(update);
  container.appendChild(gl.canvas);

  function handleMouseMove(e) {
    if (!mouseInteraction) return;
    const rect = container.getBoundingClientRect();
    program.uniforms.uMouse.value = [(e.clientX - rect.left) / rect.width, 1 - (e.clientY - rect.top) / rect.height];
  }
  container.addEventListener("mousemove", handleMouseMove);

  instance = {
    destroy() {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", handleMouseMove);
      if (gl.canvas.parentNode) gl.canvas.parentNode.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      instance = null;
    },
  };
  return instance;
}

export function stopBalatro() {
  instance?.destroy();
}
