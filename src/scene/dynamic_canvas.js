import dynamic from 'next/dynamic';
const DynamicCanvas = dynamic(
    () => import('@react-three/fiber').then((mod) => mod.Canvas),
    { ssr: false } // This line is important. It disables server-side rendering for this component.
  );

export default DynamicCanvas;