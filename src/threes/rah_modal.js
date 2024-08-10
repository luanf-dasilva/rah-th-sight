import { Html, Plane } from '@react-three/drei';

// export function Modal = ({ isVisible, onClose }) => {
export const CreateThreeModal = (props) => {
  if (!props.isVisible) return null;
  return (
    <Plane args={[2, 1]} position={[0, 0, 0.5]}>
      <meshBasicMaterial color="white" />
      <Html center>
        <div style={{ textAlign: 'center' }}>
          <h2>Modal Title</h2>
          <p>This is a modal inside the 3D canvas!</p>
          <button
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                cursor: 'pointer',
              }}
              onClick={props.onClose}
            >
              x
            </button>
        </div>
      </Html>
    </Plane>
  );
};