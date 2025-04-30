import { useRef, useMemo } from 'react'
import { useFrame }        from '@react-three/fiber'
import * as THREE          from 'three'

export default function BackgroundParticles({
  count  = 80,     // light count
  radius = 2.1,    // just around globe
}) {
  const ref = useRef()

  // Precompute positions
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const u = Math.random()
      const v = Math.random()
      const θ = 2 * Math.PI * u
      const φ = Math.acos(2 * v - 1)
      const r = radius + Math.random() * 0.05

      arr[3 * i + 0] = r * Math.sin(φ) * Math.cos(θ)
      arr[3 * i + 1] = r * Math.sin(φ) * Math.sin(θ)
      arr[3 * i + 2] = r * Math.cos(φ)
    }
    return arr
  }, [count, radius])

  // slow rotation
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.005
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#39FF14"
        transparent
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
