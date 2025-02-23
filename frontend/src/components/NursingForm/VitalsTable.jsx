import React, { useState } from 'react';
import CanvasModal from './CanvasModal';

const VitalsTable = ({ vitals, onVitalChange }) => {
  const [canvasModal, setCanvasModal] = useState({
    isOpen: false,
    fieldId: null,
    currentValue: ''
  });

  const vitalSigns = [
    { id: 'temp', label: 'Temp F' },
    { id: 'pulse', label: 'PR/min' },
    { id: 'bp', label: 'BP mmHg' },
    { id: 'rr', label: 'RR/min' },
    { id: 'spo2', label: 'SpO2 %' },
    { id: 'gcs', label: 'GCS (E/V/M)' },
    { id: 'grbs', label: 'GRBS mg/dL' },
    { id: 'output', label: 'Urine Output' },
    { id: 'weight', label: 'Weight (kg)' }
  ];

  const timeSlots = Array.from({ length: 6 }, (_, i) => i + 1);

  const handleInputClick = (fieldId, currentValue) => {
    setCanvasModal({
      isOpen: true,
      fieldId,
      currentValue
    });
  };

  const handleCanvasClose = () => {
    setCanvasModal({
      isOpen: false,
      fieldId: null,
      currentValue: ''
    });
  };

  const handleCanvasSave = (value) => {
    if (canvasModal.fieldId) {
      onVitalChange(canvasModal.fieldId, value);
    }
    handleCanvasClose();
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2 bg-gray-50">Vital Sign</th>
            {timeSlots.map((slot) => (
              <th key={slot} className="border px-4 py-2 bg-gray-50">Time {slot}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {vitalSigns.map((vital) => (
            <tr key={vital.id}>
              <td className="border px-4 py-2 font-medium">{vital.label}</td>
              {timeSlots.map((slot) => (
                <td key={`${vital.id}-${slot}`} className="border px-2 py-1">
                  <input
                    type="text"
                    value={vitals[`${vital.id}-${slot}`] || ''}
                    onClick={() => handleInputClick(`${vital.id}-${slot}`, vitals[`${vital.id}-${slot}`] || '')}
                    readOnly
                    className="w-full p-1 border rounded text-center cursor-pointer hover:bg-gray-50"
                    placeholder="Click to write"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <CanvasModal
        isOpen={canvasModal.isOpen}
        onClose={handleCanvasClose}
        onSave={handleCanvasSave}
        initialValue={canvasModal.currentValue}
      />
    </div>
  );
};

export default VitalsTable;