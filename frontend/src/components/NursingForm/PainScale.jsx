import React from 'react';

const PainScale = ({ value, onChange }) => {
  const painLevels = [
    { level: 0, label: 'No Pain', emoji: '😊', color: 'bg-green-500' },
    { level: 2, label: 'Mild', emoji: '🙂', color: 'bg-green-300' },
    { level: 4, label: 'Moderate', emoji: '😐', color: 'bg-yellow-400' },
    { level: 6, label: 'Distressing', emoji: '😣', color: 'bg-orange-400' },
    { level: 8, label: 'Intense', emoji: '😫', color: 'bg-red-400' },
    { level: 10, label: 'Unbearable', emoji: '😭', color: 'bg-red-600' }
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between gap-2">
        {painLevels.map((pain) => (
          <button
            key={pain.level}
            onClick={() => onChange(pain.level)}
            className={`flex flex-col items-center p-3 rounded-lg transition-all duration-300 ${
              value === pain.level ? `${pain.color} text-white scale-110` : 'hover:bg-gray-100 border'
            }`}
          >
            <span className="text-2xl mb-1">{pain.emoji}</span>
            <span className="text-sm font-medium">{pain.label}</span>
            <span className="text-xs mt-1">{pain.level}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PainScale;