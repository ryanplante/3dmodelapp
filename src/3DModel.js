import React, { useRef, useEffect } from 'react';
import { Suspense } from 'react';
import { Canvas, useLoader, useFrame } from 'react-three-fiber';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { Backdrop, OrbitControls } from '@react-three/drei';

const EyeModel = () => {
  const modelRef = useRef();

  useFrame(({ mouse }) => {
    const pitch = -mouse.y * Math.PI / 4;
    const yaw = mouse.x * Math.PI / 4;
    modelRef.current.rotation.set(pitch, yaw, 0);
  });

  useEffect(() => {
    const loadModel = async () => {
      const mtlLoader = new MTLLoader();
      const materials = await new Promise((resolve, reject) =>
        mtlLoader.load('/eyeball.mtl', resolve, undefined, reject)
      );
  
      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      const object = await new Promise((resolve, reject) =>
        objLoader.load('/eyeball.obj', resolve, undefined, reject)
      );
  
      modelRef.current.add(object);
    };
  
    loadModel();
  }, []);
  
  

  return (
    <group position={[0, 0, 0]} ref={modelRef}>
      <mesh />
    </group>
  );
};

const ModelScene = () => (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: 'black' }}>
    <Canvas
      camera={{ position: [0, 0, 10] }}
      style={{ width: '100%', height: '100%'}}
      backgroundColor={0x000000}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <OrbitControls />
      <Suspense fallback={null}>
        <EyeModel />
      </Suspense>
    </Canvas>
  </div>
);

export default ModelScene;
