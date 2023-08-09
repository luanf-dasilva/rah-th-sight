import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js'
import { useState, useRef, useEffect, useMemo} from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';

import { MoveCameraOnClick } from './rah_c_control.js'
import ImageTexture from '../textures/get_texture.js'


// extend({ OrbitControls });
export const Planet = (props) => {
    const mesh = useRef()
    const [base64Img, setBase64Img] = useState(null);
    const [texture, setTexture] = useState(null);
    const [isLoading, setIsLoading] = useState(true);  // Step 1: Loading state

    const planet_dimensions = [4, 4, 4];
    let rah_factor = 1.75;

    const { handleClick } = MoveCameraOnClick({
      onObjectClick: (camera, mesh) => {
        if  ('elipse_radius' in props){
           rah_factor = 0.06081997
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
    
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);
    useFrame(({ clock }) => {
      if (mesh.current && 'elipse_radius' in props ) {
        const t = clock.getElapsedTime() * 0.1;
        const x = props.elipse_radius[0] * Math.cos(t);
        const y = props.elipse_radius[1] * Math.sin(t);
        mesh.current.position.set(x, y, 0);
      }    
    });

    useEffect(() => {
      if (base64Img) {
          const loader = new THREE.TextureLoader();
          const loadedTexture = loader.load(base64Img);
          
          // Setting the texture
          setTexture(loadedTexture);
          setIsLoading(false);
      }
  }, [base64Img]);

    return (
      <>
        <ImageTexture onLoaded={setBase64Img} 
                      user_id={props.user_id} 
                      position={props.elipse_position} 
                      day_or_night={props.day_or_night} 
                      overview_or_details={props.overview_or_details}/>
           {!isLoading && texture && (
            <mesh {...props} ref={mesh} 
              onClick={(event) => handleClick(event, mesh)}
            >
              <boxGeometry args={planet_dimensions}/>
              <meshStandardMaterial map={texture}/>

            </mesh>
           )}
      </>
    );
  };
  