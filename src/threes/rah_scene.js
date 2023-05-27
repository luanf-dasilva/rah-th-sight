import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'
import {  Planet } from './rah_planet'
import {  Sun } from './rah_th_sun'
import { PerspectiveCamera } from "three";

export const RahScene = () => {
  
  const sun_position = [0, 0, 0]
  
  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const orig_position = [10, 10, 5]
  camera.position.set(...orig_position);
  
  return (
    <Canvas  camera={camera} shadows>
      <>
         <OrbitControls minDistance={5} maxDistance={20} enablePan={false} enableRotate={false} target={[0, 5, 0]}/>
         <Planet size={[1, 1, 1]} elipse_radius={[10,5]} object_texture='assets/soria_moria/soria_moria_overview.jpg'/>
         <Planet size={[2, 2, 2]} elipse_radius={[15, 10]} object_texture='assets/soria_moria/soria_moria_canvas.PNG'/>
         <Sun position={sun_position} object_texture='assets/sun_props/suntexture.jpg' origCameraPosition= {...orig_position} bumpTexture='assets/sun_props/sunbumptexture.jpg' />

      </>
    </Canvas>
  );
};