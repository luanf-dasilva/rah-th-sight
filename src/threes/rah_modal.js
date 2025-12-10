import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import { useState, useRef, useEffect } from 'react';
import { Html } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';

export const CreateThreeModal = (props) => {
  const modalRef = useRef();
  const { camera } = useThree();
  const [position, setPosition] = useState(new THREE.Vector3(0, 0, 0));
  const [capturedAnchorDistance, setCapturedAnchorDistance] = useState(null);
  const [df, setDf] = useState(props.distanceFactor ?? 32);
  const targetWorldRef = useRef(new THREE.Vector3());
  const isTweeningRef = useRef(false);
  const frozenTargetWorldRef = useRef(new THREE.Vector3());
  const frozenDfRef = useRef(df);
  const controlsPrevRef = useRef(null);

  // Capture anchor distance when the modal becomes visible
  useEffect(() => {
    if (props.isVisible && modalRef.current && modalRef.current.parent) {
      const parent = modalRef.current.parent;
      const planetWorld = new THREE.Vector3();
      parent.getWorldPosition(planetWorld);
      const camPos = new THREE.Vector3();
      camera.getWorldPosition(camPos);
      const dist = camPos.distanceTo(planetWorld);
      setCapturedAnchorDistance(dist);
      // Initialize distance factor at open
      const baseDF = props.baseDistanceFactor ?? (props.distanceFactor ?? 32);
      setDf(baseDF);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isVisible]);

  // When modal closes, unfreeze and restore controls if we changed them
  useEffect(() => {
    if (!props.isVisible) {
      // end freeze
      isTweeningRef.current = false;
      // restore controls if we saved them
      const controls = props.orbitControlsRef?.current;
      const prev = controlsPrevRef.current;
      if (controls && prev) {
        controls.enabled = prev.enabled;
        controls.target.copy(prev.target);
        if ('enableZoom' in controls) controls.enableZoom = prev.enableZoom;
        if ('enableRotate' in controls) controls.enableRotate = prev.enableRotate;
        if ('enablePan' in controls) controls.enablePan = prev.enablePan;
        controls.update && controls.update();
      }
      controlsPrevRef.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isVisible]);

  useFrame(({}) => {
    // advance tweens
    TWEEN.update();
    if (modalRef.current) {
      // Place the modal on/near the planet surface and move with zoom
      const parent = modalRef.current.parent; // planet mesh
      if (parent) {
        const planetWorld = new THREE.Vector3();
        parent.getWorldPosition(planetWorld);

        const camPos = new THREE.Vector3();
        camera.getWorldPosition(camPos);

        // Direction from sun (world origin or provided) toward the planet
        const sunWorld = props.sunPosition
          ? (Array.isArray(props.sunPosition)
              ? new THREE.Vector3(props.sunPosition[0], props.sunPosition[1], props.sunPosition[2])
              : new THREE.Vector3(props.sunPosition.x, props.sunPosition.y, props.sunPosition.z))
          : new THREE.Vector3(0, 0, 0);
        const radialDir = planetWorld.clone().sub(sunWorld).normalize();
        const surfaceOffset = props.surfaceOffset ?? 2.2; // base offset at anchor

        // Determine anchor distance: prop override > captured > current
        const currentDistance = camPos.distanceTo(planetWorld);
        const anchorDistance = props.anchorDistance ?? capturedAnchorDistance ?? currentDistance;

        if (isTweeningRef.current) {
          // Freeze updates: keep modal at the frozen world target converted to local
          const frozenLocal = parent.worldToLocal(frozenTargetWorldRef.current.clone());
          modalRef.current.position.copy(frozenLocal);
          // Keep df frozen
          if (df !== frozenDfRef.current) setDf(frozenDfRef.current);
          // Also force camera (and controls target) to keep looking at the frozen target to avoid snaps
          camera.lookAt(frozenTargetWorldRef.current);
          const controls = props.orbitControlsRef?.current;
          if (controls) {
            controls.target.copy(frozenTargetWorldRef.current);
            controls.update && controls.update();
          }
        } else {
          // Offset grows/shrinks linearly with distance delta
          const spreadFactor = props.spreadFactor ?? 0.8; // how fast it moves with zoom
          const minOffset = props.minOffset ?? -50; 
          const maxOffset = props.maxOffset ?? 700;
          const delta = currentDistance - anchorDistance; // >0 zoomed out, <0 zoomed in
          const totalOffset = THREE.MathUtils.clamp(surfaceOffset + delta * spreadFactor, minOffset, maxOffset);

          // Move away from the sun along the sun->planet vector
          const anchorWorld = planetWorld.clone().add(radialDir.multiplyScalar(totalOffset));
          const anchorLocal = parent.worldToLocal(anchorWorld.clone());
          modalRef.current.position.copy(anchorLocal);
          targetWorldRef.current.copy(anchorWorld);

          // Dynamic Html distanceFactor scaling with zoom
          const baseDF = props.baseDistanceFactor ?? (props.distanceFactor ?? 32);
          const dfSlope = props.dfSlope ?? 0.9; // increase size as distance grows
          const dfMin = props.dfMin ?? 8;
          const dfMax = props.dfMax ?? 500;
          const dynamicDf = THREE.MathUtils.clamp(baseDF + delta * dfSlope, dfMin, dfMax);
          // Update only if changed noticeably to avoid excessive renders
          if (Math.abs(dynamicDf - df) > 0.25) setDf(dynamicDf);
        }

        // Debug
        // console.log('anchorLocal', anchorLocal);
      }
    }
  });  


  const handleModalClick = () => {
    const target = targetWorldRef.current.clone();
    const from = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
    const camPos = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z);
    const dir = target.clone().sub(camPos).normalize();
    const approach = props.approachDistance ?? 20; // how far from the modal to stop
    const toVec = target.clone().sub(dir.multiplyScalar(approach));
    const to = { x: toVec.x, y: toVec.y, z: toVec.z };

    const duration = props.tweenDuration ?? 1000;
    // Freeze updates while tweening
    isTweeningRef.current = true;
    frozenTargetWorldRef.current.copy(target);
    frozenDfRef.current = df;

    // OrbitControls management (optional)
    const controls = props.orbitControlsRef?.current;
    if (controls && !controlsPrevRef.current) {
      controlsPrevRef.current = {
        enabled: controls.enabled,
        target: controls.target.clone(),
        enableZoom: controls.enableZoom,
        enableRotate: controls.enableRotate,
        enablePan: controls.enablePan,
      };
      controls.enabled = false; // fully disable to prevent snapping
      controls.target.copy(target);
      controls.update && controls.update();
    }

    new TWEEN.Tween(from)
      .to(to, duration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => {
        camera.position.set(from.x, from.y, from.z);
        camera.lookAt(target);
        if (controls) {
          controls.target.copy(target);
          controls.update && controls.update();
        }
      })
      // Do not unfreeze or restore here; wait until modal closes
      .start();
  };


  if (!props.isVisible) return null;

  return (
    <mesh ref={modalRef} position={position}>
    {/* <planeGeometry args={[2, 2]} /> */}
    {/* <meshBasicMaterial color="white" side={THREE.DoubleSide} /> */}
    <Html center transform distanceFactor={df}>
      <div
        onClick={handleModalClick}
        style={{
          width: '200px',
          height: '100px',
          background: '#000034',
          background: 'transparent',
          border: 'none',
          padding: '10px',
        }}
      >
        {props.imageSrc && (
          <img
            src={props.imageSrc}
            alt="planet"
            style={{ width: '100%', height: 'auto', display: 'block', marginBottom: '8px' }}
          />
        )}
        <h2>Modal Title</h2>
        <p>This is a modal in 3D space!</p>
        <button
          style={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            background: '#800000',
            color: 'white',
            border: 'none',
            width: '10px',
            height: '10px',
            cursor: 'pointer',
          }}
          onClick={props.onClose}
        >
        </button>
      </div>
    </Html>
  </mesh>
);
};