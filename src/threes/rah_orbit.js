import { useThree } from '@react-three/fiber';
import { createContext, useEffect } from 'react';
import { PerspectiveCamera , WebGLRenderer} from "three";
import { OrbitControls } from '@react-three/drei'
export const OrbitControlsContext = createContext();

export function OrbitControlsProvider({ children }) {
  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 200);

  const renderer = new WebGLRenderer()
  const orbitControls = useThree((state) => state.controls) 

  useEffect(() => {
    return () => {
      // Clean up any resources when the component is unmounted
      if (orbitControls) {
        orbitControls.dispose();
      }
    };
  }, []);

  return (
    <OrbitControlsContext.Provider value={(ref) => (ref = orbitControls)} args={[camera, renderer.domElement]}>
            {children}
            <OrbitControls  enableRotate={false} enablePan={false} maxDistance={1000} minDistance={5}/>
    </OrbitControlsContext.Provider>
  );
}