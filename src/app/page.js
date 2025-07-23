import Image from "next/image";
import dynamic from "next/dynamic";

import CarViewer from '@/components/CarViewer';

export default function Home() {
  return (
    <main>
      <h1 style={{ textAlign: 'center', fontSize: '48px' }}>3D Car Viewer</h1>
      <CarViewer />
    </main>
  );
}
