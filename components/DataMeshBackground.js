import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useMemo, useEffect, useState } from 'react'
import * as THREE from 'three'

function ConnectedMesh({ count = 300, maxDist = 2.4 }) {
  const pointRef = useRef()
  const lineRef = useRef()
  const { viewport } = useThree()

  const [scrollY, setScrollY] = useState(0)
  const fadeRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const particles = useMemo(() => {
    const arr = []
    for (let i = 0; i < count; i++) {
      arr.push(new THREE.Vector3(
        (Math.random() - 0.5) * viewport.width * 1.4, // wider X spread
        (Math.random() - 0.5) * 20,                   // taller Y spread
        (Math.random() - 0.5) * 20                    // deeper Z spread

      ))
    }
    return arr
  }, [count, viewport.width])

  const posArray = new Float32Array(count * 3)
  particles.forEach((p, i) => {
    posArray[i * 3 + 0] = p.x
    posArray[i * 3 + 1] = p.y
    posArray[i * 3 + 2] = p.z
  })

  const linePositions = new Float32Array(count * count * 3 * 2)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    // Fade-in logic
    if (fadeRef.current < 1) {
      fadeRef.current = Math.min(1, fadeRef.current + 0.01)
    }

    const pulse = 0.3 + Math.sin(t * 1.2) * 0.15
    const fade = fadeRef.current
    const combinedOpacity = fade * pulse

    particles.forEach((p, i) => {
      p.z = Math.sin(t + i) * 0.5
      posArray[i * 3 + 2] = p.z
    })

    if (pointRef.current?.geometry?.attributes?.position) {
      pointRef.current.geometry.attributes.position.array = posArray
      pointRef.current.geometry.attributes.position.needsUpdate = true
    }

    let idx = 0
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const a = particles[i]
        const b = particles[j]
        if (a.distanceTo(b) < maxDist) {
          linePositions[idx++] = a.x
          linePositions[idx++] = a.y
          linePositions[idx++] = a.z
          linePositions[idx++] = b.x
          linePositions[idx++] = b.y
          linePositions[idx++] = b.z
        }
      }
    }

    if (lineRef.current?.geometry?.attributes?.position) {
      lineRef.current.geometry.setDrawRange(0, idx / 3)
      lineRef.current.geometry.attributes.position.array = linePositions
      lineRef.current.geometry.attributes.position.needsUpdate = true
    }

    const rotX = scrollY * 0.0002
    if (pointRef.current) pointRef.current.rotation.set(rotX, 0, 0)
    if (lineRef.current) lineRef.current.rotation.set(rotX, 0, 0)

    // Final fade + pulse combo
    if (pointRef.current?.material) pointRef.current.material.opacity = combinedOpacity + 0.4
    if (lineRef.current?.material) lineRef.current.material.opacity = combinedOpacity + 0.2
  })

  return (
    <>
      <points ref={pointRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={posArray}
            count={count}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color="#66ffff"
          transparent
          opacity={0}
        />
      </points>

      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={linePositions}
            count={linePositions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#66ffff"
          transparent
          opacity={0}
        />
      </lineSegments>
    </>
  )
}

export default function DataMeshBackground() {
  return (
    <Canvas
      className="!absolute !inset-0 !z-0 !pointer-events-none"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
      camera={{ position: [0, 0, 14], fov: 60 }}
    >
      <ambientLight intensity={0.6} />
      <ConnectedMesh />
    </Canvas>
  )
}
