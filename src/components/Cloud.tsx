import React from 'react';

export const Cloud: React.FC = () => {
  return (
    <div className="absolute top-10 right-20 w-20 h-8 bg-white rounded-full">
      <div className="absolute top-4 left-4 w-10 h-6 bg-white rounded-full" />
      <div className="absolute top-2 right-2 w-8 h-6 bg-white rounded-full" />
    </div>
  );
};