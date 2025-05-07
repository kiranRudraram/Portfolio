// components/NetworkGlobe.js
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useTexture, Stars } from '@react-three/drei'
import { useRef, useMemo, useEffect } from 'react'
import * as THREE from 'three'
import { useMediaQuery } from 'react-responsive'

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
      {/* 🌍 Earth */}
      <mesh ref={mesh}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshPhongMaterial
          map={earthMap}
          shininess={6}
          specular={new THREE.Color('gray')}
        />
      </mesh>

      {/* 🟢 Soft Glow Halo */}
      <mesh>
        <sphereGeometry args={[radius + 0.1, 64, 64]} />
        <meshBasicMaterial
          color="#39FF14"
          transparent
          opacity={0.04}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
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
      <pointsMaterial size={0.035} color="#39FF14" />
    </points>
  )
}

export default function NetworkGlobe({ initialRotationY = 0 }) {
  const isMobile = useMediaQuery({ maxWidth: 768 })

  return (
    <Canvas
      className="absolute inset-0 z-0"
      dpr={1}
      camera={{
        position: isMobile ? [0, 0, 3.3] : [0, 0, 5],
        fov: isMobile ? 36 : 45
      }}
      frameloop="always"
    >
      {/* ✨ Space Stars */}
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 3, 5]} intensity={1.1} />

      <Globe initialRotationY={initialRotationY} />
      <Nodes />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.25}
      />
    </Canvas>
  )
}
