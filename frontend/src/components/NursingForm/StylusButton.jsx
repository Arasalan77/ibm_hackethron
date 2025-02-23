import React from 'react';
import { Pencil } from 'lucide-react';

const StylusButton = ({ onOpenCanvas }) => {
  return (
    <button
      onClick={onOpenCanvas}
      className="p-1 rounded-full hover:bg-gray-100 transition-all duration-300"
    >
      <Pencil className="w-4 h-4 text-gray-600" />
    </button>
  );
};

export default StylusButton;