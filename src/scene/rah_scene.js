import { PerfHeadless, Perf, usePerf } from 'r3f-perf'
import { Planet } from '../threes/rah_planet.js'
import { Sun } from '../threes/rah_th_sun.js'
import { Elipse } from '../threes/rah_elipse.js';
import { OrbitControlsProvider } from '../threes/rah_orbit.js';
import DynamicCanvas from './dynamic_canvas.js';

export const RahScene = (props) => {
  const elipse = Elipse(25, 30, 9)
  const sun_position = [0, 0, 0]
  const camera_postiiton = [10, 10, 50]
  const orig_camera_pos = {
    x: 10,
    y: 10,
    z: 50
  }

  const position_offset = (props.start_position + 1 > elipse.length) ? elipse.length : 0;

  return (

    <>
      <DynamicCanvas shadows>
          <Perf/>
          <OrbitControlsProvider camera_postiiton={camera_postiiton} >
            <mesh>
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
                <Planet elipse_radius={[50, 40]} user={props.user} elipse_position={props.end_position} system_name={props.system_name} prop_type='sun' />
                <Sun position={sun_position} user={props.user} system_name={props.system_name} orig_camera_pos={orig_camera_pos} />
            </mesh>
          </OrbitControlsProvider>
      </DynamicCanvas>
  </>

  );
};
 
export default RahScene;