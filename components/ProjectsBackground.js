// components/ProjectsBackground.js
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function FloatingParticles({ count = 400, spreadY = 12, spreadZ = 10 }) {
  const ref = useRef()
  const { viewport } = useThree()

  // compute positions & speeds once per resize (viewport.width change)
  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      // horizontal spread = full viewport width
      pos[i * 3 + 0] = (Math.random() - 0.5) * viewport.width
      pos[i * 3 + 1] = (Math.random() - 0.5) * spreadY
      pos[i * 3 + 2] = (Math.random() - 0.5) * spreadZ
      spd[i] = 0.02 + Math.random() * 0.15
    }
    return { positions: pos, speeds: spd }
  }, [count, viewport.width, spreadY, spreadZ])

  // animate rising
  useFrame((_, dt) => {
    const array = ref.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      let y = array[i * 3 + 1] + speeds[i] * dt
      if (y > spreadY / 2) y = -spreadY / 2
      array[i * 3 + 1] = y
    }
    ref.current.geometry.attributes.position.needsUpdate = true
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
        size={0.12}
        color="#39FF14"
        opacity={0.4}
        transparent
      />
    </points>
  )
}

export default function ProjectsBackground() {
  return (
    <Canvas
      className="absolute inset-0 z-0 pointer-events-none"
      camera={{ position: [0, 0, 15], fov: 60 }}
    >
      <ambientLight intensity={0.8} />
      <FloatingParticles />
    </Canvas>
  )
}
