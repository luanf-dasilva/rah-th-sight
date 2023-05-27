import { useThree,  extend, render, } from '@react-three/fiber';
import { useRef, createContext, useEffect } from 'react';
import { PerspectiveCamera , WebGLRenderer} from "three";

// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OrbitControls } from '@react-three/drei'
export const OrbitControlsContext = createContext();

export function OrbitControlsProvider({ children }) {
  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 200);

  const renderer = new WebGLRenderer()
  renderer.useLegacyLights = false //use this instead of setting physicallyCorrectLights=true property
 

  const orbitControls = useThree((state) => state.controls) 
  // const orbitControls = new OrbitControls(camera, renderer.domElement);
  // orbitControls.target.set(10, 10, 0); // Set the target of OrbitControls
  // orbitControls.enableZoom = true;
  // orbitControls.enableRotate= false;
  // orbitControls.minDistance= 225;
  // orbitControls.maxDistance= 700;
  // orbitControls.addEventListener('scroll', () => {
  //   console.log('Scroll event triggered');
  // });
  

  useEffect(() => {
    return () => {
      // Clean up any resources when the component is unmounted
      orbitControls.dispose();
    };
  }, []);

  return (
    <OrbitControlsContext.Provider value={(ref) => (ref = orbitControls)} args={[camera, renderer.domElement]}>
            {children}
            <OrbitControls  enableRotate={false} enablePan={false} maxDistance={1000} minDistance={5}/>
    </OrbitControlsContext.Provider>
  );
}