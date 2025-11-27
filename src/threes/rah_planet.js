import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import { useState, useRef, useEffect } from 'react';
import { MoveCameraOnClick } from './rah_c_control.js';
import { CreateThreeModal } from '../threes/rah_modal.js';
import ImageTexture from '../textures/get_texture.js';

export const Planet = (props) => {
    const planetRef = useRef();
    const [base64Img, setBase64Img] = useState(null);
    const [texture, setTexture] = useState(null);
    const [isLoading, setIsLoading] = useState(true); 
    const [isModalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    if (isModalVisible && props.planet_position) {
      setModalPosition(new THREE.Vector3(
        props.planet_position.x,
        props.planet_position.y,
        props.planet_position.z
      ));
    }
  }, [isModalVisible, props.planet_position]);

  const planet_dimensions = [4, 4, 4];
    let rah_factor = 1.97;

    const { handleClick } = MoveCameraOnClick({ 
      onObjectClick: (camera, planetRef) => {
        const toCameraPosition = {
            x: planetRef.current.position.x * rah_factor,
            y: planetRef.current.position.y * rah_factor,
            z: (planetRef.current.position.z + 25) * rah_factor
        };

        const fromCameraPosition = { ...camera.position };
        new TWEEN.Tween(fromCameraPosition)
            .to(toCameraPosition, planetRef.current.duration)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(() => {
              camera.position.set(fromCameraPosition.x, fromCameraPosition.y, fromCameraPosition.z);
            })
            .onComplete(() => {
                setModalVisible(true);
            })
            .start();
        },
    });        
    
    useEffect(() => {
      if (base64Img) {
          const loader = new THREE.TextureLoader();
          const loadedTexture = loader.load(base64Img);
          setTexture(loadedTexture);
          setIsLoading(false);
      }
    }, [base64Img]);

    return (
      <>
        <ImageTexture 
          onLoaded={setBase64Img} 
          user={props.user} 
          position={props.elipse_position} 
          system_name={props.system_name}
          prop_type={props.prop_type} 
        />
        {!isLoading && texture && (
          <mesh 
            {...props} 
            ref={planetRef} 
            onClick={(event) => handleClick(event, planetRef)}
          >
            <boxGeometry args={planet_dimensions} />
            <meshStandardMaterial map={texture} />
            <CreateThreeModal 
              isVisible={isModalVisible}  
              planet_position={props.position}
              onClose={() => setModalVisible(false)}    
            />
          </mesh>
        )}
      </>
    );
};
