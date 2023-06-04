import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare.js'
import { extend, useLoader } from "@react-three/fiber";
import { TextureLoader, PointLight }  from 'three';

extend({ Lensflare, LensflareElement });

const Flares = (props) => {

  // const [flare0, flare3] = useLoader(THREE.TextureLoader, [lensflare0, lensflare3]);
  const light = new PointLight( 0xffffff, .01, 2000 );
  const offset = 20;

  const textureFlare1 = useLoader(TextureLoader, 'assets/sun_props/lensflare3.png');
  const textureFlare2 = useLoader(TextureLoader, 'assets/sun_props/lensflare3.png');

  const lensflare = new Lensflare();
  const edge_light_int = props.intensity
  lensflare.addElement( new LensflareElement( textureFlare2, 512, 0 ) );
  // lensflare.addElement( new LensflareElement( textureFlare2, 512, 0 ) );
  // lensflare.addElement( new LensflareElement( textureFlare2, 60, 0.6 ) );

  light.add( lensflare );

  return (
    <>
      <primitive object={light} position={props.position} size={props.sun_radius*5}/>
      <pointLight intensity={ props.intensity } position={[props.position[0] - props.sun_radius  - offset, 0 , 0 ]}/>
      <pointLight intensity={props.intensity} position={[props.position[0], props.sun_radius - offset , 0 ]}/>
      <pointLight intensity={props.intensity} position={[props.position[0], props.sun_radius + offset , 0 ]}/> 
      <pointLight intensity={props.intensity} position={[props.position[0], 0 , props.sun_radius + offset  ]}/>
      <pointLight intensity={props.intensity} position={[props.position[0], 0 , props.sun_radius - offset  ]}/>  
    </>
    //  <pointLight intensity={0.3} {...props}/>
    // <pointLight {...props}
    //   intensity={1}
    //   color="white"
    // >
    //   <lensflare>
    //     <lensflareElement texture={flare0} size={60} distance={0.6} />
    //     <lensflareElement texture={flare3} size={70} distance={0.7} />
    //     <lensflareElement texture={flare3} size={120} distance={0.9} />
    //     <lensflareElement texture={flare3} size={70} distance={1} />
    //   </lensflare>
    // </pointLight>
  );
};

export {Flares} 