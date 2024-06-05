import { Environment, OrbitControls, RandomizedLight } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'

const CameraController = () => {
    const { camera } = useThree()
    const horizontalAngleRef = useRef(0)
    const verticalAngleRef = useRef(0)

    useEffect(() => {
        const handleScroll = (event) => {
            horizontalAngleRef.current += event.deltaX * 0.001
            verticalAngleRef.current += event.deltaY * 0.001
        }

        window.addEventListener('wheel', handleScroll, { passive: true })
        return () => window.removeEventListener('wheel', handleScroll)
    }, [])

    useFrame(() => {
        const radius = 5
        const horizontalAngle = horizontalAngleRef.current
        const verticalAngle = verticalAngleRef.current

        camera.position.x = radius * Math.sin(horizontalAngle) * Math.cos(verticalAngle)
        camera.position.y = radius * Math.sin(verticalAngle)
        camera.position.z = radius * Math.cos(horizontalAngle) * Math.cos(verticalAngle)
        camera.lookAt(0, 0.5, 0)
        camera.updateProjectionMatrix()
    })

    return null
}

const Scanvas = () => {
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Canvas style={{ width: '100%', height: '100%' }}
                camera={{ position: [2, 2, 2], fov: 75 }}
                shadows>
                <color attach="background" args={['#64748b']} />
                <RandomizedLight position={[2, 5, 5]} />
                <Environment preset="sunset" background={false} />
                <OrbitControls enableZoom={false} enablePan={false} />

                <mesh position={[0, 0.5, 0]} castShadow>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial metalness={1} roughness={0} color="orange" />
                </mesh>

                <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                    <planeGeometry args={[10, 10]} />
                    <shadowMaterial opacity={0.5} />
                </mesh>

                <CameraController />
            </Canvas>
        </div>
    )
}

export default Scanvas
