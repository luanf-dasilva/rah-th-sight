import { Flex, Box } from "@chakra-ui/react";
import { SceneStateProvider } from '../scene/provider.js'
import { RahScene } from '../scene/rah_scene.js'
import { useRouter } from 'next/router'

const App = () => {
  const router = useRouter();
  const qp = router.query
  const user= qp.user
  const system_name = qp.system_name
  return (
    <Flex height="100vh">
      <Box flex="1">
        <main className="main" width="100vw" height="100vh">
          <SceneStateProvider>
            <RahScene 
              user={user || 'rah_th_admn'} 
              system_name={system_name || 'soria_moria'} 
              start_position={10} 
              end_position={11}
            />
          </SceneStateProvider>
        </main>
      </Box>
    </Flex>
  );
}

export default App;
