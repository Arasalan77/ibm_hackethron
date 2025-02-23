import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const CanvasModal = ({ isOpen, onClose, onSave, initialValue }) => {
  const sigPadRef = useRef(null);

  if (!isOpen) return null;

  const handleSave = () => {
    if (sigPadRef.current) {
      // Get the signature as base64 image data
      const signatureData = sigPadRef.current.getTrimmedCanvas().toDataURL('image/png');
      onSave(signatureData);
    }
  };

  const handleClear = () => {
    if (sigPadRef.current) {
      sigPadRef.current.clear();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white p-4 rounded-lg shadow-lg w-[90vw] max-w-2xl">
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold">Write Input</h3>
          <button
            onClick={handleClear}
            className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200 transition-colors"
          >
            Clear
          </button>
        </div>
        <div className="border border-gray-300 rounded">
          <SignatureCanvas
            ref={sigPadRef}
            canvasProps={{
              width: window.innerWidth > 768 ? 700 : window.innerWidth - 64,
              height: 400,
              className: 'signature-canvas'
            }}
            backgroundColor="white"
            penColor="black"
          />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CanvasModal;