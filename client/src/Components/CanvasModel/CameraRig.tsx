import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import React, { PropsWithChildren, useRef } from 'react';
import { useSnapshot } from 'valtio';
import state from '../../store';

export default function CameraRig({ children }: PropsWithChildren) {
  const group = useRef<THREE.Group>(null);
  const snap = useSnapshot(state);

  // runs the code in the callback on every frame
  useFrame((state, delta) => {
    const isTablet = window.innerWidth <= 1280;
    const isMobile = window.innerWidth <= 768;

    // set the initial position of the model
    let targetPosition: [x: number, y: number, z: number] = [-0.25, 0, 2];

    // in home page
    if (snap.intro) {
      if (isTablet) {
        targetPosition = [0, 0, 2];
      }
      if (isMobile) {
        targetPosition = [0, 0.2, 2.5];
      }
    } else {
      // in customizer page
      if (isTablet) {
        targetPosition = [0, 0, 2];
      }
      if (isMobile) {
        targetPosition = [0, 0, 2.5];
      }
    }

    // set model camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    if (group.current) {
      // set model rotation
      easing.dampE(
        group.current.rotation,
        [state.pointer.y / 10, -state.pointer.x / 5, 0],
        0.25,
        delta,
      );
    }
  });

  return <group ref={group}>{children}</group>;
}
