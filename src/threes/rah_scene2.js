import { Canvas, useThree,  extend, } from '@react-three/fiber';
import { PerspectiveCamera , WebGLRenderer} from "three";
import { useEffect, useRef, createContext } from 'react';
import { PerfHeadless, Perf, usePerf } from 'r3f-perf'

import {  Planet } from './rah_planet'
import {  Sun } from './rah_th_sun'
import { Elipse } from './rah_elipse';
import { OrbitControlsProvider } from './rah_orbit';
import { OrbitControlsContext } from './rah_orbit';
import { OrbitControls } from '@react-three/drei'


const camera_postiiton = [10, 10, 50]
const orig_camera_pos = {
  x: 10,
  y: 10,
  z: 50
}
function Scene() {
  const base_dir = "assets/soria_moria/"
  const elipse = Elipse(25, 30, 9) 
  const sun_position = [0, 0, 0]
  return (
      <mesh>
          <Planet position={elipse[0]} object_texture={base_dir +'kos.jpg' } />
          <Planet position={elipse[1]} object_texture={base_dir +'nina.jpg'}  />
          <Planet position={elipse[2]} object_texture={base_dir +'bigthinks.jpg'} />
          <Planet position={elipse[3]} object_texture={base_dir +'try.jpg'} />
          <Planet position={elipse[4]} object_texture={base_dir +'caribou.jpg'} />
          <Planet position={elipse[5]} object_texture={base_dir +'star.jpg'} />
          <Planet position={elipse[6]} object_texture={base_dir +'iron.jpg'} />
          <Planet position={elipse[7]} object_texture={base_dir +'slaus.jpg'} />
          <Planet position={elipse[8]} object_texture={base_dir +'clockwork.jpg'} />
          
          <Planet elipse_radius={[50, 40]} object_texture={base_dir + 'soria_moria_canvas.PNG'}/>
          <Sun position={sun_position} object_texture='assets/sun_props/suntexture.jpg' bumpTexture='assets/sun_props/sunbumptexture.jpg' orig_camera_pos={orig_camera_pos} />
      </mesh>

  );
}

export const RahScene = () => {
  return (
    <>
      <Canvas shadows>
          <Perf/>
          <OrbitControlsProvider camera_postiiton={camera_postiiton} >
            <Scene />
          </OrbitControlsProvider>
      </Canvas>
  </>

  );
};