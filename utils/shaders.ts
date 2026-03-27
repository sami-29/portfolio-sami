// Minimal vertex shader — full-screen quad
export const vertexShader = `#version 300 es
in vec2 a_position;
out vec2 v_uv;

void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

// Fragment shader — layered simplex noise in warm amber tones
// Responds gently to mouse position uniform
export const fragmentShader = `#version 300 es
precision mediump float;

in vec2 v_uv;
out vec4 fragColor;

uniform float u_time;
uniform vec2 u_mouse; // normalized 0..1
uniform vec2 u_resolution;

// Simplex-like noise (hash-based, compact)
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(
    0.211324865405187,
    0.366025403784439,
   -0.577350269189626,
    0.024390243902439
  );
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = v_uv;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 p = vec2(uv.x * aspect, uv.y);

  // Gentle mouse influence (very subtle distortion)
  vec2 mouseOffset = (u_mouse - 0.5) * 0.15;
  p += mouseOffset * smoothstep(0.8, 0.0, length(uv - 0.5));

  // Time (slow movement)
  float t = u_time * 0.08;

  // Layered noise
  float n1 = snoise(p * 1.5 + t * 0.3) * 0.5 + 0.5;
  float n2 = snoise(p * 3.0 - t * 0.2 + 10.0) * 0.5 + 0.5;
  float n3 = snoise(p * 6.0 + t * 0.15 + 20.0) * 0.5 + 0.5;

  float noise = n1 * 0.6 + n2 * 0.3 + n3 * 0.1;

  // Color: dark base with warm amber highlights
  vec3 darkBase = vec3(0.039, 0.039, 0.043);  // gray.950
  vec3 amberGlow = vec3(1.0, 0.702, 0.0);     // brand.400 #FFB300
  vec3 amberDark = vec3(0.4, 0.22, 0.0);      // darker amber

  // Mix: mostly dark with subtle amber in bright noise areas
  float amberMix = smoothstep(0.45, 0.85, noise) * 0.12;
  vec3 color = mix(darkBase, amberDark, amberMix);
  color += amberGlow * smoothstep(0.7, 1.0, noise) * 0.04;

  // Vignette: fade edges to pure dark
  float vignette = 1.0 - smoothstep(0.3, 0.9, length(uv - vec2(0.5, 0.4)));
  color = mix(darkBase, color, vignette);

  fragColor = vec4(color, 1.0);
}
`;
