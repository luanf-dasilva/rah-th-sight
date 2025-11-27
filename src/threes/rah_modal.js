import * as THREE from 'three';
import { useState, useRef, useEffect } from 'react';
import { Html } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';

export const CreateThreeModal = (props) => {
  const modalRef = useRef();
  const { camera } = useThree();
  const [position, setPosition] = useState(new THREE.Vector3(0, 0, 0));

useFrame(({}) => {
  if (modalRef.current) {
    const newPosition = new THREE.Vector3(
      props.planet_position.x, 
      props.planet_position.y, 
      props.planet_position.z
    );

    const zoomFactor = 1 / 47 * Math.max(camera.position.distanceTo(newPosition), 1); // tweak scaling to taste
    // Adjust the position based on camera zoom level (this can be customized)
    // const zoomFactor = camera.zoom ; // Adjust this factor as needed
    // const zoomFactor = 0; // Adjust this factor as needed
    const distance = camera.position.distanceTo(newPosition);
    const modalZoomFactor = .1 * (distance / 30 * zoomFactor)
    newPosition.x = props.planet_position.x * modalZoomFactor;
    newPosition.y = props.planet_position.y * modalZoomFactor;
    newPosition.z = props.planet_position.z * modalZoomFactor;

    modalRef.current.position.copy(newPosition);
    // const planetPosVector = new THREE.Vector3(...planetRef.current.position)
    const cameraPosVector = new THREE.Vector3();
    camera.getWorldPosition(cameraPosVector); // Get the camera's position
    // console.log("distance:", distance);
    console.log("modal factor:", modalZoomFactor);
    // console.log("camera position:", cameraPosVector);
     console.log("planet pos", props.planet_position);
     console.log("newPos:", newPosition);
     console.log("modal ref pos: " , modalRef.current.position)
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
          background: '#000034',
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