// components/NetworkGlobe.js
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useTexture } from '@react-three/drei'
import { useRef, useMemo, useEffect } from 'react'
import * as THREE from 'three'

function Globe({ radius = 2, initialRotationY = 0 }) {
  const mesh = useRef()

  useEffect(() => {
    if (mesh.current) mesh.current.rotation.y = initialRotationY
  }, [initialRotationY])

  useFrame((_, delta) => {
    mesh.current.rotation.y += delta * 0.1
  })

  const earthMap = useTexture('/textures/earth.jpg')

  return (
    <>
      {/* Solid Earth */}
      <mesh ref={mesh}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshPhongMaterial
          map={earthMap}
          shininess={10}
          specular={new THREE.Color('gray')}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh>
        <sphereGeometry args={[radius + 0.005, 32, 32]} />
        <meshBasicMaterial
          color="#1e90ff"
          wireframe
          opacity={0.15}
          transparent
        />
      </mesh>
    </>
  )
}

function Nodes({ radius = 2 }) {
  const points = useMemo(() => {
    const verts = []
    for (let i = 0; i < 100; i++) {
      const u = Math.random()
      const v = Math.random()
      const θ = 2 * Math.PI * u
      const φ = Math.acos(2 * v - 1)
      verts.push(
        radius * Math.sin(φ) * Math.cos(θ),
        radius * Math.cos(φ),
        radius * Math.sin(φ) * Math.sin(θ)
      )
    }
    const geom = new THREE.BufferGeometry()
    geom.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(new Float32Array(verts), 3)
    )
    return geom
  }, [radius])

  return (
    <points geometry={points}>
      <pointsMaterial size={0.03} color="#39FF14" />
    </points>
  )
}

export default function NetworkGlobe({ initialRotationY = 0 }) {
  return (
    <Canvas
      className="absolute inset-0 z-0"
      dpr={1}
      camera={{ position: [0, 0, 5], fov: 45 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 3, 5]} intensity={1.2} />

      {/* Your globe + nodes */}
      <Globe initialRotationY={initialRotationY} />
      <Nodes />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </Canvas>
  )
}
