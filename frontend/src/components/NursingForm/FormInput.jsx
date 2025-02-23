import React from 'react';
import { Mic, Pencil } from 'lucide-react';

const FormInput = ({
  label,
  value,
  onChange,
  onVoiceInput,
  onOpenCanvas,
  type = 'text',
  className = '',
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && <label className="mb-1 font-medium text-sm">{label}</label>}
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2 pr-16 border rounded"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
          <button
            onClick={onVoiceInput}
            className="p-1 rounded-full hover:bg-gray-100 transition-all duration-300"
          >
            <Mic className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={onOpenCanvas}
            className="p-1 rounded-full hover:bg-gray-100 transition-all duration-300"
          >
            <Pencil className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormInput;