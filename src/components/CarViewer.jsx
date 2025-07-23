'use client';
import React, { Suspense} from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Backdrop } from '@react-three/drei';

function CarModel() {
    const gltf = useGLTF('/car.glb');
    return (
      <primitive 
        object={gltf.scene} 
        scale={1.5}
        onAdded={(object) => {
          object.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
        }}
      />
    );
};

export default function CarViewer() {
    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <Canvas camera={{ position: [0, 2, 6], fov: 60 }} shadows>
                <ambientLight intensity={0.25} />
                <directionalLight 
                  position={[15, 25, 15]}
                  intensity={4.5}
                  castShadow
                  shadow-mapSize-width={4096}
                  shadow-mapSize-height={4096}
                  shadow-camera-far={200}
                  shadow-camera-left={-35}
                  shadow-camera-right={35}
                  shadow-camera-top={35}
                  shadow-camera-bottom={-35}
                  shadow-bias={-0.0001}
                />
                <pointLight position={[5, 10, -5]} intensity={1.2} color="#ffffff" />
                <Environment preset="studio" />
                <Backdrop color="#f0f0f0" />
                <Suspense fallback={null}>
                  <CarModel castShadow receiveShadow />
                </Suspense>
                <mesh 
                  rotation={[-Math.PI/2, 0, 0]} 
                  position={[0, -1, 0]}
                  receiveShadow
                >
                  <planeGeometry args={[50, 50]} />
                  <shadowMaterial opacity={1} color="#000000" />
                </mesh>
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
            </Canvas>
        </div>
    )
}
