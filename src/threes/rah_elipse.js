import { useState, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree, useLoader } from 'react-three-fiber';

export function Elipse (xRadius, yRadius, segments)  {
    const points = [];
        // rotation
        for (let i = 0; i <= segments; i++) {
          const theta = (i / (segments) ) * Math.PI * 2;
          const x = xRadius * Math.cos(theta);
          const y = yRadius * Math.sin(theta);
          points.push(new THREE.Vector3(x, y, -20));
        }
    const curve = new THREE.CatmullRomCurve3(points);
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getSpacedPoints(100)), new THREE.LineBasicMaterial({
      color: "grey"
    }));
    line.rotation.x = -Math.PI * 0.25;
    line.rotation.z = Math.PI * 0.125;
    line.position.x = 5;
    line.position.z = -2;
    return ( points
    //   <line>
    //     <catmullRomCurve3 args={[points]} />
    //     <meshBasicMaterial color="white" />
    //   </line>
    );
  }