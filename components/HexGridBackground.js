import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import './HexGridMaterial'

function HexMesh() {
  const mat = useRef()
  const { size, viewport } = useThree()
  const aspect = size.width / size.height

  useFrame((_, dt) => {
    if (mat.current) mat.current.uTime += dt * 0.4
  })

  return (
    <mesh scale={[aspect * viewport.height, viewport.height, 1]}>
      <planeGeometry />
      <hexGridMaterial ref={mat} />
    </mesh>
  )
}

export default function HexGridBackground() {
  return (
    <Canvas
      orthographic
      camera={{ zoom: 50, position: [0, 0, 100] }}
      className="absolute inset-0 z-0 pointer-events-none"
    >
      <ambientLight intensity={0.8} />
      <HexMesh />
    </Canvas>
  )
}
