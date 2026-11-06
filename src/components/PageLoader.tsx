import React from 'react';
import ApertureLoader from './ApertureLoader';

export default function PageLoader() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050505] text-neutral-400 select-none">
      <ApertureLoader label="Loading Studio..." size="lg" />
    </div>
  );
}
