import { useEffect } from 'react';

import { useFrame, useThree } from '@react-three/fiber';
import TWEEN from '@tweenjs/tween.js'

export const MoveCameraOnClick = ({ onObjectClick }) => {
  const { camera } = useThree();

  useFrame(() => {
    TWEEN.update();
  });

  const handleClick = (event, objectRef) => {
        onObjectClick(camera, objectRef);
  };

  return { handleClick };
};

