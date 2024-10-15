import React from 'react';

interface DinoProps {
  isJumping: boolean;
}

export const Dino: React.FC<DinoProps> = ({ isJumping }) => {
  return (
    <div
      className={`absolute left-10 bottom-0 w-16 h-16 bg-gray-800 transition-all duration-500 ${
        isJumping ? 'transform translate-y-[-100px]' : ''
      }`}
      style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' }}
    />
  );
};