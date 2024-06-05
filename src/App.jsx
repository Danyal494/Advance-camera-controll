import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CameraControls } from '@react-three/drei'
import Scanvas from './Cameracontroll'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <Scanvas/>
   </>
  )
}

export default App
