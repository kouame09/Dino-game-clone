import React from 'react';

interface CactusProps {
  position: number;
}

export const Cactus: React.FC<CactusProps> = ({ position }) => {
  return (
    <div
      className="absolute bottom-0 w-8 h-16 bg-green-600"
      style={{ left: `${position}px` }}
    />
  );
};