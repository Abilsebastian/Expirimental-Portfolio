"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"
import { Mesh } from "three"

function Cube({ spinning }: { spinning: boolean }) {
  const meshRef = useRef<Mesh>(null)

  useFrame(() => {
    if (spinning && meshRef.current) {
      meshRef.current.rotation.y += 0.03
      meshRef.current.rotation.x += 0.01
    }
  })

  return (
    <mesh ref={meshRef} rotation={[0.4, 0.2, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#00ff99" />
    </mesh>
  )
}

export default function SpinningCube() {
  const [spinning, setSpinning] = useState(false)

  return (
    <div
      style={{ width: "400px", height: "400px" }}
      onMouseEnter={() => setSpinning(true)}
      onMouseLeave={() => setSpinning(false)}
    >
      <Canvas camera={{ position: [2, 2, 2] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} />
        <Cube spinning={spinning} />
      </Canvas>
    </div>
  )
}