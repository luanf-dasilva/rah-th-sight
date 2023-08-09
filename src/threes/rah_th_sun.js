import { useContext, useRef } from 'react';
import { useFrame, useLoader, useThree} from '@react-three/fiber';
import { TextureLoader, MeshStandardMaterial, SphereGeometry, Mesh } from "three";
import TWEEN from '@tweenjs/tween.js'

import { Flares } from './rah_flares.js'
import { MoveCameraOnClick } from './rah_c_control.js'
import { OrbitControlsContext } from './rah_orbit.js';

export const Sun = (props) => {
    const orbitControlsRef = useContext(OrbitControlsContext);

    const { camera } = useThree();
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

    const texture = useLoader(TextureLoader, props.object_texture);
    const bumpTexture = useLoader(TextureLoader, props.bumpTexture);

    const sun_radius = 6;
    const sun_intensity = 0.2;

    const sunMaterial = new MeshStandardMaterial({
        emissive: 0xcac000,
        emissiveMap: texture,
        bumpMap: bumpTexture,
        map: texture,
    });

    const sunGeometry = new SphereGeometry(sun_radius, 32, 32);
    
    const sunMesh = new Mesh(sunGeometry, sunMaterial);

    // const [hovered, setHover] = useState(false);
    // const [active, setActive] = useState(false);
    // rotation
    
    useFrame((state) => (mesh.current.rotation.x += 0.001))  
    useFrame((state) => (mesh.current.rotation.y += 0.001))  
    return (
      <mesh {...props} ref={mesh} 
        // scale={active ? 1.5: 1}
        // onClick size change
        onClick={(event) => handleClick(event, mesh)}
        // onPointerOver={(event) => setHover(true)}
        // onPointerOut={(event) => setHover(false)}
      >
        <primitive object={sunMesh} position={props.position} />
        <ambientLight intensity={0.1} />
        <Flares {...props} intensity={sun_intensity} sun_radius={sun_radius}/>
      </mesh>
    );
  };