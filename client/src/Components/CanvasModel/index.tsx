import { Center, Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React from 'react';

import Backdrop from './Backdrop';
import CameraRig from './CameraRig';
import Shirt from './Shirt';

export default function CanvasModel() {
  return (
    /* eslint-disable react/no-unknown-property */
    <Canvas
      className="w-full max-w-full h-full transition-all ease-in"
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />

      <CameraRig>
        <>
          <Backdrop />
          <Center>
            <Shirt />
          </Center>
        </>
      </CameraRig>
    </Canvas>
  );
}
