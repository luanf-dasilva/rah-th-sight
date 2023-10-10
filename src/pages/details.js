
import { Flex, Box } from "@chakra-ui/react";
import  { SceneStateProvider } from '../scene/provider.js'
import { RahScene } from '../scene/rah_scene.js'
import { useRouter } from 'next/router'

const App = () => {
  const router = useRouter();
  const qp = router.query
  const user= qp.user
  const system_name = qp.system_name
  const user_id = user
  return (
    <Flex height="100vh">
      <Box flex="1">
        <main className="main" width="100vw" height="100vh">
          <SceneStateProvider>
            <RahScene user_id={user_id || '73db01fe-741c-4219-85e6-be98c77e1b20'} system_name={system_name || 'soria_moria'} start_positin={0} end_position={9}/>
          </SceneStateProvider>
        </main>
      </Box>
    </Flex>
  );
}

export default App;