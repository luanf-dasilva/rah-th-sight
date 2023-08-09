
import { Flex, Box } from "@chakra-ui/react";
import  { SceneStateProvider } from '../scene/provider.js'
import { RahDetails } from '../scene/rah_scene_details.js'

const App = () => {
  return (
    <Flex height="100vh">
      <Box flex="1">
        <main className="main" width="100vw" height="100vh">
          <SceneStateProvider>
            <RahDetails />
          </SceneStateProvider>
        </main>
      </Box>
    </Flex>
  );
}

export default App;


// import { Box as ChakraBox } from "@chakra-ui/react";
// import { Canvas } from "@react-three/fiber";
// import { useRef } from "react";
// import { useFrame } from "@react-three/fiber";

// function Box() {
//   const mesh = useRef();
//   useFrame((state, delta) => (mesh.current.rotation.x += 0.01));

//   return (
//     <mesh ref={mesh}>
//       <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
//       <meshStandardMaterial attach="material" color="orange" />
//     </mesh>
//   );
// }

// export default function Home() {
//   return (
//     <ChakraBox width="100vw" height="100vh">
//       <Canvas style={{ width: "100%", height: "100%" }}>
//         <ambientLight />
//         <pointLight position={[10, 10, 10]} />
//         <Box />
//       </Canvas>
//     </ChakraBox>
//   );
// }


