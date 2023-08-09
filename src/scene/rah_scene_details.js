import { Canvas } from '@react-three/fiber';
import { PerfHeadless, Perf, usePerf } from 'r3f-perf'

import { Planet } from '../threes/rah_planet.js'
import { Sun } from '../threes/rah_th_sun.js'
import { Elipse } from '../threes/rah_elipse.js';
import { OrbitControlsProvider } from '../threes/rah_orbit.js';
import DynamicCanvas from './dynamic_canvas.js';

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
            <Planet position={elipse[0]} user_id="73db01fe-741c-4219-85e6-be98c77e1b20" elipse_position={0} overview_or_details={false} day_or_night={true} />
            <Planet position={elipse[1]} user_id="73db01fe-741c-4219-85e6-be98c77e1b20" elipse_position={1} overview_or_details={false} day_or_night={true} />
            <Planet position={elipse[2]} user_id="73db01fe-741c-4219-85e6-be98c77e1b20" elipse_position={2} overview_or_details={false} day_or_night={true} /> 
            <Planet position={elipse[3]} user_id="73db01fe-741c-4219-85e6-be98c77e1b20" elipse_position={3} overview_or_details={false} day_or_night={true} />
            <Planet position={elipse[4]} user_id="73db01fe-741c-4219-85e6-be98c77e1b20" elipse_position={4} overview_or_details={false} day_or_night={true} />
            <Planet position={elipse[5]} user_id="73db01fe-741c-4219-85e6-be98c77e1b20" elipse_position={5} overview_or_details={false} day_or_night={true} />
            <Planet position={elipse[6]} user_id="73db01fe-741c-4219-85e6-be98c77e1b20" elipse_position={6} overview_or_details={false} day_or_night={true} />
            <Planet position={elipse[7]} user_id="73db01fe-741c-4219-85e6-be98c77e1b20" elipse_position={7} overview_or_details={false} day_or_night={true} />
            <Planet position={elipse[8]} user_id="73db01fe-741c-4219-85e6-be98c77e1b20" elipse_position={8} overview_or_details={false} day_or_night={true} />
            
            <Planet elipse_radius={[50, 40]} user_id="73db01fe-741c-4219-85e6-be98c77e1b20" elipse_position={9} overview_or_details={false} day_or_night={true} />

          {/* <Planet position={elipse[0]} object_texture={base_dir +'kos.jpg' } />
          <Planet position={elipse[1]} object_texture={base_dir +'nina.jpg'}  />
          <Planet position={elipse[2]} object_texture={base_dir +'bigthinks.jpg'} />
          <Planet position={elipse[3]} object_texture={base_dir +'try.jpg'} />
          <Planet position={elipse[4]} object_texture={base_dir +'caribou.jpg'} />
          <Planet position={elipse[5]} object_texture={base_dir +'star.jpg'} />
          <Planet position={elipse[6]} object_texture={base_dir +'iron.jpg'} />
          <Planet position={elipse[7]} object_texture={base_dir +'slaus.jpg'} />
          <Planet position={elipse[8]} object_texture={base_dir +'clockwork.jpg'} />
          
          <Planet elipse_radius={[50, 40]} object_texture={base_dir + 'soria_moria_canvas.png'}/> */}
          <Sun position={sun_position} object_texture='assets/sun_props/suntexture.jpg' bumpTexture='assets/sun_props/sunbumptexture.jpg' orig_camera_pos={orig_camera_pos} />
      </mesh>

  );
}

export const RahDetails = () => {
  return (
    <>
      <DynamicCanvas shadows>
          <Perf/>
          <OrbitControlsProvider camera_postiiton={camera_postiiton} >
            <Scene />
          </OrbitControlsProvider>
      </DynamicCanvas>
  </>

  );
};

export default RahDetails;