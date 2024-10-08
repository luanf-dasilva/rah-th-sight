import * as THREE from 'three';
import { useState, useRef, useEffect } from 'react';
import { Html } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';

export const CreateThreeModal = (props) => {
  const modalRef = useRef();
  const { camera } = useThree();
  const [position, setPosition] = useState(new THREE.Vector3(0, 0, 0));

  useFrame(({}) => {
    if (modalRef.current ) {
      const newPosition = new THREE.Vector3(
        props.planet_position.x, 
        props.planet_position.y, 
        props.planet_position.z
      );

      // Adjust the position based on camera zoom level (this can be customized)
      const zoomFactor = camera.zoom * 0.1; // Adjust this factor as needed
      newPosition.x += zoomFactor;
      newPosition.y += zoomFactor;
      newPosition.z += zoomFactor;

      modalRef.current.position.copy(newPosition);
      // const planetPosVector = new THREE.Vector3(...planetRef.current.position)
     const cameraPosVector = new THREE.Vector3();
     camera.getWorldPosition(cameraPosVector); // Get the camera's position
     console.log("New camera position:", newPosition);
     console.log("For prop in position:", props.elipse_position);
     console.log("For prop in coordinate:", props.planet_position);
    }
  });

  if (!props.isVisible) return null;

  return (
    <mesh ref={modalRef} position={position}>
    {/* <planeGeometry args={[2, 2]} /> */}
    {/* <meshBasicMaterial color="white" side={THREE.DoubleSide} /> */}
    <Html center>
      <div
        style={{
          width: '200px',
          height: '100px',
          position: props.planet_position,
          // background: '#000034',
          background: 'transparent',
          border: '1px solid black',
          padding: '10px',
        }}
      >
        <h2>Modal Title</h2>
        <p>This is a modal in 3D space!</p>
        <button
          style={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            background: '#800000',
            color: 'white',
            border: 'none',
            width: '10px',
            height: '10px',
            cursor: 'pointer',
          }}
          onClick={props.onClose}
        >
        </button>
      </div>
    </Html>
  </mesh>
);
};