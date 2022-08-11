
import DrawerWidget, { Drawer, DynamicDrawer } from './components/typescript/Drawer';
import { Container, Center } from '@mantine/core';
import reactLogo from './assets/react.svg'

function App() {
  return (
    <Container>
      <Center mt="lg">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </Center>

      <DrawerWidget >
        <DynamicDrawer fullname='Dynamic Shape' shape='circle' radius={5} color="#EBF5FB" />
      </DrawerWidget>

    </Container>
  )
}

export default App
