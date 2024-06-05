import { Environment, OrbitControls, RandomizedLight } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'

const CameraController = () => {
    const { camera } = useThree()
    const horizontalAngleRef = useRef(0)
    const verticalAngleRef = useRef(0)
    const [lastTouch, setLastTouch] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleScroll = (event) => {
            horizontalAngleRef.current += event.deltaX * 0.001
            verticalAngleRef.current += event.deltaY * 0.001
        }

        const handleTouchStart = (event) => {
            const touch = event.touches[0]
            setLastTouch({ x: touch.clientX, y: touch.clientY })
        }

        const handleTouchMove = (event) => {
            const touch = event.touches[0]
            const deltaX = touch.clientX - lastTouch.x
            const deltaY = touch.clientY - lastTouch.y
            horizontalAngleRef.current += deltaX * 0.01
            verticalAngleRef.current += deltaY * 0.01
            setLastTouch({ x: touch.clientX, y: touch.clientY })
        }

        window.addEventListener('wheel', handleScroll, { passive: true })
        window.addEventListener('touchstart', handleTouchStart, { passive: true })
        window.addEventListener('touchmove', handleTouchMove, { passive: true })

        return () => {
            window.removeEventListener('wheel', handleScroll)
            window.removeEventListener('touchstart', handleTouchStart)
            window.removeEventListener('touchmove', handleTouchMove)
        }
    }, [lastTouch])

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
