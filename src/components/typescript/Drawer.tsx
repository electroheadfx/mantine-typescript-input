import React, { useState } from 'react';
import { Group, Stack, Paper, Title, Text, Chip, Modal, NumberInput, Button } from '@mantine/core';

type ShapeProps = 'circle' | 'square' | 'rectangle';

type DrawerProps = { fullname: string, color?: string } & (
  | { shape: 'circle'; radius: number }
  | { shape: 'square'; width: number }
  | { shape: 'rectangle'; width: number; height: number }
);

export function DynamicDrawer(props : DrawerProps) {

  const [circle, setCircle] = useState( () => props.shape === 'circle' ? { radius: props.radius, modal: false } : { radius: 0, modal: false } );
  const [square, setSquare] = useState( () => props.shape === 'square' ? { width: props.width, modal: false } : { width: 0, modal: false } );
  const [rectangle, setRectangle] = useState( () => props.shape === 'rectangle' ? { width: props.width, height: props.height, modal: false } : { width: 0, height: 0, modal: false } );
  
  // shape selector state
  const [shape, setShape] = useState(props.shape);

  // handle modal and shape states
  const setupShapeModal = (shapeProp: ShapeProps, ModalState: boolean = true, forceUpdateModal: boolean = true ) => {
    switch (shapeProp) {
      case 'circle':
        if (circle.radius === 0 || forceUpdateModal) {setCircle( (prevData) => { return {...prevData, modal: ModalState }})};
      break;
      case 'square':
        if (square.width === 0 || forceUpdateModal) setSquare( (prevData) => { return {...prevData, modal: ModalState }});
      break;
      case 'rectangle':
        if (rectangle.width === 0 || rectangle.height === 0 || forceUpdateModal) setRectangle( (prevData) => { return {...prevData, modal: ModalState }});
      break;
    }
    // if modal open (true), set shape state
    if (ModalState) setShape(shapeProp);
  }

  // handle shape data
  const submitHandler = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    switch (event.currentTarget.id) {
      case 'form-circle':
        const circleRadius = event.currentTarget.circleRadius.value;
        setCircle( (prevData) => { return {...prevData, radius: circleRadius }});
        setupShapeModal('circle', false);
      break;
      case 'form-square':
        const squareWidth = event.currentTarget.squareWidth.value;
        setSquare( (prevData) => { return {...prevData, width: squareWidth }});
        setupShapeModal('square', false);
        break;
      case 'form-rectangle':
        const rectangleWidth = event.currentTarget.rectangleWidth.value;
        const rectangleHeight = event.currentTarget.rectangleHeight.value;
        setRectangle( (prevData) => { return {...prevData, width: rectangleWidth, height: rectangleHeight }});
        setupShapeModal('rectangle', false);
      break;
    }
  }

  return (
    <>
      <Paper shadow="xs" p="md" style={{minWidth: "200px", backgroundColor: props?.color || 'white' }} >
        <Stack align="center">
          <Title order={4} style={{color:"steelblue"}} ><Text component="span" size="xs">Name: </Text>`{props.fullname}`</Title>
            <Chip.Group position="center" multiple={false} value={shape} onChange={(shape) => setupShapeModal(shape as ShapeProps, true, false) }>
              <Chip value="circle">Circle</Chip>
              <Chip value="square">Square</Chip>
              <Chip value="rectangle">Rectangle</Chip>
            </Chip.Group>
            <Text align="center" size="xs">Properties of {shape}:
              <Text size="lg" >
                { shape === 'circle' && `Radius : ${circle.radius}`}
                { shape === 'square' && `width : ${square.width}`}
                { shape === 'rectangle' && `width : ${rectangle.width} height : ${rectangle.height}`}
              </Text>
            </Text>
            <Button variant="outline" size="xs" onClick={() => setupShapeModal(shape) } >Edit</Button>
        </Stack>
      </Paper>
      
      <Modal data-shape="square"
        centered
        opened={ square.modal }
        onClose={ () => setupShapeModal('square', false) }
        title="Setup the Square property"
      >
        <form id="form-square" onSubmit={submitHandler}>
          <NumberInput name='squareWidth' data-autofocus required label="Enter the square's width" defaultValue={square.width} />
          Prev value={square.width}
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Modal>
      <Modal data-shape="circle"
        centered
        opened={ circle.modal }
        onClose={ () => setupShapeModal('circle', false) }
        title="Setup the Circle property"
      >
        <form id="form-circle" onSubmit={submitHandler}>
          <NumberInput name='circleRadius' data-autofocus required label="Enter the circle's radius" defaultValue={circle.radius} value={circle.radius} />
          Prev value={circle.radius}
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Modal>
       <Modal data-shape="rectangle"
        centered
        opened={ rectangle.modal }
        onClose={ () => setupShapeModal('rectangle', false) }
        title="Setup the Rectangle property"
      >
        <form id="form-rectangle" onSubmit={submitHandler}>
          <NumberInput name='rectangleWidth' data-autofocus required label="Enter the rectangle's width" defaultValue={rectangle.width} />
          Prev value={rectangle.width}
          <NumberInput mt="xs" name='rectangleHeight' data-autofocus required label="Enter the rectangle's height" defaultValue={rectangle.height} />
          Prev value={rectangle.height}
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}

function DrawerComponent({children}: {children: React.ReactNode}) {
  return (
  <Paper withBorder shadow="sm" p="xl" m="xl" >
      <Title align="center" order={3} style={{color:"GrayText"}} >Drawer Widget</Title>
      <Stack align="center" >
        <Group position="left" spacing="xs" >
          {children}
        </Group>
      </Stack>
    </Paper>
  );
}

export default DrawerComponent;