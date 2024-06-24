import * as THREE from 'three';
import { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import TWEEN from '@tweenjs/tween.js'

import { Flares } from './rah_flares.js'
import { MoveCameraOnClick } from './rah_c_control.js'
import ImageTexture from '../textures/get_texture.js'

export const Sun = (props) => {
    const [sunImg, setSunImg] = useState(null);
    const [sunbumpImg, setSunbumpImg] = useState(null);
    
    const [sunTexture, setSunTexture] = useState(null);
    const [sunbumpTexture, setSunbumpTexture] = useState(null);

    const [isSunLoading, setIsSunLoading] = useState(true); 
    const [isSunBumpLoading, setIsSunbumpLoading] = useState(true); 

    const mesh = useRef()

    const { handleClick } = MoveCameraOnClick({
      onObjectClick: (camera, mesh) => {
        const toPosition = { ...props.orig_camera_pos }
        const fromPosition = { ...camera.position };
        const tween = new TWEEN.Tween(fromPosition)
          .to(toPosition, 1000)
          .easing(TWEEN.Easing.Quadratic.Out)
          .onUpdate(() => {
            camera.position.set(fromPosition.x, fromPosition.y, fromPosition.z);
          })
          .onComplete(() => {
              // orbitControlsRef.target.set([10, 10, 0]);
              // camera.lookAt(props.position)
              // orbitControlsRef.current.update();
              console.log("tween complete")
          })
          .start();
 
      },
    });        

       useFrame(() => {
        if (mesh.current) {
            mesh.current.rotation.y += 0.005; 
            mesh.current.rotation.x += 0.005; 
        }
    })

    const sun_radius = 6;
    const sun_intensity = 0.2;

    useEffect(() => {
      if (sunImg && sunbumpImg) {
          const loader = new THREE.TextureLoader();
          const loadedSunTexture = loader.load(sunImg);
          const loadedSunbumpTexture = loader.load(sunbumpImg);
          
          // Setting the texture
          setSunTexture(loadedSunTexture);
          setIsSunLoading(false);
          setSunbumpTexture(loadedSunbumpTexture);
          setIsSunbumpLoading(false);
      }
  }, [sunImg, sunbumpImg]);

    return (
      <>
      <ImageTexture onLoaded={setSunImg} 
        user={props.user} 
        position={0}
        system_name={props.system_name}
        prop_type={props.prop_type}/>
      <ImageTexture onLoaded={setSunbumpImg} 
        user={props.user} 
        position={1} 
        system_name={props.system_name}
        prop_type={props.prop_type}/>
       
        {!isSunLoading && !isSunBumpLoading && sunTexture && sunbumpTexture && (
          
          <mesh {...props} ref={mesh}
            // scale={active ? 1.5: 1}
            // onClick size change
            onClick={(event) => handleClick(event, mesh)}
            // onPointerOver={(event) => setHover(true)}
            // onPointerOut={(event) => setHover(false)}
          >    
            <sphereGeometry args={[sun_radius, 32, 32]} />
            <meshStandardMaterial
              emissive={0xcac000}
              bumpMap={sunbumpTexture}
              map={sunTexture}
              emissiveMap={sunTexture}/>
            <ambientLight intensity={0.1} />
            <Flares {...props} intensity={sun_intensity} sun_radius={sun_radius}/>
          </mesh>
        )}
      </>
    );
  };
