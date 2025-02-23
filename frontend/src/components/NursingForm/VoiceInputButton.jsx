import React, { useState } from 'react';
import { Mic } from 'lucide-react';

const VoiceInputButton = ({ onVoiceInput }) => {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceInput = () => {
    setIsListening(true);
    // Simulated voice input - in production, implement actual voice recognition
    setTimeout(() => {
      setIsListening(false);
      onVoiceInput("Sample voice input");
    }, 2000);
  };

  return (
    <button
      onClick={handleVoiceInput}
      className={`p-1 rounded-full transition-all duration-300 ${
        isListening ? 'bg-blue-100 animate-pulse' : 'hover:bg-gray-100'
      }`}
    >
      <Mic className="w-4 h-4 text-gray-600" />
    </button>
  );
};

export default VoiceInputButton;