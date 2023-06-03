
import { useState, useRef, useContext} from 'react';
import * as THREE from 'three';
import { useFrame, useThree, useLoader, extend } from 'react-three-fiber';
import TWEEN from '@tweenjs/tween.js'

import { MoveCameraOnClick } from './rah_c_control.js'
import { OrbitControlsContext } from './rah_orbit.js';


// extend({ OrbitControls });
export const Planet = (props) => {
    const orbitControlsRef = useContext(OrbitControlsContext);
    const mesh = useRef()
    const { camera } = useThree();
    const planet_dimensions = [4, 4, 4];
    let rah_factor = 1;
    // const end = {
    //   x: props.position.x,
    //   y: props.position.y,
    //   z: props.position.z
    // }

    const { handleClick } = MoveCameraOnClick({
      onObjectClick: (camera, mesh) => {
        if  ('elipse_radius' in props){
           rah_factor = 0.06081997
        }
        if ('position' in props) {
          rah_factor = 1.75;
        }

        const toPosition = {
          x: mesh.current.position.x * rah_factor,
          y: mesh.current.position.y * rah_factor,
          z: (mesh.current.position.z + 25) * rah_factor
        }

        const fromPosition = { ...camera.position };
        const tween = new TWEEN.Tween(fromPosition)
          .to(toPosition, mesh.current.duration)
          .easing(TWEEN.Easing.Quadratic.Out)
          .onUpdate(() => {
            camera.position.set(fromPosition.x, fromPosition.y, fromPosition.z);
          })
          .onComplete(() => {
              // orbitControlsRef.target.set([10, 10, 0]);
              // camera.lookAt(props.position)
              // orbitControlsRef.current.update();
              console.log("tween complete")
              console.log(mesh.current.position)
          })
          .start();
      },
    });        
    



    const texture = useLoader(THREE.TextureLoader, props.object_texture);

    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);
    useFrame(({ clock }) => {
      if ('elipse_radius' in props ) {
        const t = clock.getElapsedTime() * 0.1;
        const x = props.elipse_radius[0] * Math.cos(t);
        const y = props.elipse_radius[1] * Math.sin(t);
        mesh.current.position.set(x, y, 0);
      }    
    });
    return (
      <mesh {...props} ref={mesh} 
        onClick={(event) => handleClick(event, mesh)}
      >
        {/* <OrbitControls ref={orbitControlsRef} args={[camera]} /> */}
        <boxGeometry args={planet_dimensions}/>
        <meshStandardMaterial map={texture}/>

      </mesh>
    );
  };
  