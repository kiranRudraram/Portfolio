import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

const HexGridMaterial = shaderMaterial(
  { uTime: 0.0 },

  // Vertex Shader
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,

  // Fragment Shader
  `
  uniform float uTime;
  varying vec2 vUv;

  // Creates hexagonal tiling based on coordinates
  vec3 hex(vec2 p) {
    const float sqrt3 = 1.7320508;
    p *= mat2(2.0 / 3.0, -1.0 / 3.0 * sqrt3, 0.0, 2.0 / sqrt3);

    vec2 id = floor(p);
    vec2 f = fract(p) - 0.5;

    float d = length(f);
    float glow = smoothstep(0.4, 0.2, d);

    float wave = sin(uTime * 2.0 + id.x * 0.5 + id.y * 0.8) * 0.5 + 0.5;
    glow *= wave;

    return mix(vec3(0.04, 0.06, 0.10), vec3(0.0, 0.8, 1.0), glow);
  }

  void main() {
    vec2 uv = vUv * 20.0;
    vec3 col = hex(uv + vec2(sin(uTime * 0.2), cos(uTime * 0.2)) * 0.5);
    gl_FragColor = vec4(col, 1.0);
  }
  `
)

extend({ HexGridMaterial })
export { HexGridMaterial }
