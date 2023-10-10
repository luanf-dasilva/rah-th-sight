import { useEffect, useState, useRef } from "react";
import ImageTexture from '../textures/get_texture.js'
import { extend } from "@react-three/fiber";
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare.js';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

extend({ Lensflare, LensflareElement });

function useLensFlare(texture) {
  const { scene } = useThree();
  const lensFlareRef = useRef(new Lensflare());

  useEffect(() => {
    const flareElement = new LensflareElement(texture, 512, 0.0);
    lensFlareRef.current.addElement(flareElement);
    scene.add(lensFlareRef.current);

    return () => scene.remove(lensFlareRef.current);
  }, [scene, texture]);

  return lensFlareRef;
}

const Flares = (props) => {
  const offset = 20;
  const [sunFlareImg, setSunFlareImg] = useState(null);
  const [sunFlareTexture, setSunFlareTexture] = useState(null);
  const [isSunFlareLoading, setIsSunFlareLoading] = useState(true);

  const lensFlare = useLensFlare(sunFlareTexture);

  useEffect(() => {
    if (sunFlareImg) {
      const loader = new THREE.TextureLoader();
      const loadedSunFlareTexture = loader.load(sunFlareImg);

      setSunFlareTexture(loadedSunFlareTexture);
      setIsSunFlareLoading(false);
    }
  }, [sunFlareImg]);

  useEffect(() => {
    if (lensFlare.current && props.position) {
      lensFlare.current.position.set(props.position[0], props.position[1], props.position[2]);
    }
  }, [props.position]);

  return (
    <>
      <ImageTexture 
        onLoaded={setSunFlareImg} 
        user_id={props.user_id} 
        position={2}
        system_name={props.system_name}
        prop_type='sun_center_mass'
      />

      {!isSunFlareLoading && sunFlareTexture && (
        <group position={props.position}>
          <pointLight intensity={props.intensity} position={[props.position[0] - props.sun_radius, 0 , 0 ]} />
          {/*... Other point lights ...*/}
          <pointLight intensity={ props.intensity } position={[props.position[0] - props.sun_radius  - offset, 0 , 0 ]}/>
          <pointLight intensity={props.intensity} position={[props.position[0], props.sun_radius - offset , 0 ]}/>
          <pointLight intensity={props.intensity} position={[props.position[0], props.sun_radius + offset , 0 ]}/> 
          <pointLight intensity={props.intensity} position={[props.position[0], 0 , props.sun_radius + offset  ]}/>
          <pointLight intensity={props.intensity} position={[props.position[0], 0 , props.sun_radius - offset  ]}/>  
        </group>
      )}
    </>
  );
};

export { Flares };