import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js'
import { useState, useRef, useEffect } from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';
import { Html, Plane } from "@react-three/drei"


import { MoveCameraOnClick } from './rah_c_control.js'
import { CreateThreeModal } from '../threes/rah_modal.js'
import ImageTexture from '../textures/get_texture.js'

export const Planet = (props) => {
    const planetRef = useRef()
    const modalRef = useRef();
    
    const [base64Img, setBase64Img] = useState(null);
    const [texture, setTexture] = useState(null);
    const [isLoading, setIsLoading] = useState(true); 
    const [isModalVisible, setModalVisible] = useState(false);
    

    const planet_dimensions = [4, 4, 4];
    let rah_factor = 1.75;

    const { handleClick } = MoveCameraOnClick({ 
      onObjectClick: (camera, planetRef, modalRef ) => {
        if  ('elipse_radius' in props){
           rah_factor = 0.06081997
        }

      const to_x = planetRef.current.position.x * rah_factor;
      const to_y = planetRef.current.position.y * rah_factor;
      const to_z = (planetRef.current.position.z + 25) * rah_factor
      const toPosition = {
          x: to_x,
          y: to_y,
          z: to_z
      }

       const fromPosition = { ...camera.position };
       new TWEEN.Tween(fromPosition)
          .to(toPosition, planetRef.current.duration)
          .easing(TWEEN.Easing.Quadratic.Out)
          .onUpdate(() => {
            camera.position.set(fromPosition.x, fromPosition.y, fromPosition.z);
          })
          .onComplete(() => {
              setModalVisible(true);
          })
          .start();
      },
    });        
    
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);
    useFrame(({ clock }) => {
      if (planetRef.current && 'elipse_radius' in props ) {
        const t = clock.getElapsedTime() * 0.1;
        const x = props.elipse_radius[0] * Math.cos(t);
        const y = props.elipse_radius[1] * Math.sin(t);
        planetRef.current.position.set(x, y, 0);
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
                      user={props.user} 
                      position={props.elipse_position} 
                      system_name={props.system_name}
                      prop_type={props.prop_type}/>
        {!isLoading && texture && (
         <mesh {...props} ref={planetRef} 
           onClick={(event) => handleClick(event, planetRef)}
         >
            <boxGeometry args={planet_dimensions}/>
            <meshStandardMaterial map={texture}/>
            <CreateThreeModal isVisible={isModalVisible} onClose={() => setModalVisible(false)}/>
          </mesh>
        )}

      </>
    );
  };
  