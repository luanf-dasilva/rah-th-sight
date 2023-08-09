import {  Planet } from '../threes/rah_planet.js'
import {  Sun } from '../threes/rah_th_sun.js'
import { OrbitControlsProvider } from '../threes/rah_orbit.js';
import DynamicCanvas from './dynamic_canvas.js';

import ImageTexture from '../textures/get_texture.js'
import { useState, useRef, useEffect, useMemo} from 'react';

export const RahOverview = () => {
  const [base64Img, setBase64Img] = useState(null);
    const camera_postiiton = [10, 10, 50]
    const orig_camera_pos = {
    x: 10,
    y: 10,
    z: 50
    }
  
  const sun_position = [0, 0, 0]
  
  return (
      <DynamicCanvas>      
        <OrbitControlsProvider camera_postiiton={camera_postiiton} >
          <>
            <Planet size={[1, 1, 1]} elipse_radius={[10,5]} user_id="73db01fe-741c-4219-85e6-be98c77e1b20" elipse_position={0} overview_or_details={true} day_or_night={true} />
            <Planet size={[2, 2, 2]} elipse_radius={[15, 10]} user_id="73db01fe-741c-4219-85e6-be98c77e1b20" elipse_position={1} overview_or_details={true} day_or_night={true} />
            <Sun position={sun_position} object_texture='assets/sun_props/suntexture.jpg' origCameraPosition= {...orig_camera_pos} bumpTexture='assets/sun_props/sunbumptexture.jpg' />
          </>
        </OrbitControlsProvider>
     </DynamicCanvas>
  );
};

export default RahOverview;