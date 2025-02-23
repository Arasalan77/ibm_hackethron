import React from 'react';

const Header = () => {
  return (
    <div className="flex justify-between items-center mb-6 p-4 border-b">
      <div className="flex items-center gap-4">
        <img src="/wellness-logo.png" alt="Wellness Logo" className="h-12" />
        <div className="w-24 h-12 border-2 border-gray-300"></div>
      </div>
      <h1 className="text-2xl font-bold">Nursing Initial Assessment</h1>
    </div>
  );
};

export default Header;