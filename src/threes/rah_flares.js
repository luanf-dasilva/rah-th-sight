import { useEffect, useState, useRef } from "react";
import ImageTexture from '../textures/get_texture.js';
import * as THREE from 'three';
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare.js';

export const Flares = ({ user, system_name, intensity = 400, decay = 2, distance = 0 }) => {
  const [sunFlareImg, setSunFlareImg] = useState(null);
  const [sunFlareTexture, setSunFlareTexture] = useState(null);
  const lightRef = useRef();
  const flareRef = useRef();

  // Load flare texture
  useEffect(() => {
    if (!sunFlareImg) return;
    const tex = new THREE.TextureLoader().load(sunFlareImg);
    tex.colorSpace = THREE.SRGBColorSpace;
    setSunFlareTexture(tex);
  }, [sunFlareImg]);

  // Attach lensflare to the light so it follows automatically
  useEffect(() => {
    if (!sunFlareTexture || !lightRef.current) return;
    const flare = new Lensflare();
    flare.addElement(new LensflareElement(sunFlareTexture, 512, 0.0));
    lightRef.current.add(flare);
    flareRef.current = flare;

    return () => {
      if (flareRef.current?.parent) flareRef.current.parent.remove(flareRef.current);
      flareRef.current = null;
    };
  }, [sunFlareTexture]);

  return (
    <>
      <ImageTexture
        onLoaded={setSunFlareImg}
        user={user}
        position={2}
        system_name={system_name}
        prop_type="sun_center_mass"
      />
      <group>
        <pointLight
          ref={lightRef}
          color={0xffffff}
          intensity={intensity}  
          distance={distance}
          decay={decay}         
        />
      </group>
    </>
  );
};
