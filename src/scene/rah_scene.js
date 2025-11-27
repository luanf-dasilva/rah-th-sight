import { Perf, } from 'r3f-perf'
import { Planet } from '../threes/rah_planet.js'
import { Satellite } from '../threes/rah_satellite.js'
import { Sun } from '../threes/rah_th_sun.js'
import { Elipse } from '../threes/rah_elipse.js';
import { OrbitControlsProvider } from '../threes/rah_orbit.js';
import DynamicCanvas from './dynamic_canvas.js';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { useEffect, useMemo } from 'react';

import { Suspense } from 'react';
import TweenLoop from '../lib/tween_loop.js'

function RenderSettings() {
  const { gl } = useThree();
  useEffect(() => {
    gl.physicallyCorrectLights = true;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.0; 
  }, [gl]);
  return null;
}

export const RahScene = (props) => {
  const elipse = useMemo(() => Elipse(25, 30, 9), []);
  const sun_position = [0, 0, 0]
  const camera_position = [10, 10, 50]
  const orig_camera_pos = useMemo(() => ({
    x: 10,
    y: 10,
    z: 50
  }), []);

  const position_offset = (props.start_position + 1 > elipse.length) ? elipse.length : 0;
  THREE.Cache.enabled = true;
  return (
    <>
      <DynamicCanvas >
          <RenderSettings />
          <TweenLoop />
          <Perf position="top-left" />
          <hemisphereLight intensity={0.2} groundColor={0x222222} />
          <OrbitControlsProvider camera_position={camera_position} >
          <group>
            <Suspense
              fallback={
                <mesh position={[0,0,0]}>
                  <boxGeometry args={[2,2,2]} />
                  <meshBasicMaterial />
                </mesh>
              }
            >
              {elipse.slice(props.start_position % 10, props.end_position % 10).map((position, index) => (
                <Planet
                  key={index}
                  position={position}
                  user={props.user}
                  elipse_position={index + position_offset}
                  system_name={props.system_name}
                  prop_type='sun'
                />
              ))}
              <Satellite
                elipse_radius={[50, 40]}
                user={props.user}
                elipse_position={props.end_position}
                system_name={props.system_name}
                prop_type='sun'
              />
              <Sun
                position={sun_position}
                user={props.user}
                system_name={props.system_name}
                prop_type='sun_center_mass'
                orig_camera_pos={orig_camera_pos }
              />
            </Suspense>
          </group>
          </OrbitControlsProvider>
      </DynamicCanvas>
  </>
  );
};
 
export default RahScene;
