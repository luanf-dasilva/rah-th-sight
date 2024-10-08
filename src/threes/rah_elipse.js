import * as THREE from 'three';

export function Elipse (xRadius, yRadius, segments)  {
    const points = [];
        for (let i = 0; i <= segments; i++) {
          const theta = (i / (segments) ) * Math.PI * 2;
          const x = xRadius * Math.cos(theta);
          const y = yRadius * Math.sin(theta);
          points.push(new THREE.Vector3(x, y, -20));
        }
    return points;
  }