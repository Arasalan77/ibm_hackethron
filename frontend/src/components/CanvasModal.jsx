import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Box,
  CircularProgress,
  Typography,
  Paper,
} from '@mui/material';
import SignatureCanvas from 'react-signature-canvas';
import { Eraser } from 'lucide-react';
import debounce from 'lodash/debounce';


const CANVAS_WIDTH = 800;  // Fixed width for better consistency
const CANVAS_HEIGHT = 400; // Fixed height

const CanvasModal = ({ 
  open, 
  onClose, 
  onSave, 
  initialValue,
  fieldId,
  title = 'Write Input' 
}) => {
  const sigPadRef = useRef(null);
  const [isErasing, setIsErasing] = useState(false);
  const [canvasHistory, setCanvasHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [previewText, setPreviewText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Function to get image data with white background without affecting the original canvas
  const getImageDataWithBackground = () => {
    if (!sigPadRef.current || sigPadRef.current.isEmpty()) return null;

    const originalCanvas = sigPadRef.current.getCanvas();
    
    // Create a new canvas for the white background version
    const newCanvas = document.createElement('canvas');
    newCanvas.width = CANVAS_WIDTH;
    newCanvas.height = CANVAS_HEIGHT;
    const ctx = newCanvas.getContext('2d');
    
    // Fill with white background
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Draw the original canvas content on top
    ctx.drawImage(originalCanvas, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    return newCanvas.toDataURL('image/png', 1.0);
  };

  // Debounced function to handle real-time recognition
  const debouncedRecognize = useCallback(
    debounce(async () => {
      try {
        if (!sigPadRef.current || sigPadRef.current.isEmpty()) return;

        setIsProcessing(true);
        const imageData = getImageDataWithBackground();
        if (!imageData) return;
        console.log("got imageData")

        // Convert base64 to blob
        const response = await fetch(imageData);
        const blob = await response.blob();
        
        // Create form data
        const formData = new FormData();
        formData.append('image', blob, 'handwriting.png');

        // Send to backend
        console.log("sending to backend")
        const backend_url = process.env.BACKEND_URL || 'http://localhost:5001';
        console.log("backend_url:", backend_url);
        const recognitionResponse = await fetch(`${backend_url}/api/handwriting/recognize`, {
          method: 'POST',
          body: formData
        });

        if (!recognitionResponse.ok) {
          throw new Error('Failed to recognize handwriting');
        }

        const result = await recognitionResponse.json();
        setPreviewText(result.text);
      } catch (error) {
        console.error('Error in real-time recognition:', error);
      } finally {
        setIsProcessing(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    if (open && sigPadRef.current) {
      sigPadRef.current.clear();
      setCanvasHistory([]);
      setCurrentStep(-1);
      setPreviewText('');
    }
  }, [open]);

  // Handle real-time updates
  const handleCanvasChange = () => {
    if (sigPadRef.current && !sigPadRef.current.isEmpty()) {
      debouncedRecognize();
    }
  };

  const handleClear = () => {
    if (sigPadRef.current) {
      sigPadRef.current.clear();
      setCanvasHistory([]);
      setCurrentStep(-1);
      setPreviewText('');
    }
  };

  const handleSave = async () => {
    if (sigPadRef.current && !sigPadRef.current.isEmpty()) {
      setIsRecognizing(true);
      try {
        // If we already have recognized text, use it instead of making another API call
        if (previewText) {
          onSave(previewText, fieldId);
          onClose();
          return;
        }

        const imageData = getImageDataWithBackground();
        if (!imageData) return;
        
        // Convert base64 to blob
        const response = await fetch(imageData);
        const blob = await response.blob();
        
        // Create form data
        const formData = new FormData();
        formData.append('image', blob, 'handwriting.png');

        // Send to backend
        // const backend_url = process.env.BACKEND_URL || 'http://localhost:5001';
        const backend_url = 'http://localhost:5001';
        console.log("backend_url:", backend_url);
        const recognitionResponse = await fetch(`${backend_url}/api/handwriting/recognize`, {
          method: 'POST',
          body: formData
        });

        if (!recognitionResponse.ok) {
          throw new Error('Failed to recognize handwriting');
        }

        const result = await recognitionResponse.json();
        console.log("Recognition result:", result);
        onSave(result.text, fieldId);
        onClose();
      } catch (error) {
        console.error('Error recognizing handwriting:', error);
      } finally {
        setIsRecognizing(false);
      }
    }
  };

  const handleEraserToggle = () => {
    setIsErasing(!isErasing);
    if (sigPadRef.current) {
      sigPadRef.current.off();
      if (!isErasing) {
        // Switch to eraser mode
        sigPadRef.current.on();
      }
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          maxWidth: '900px', // Slightly wider than the canvas
        }
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {/* Preview area */}
        <Paper 
          elevation={1} 
          sx={{ 
            p: 2, 
            mb: 2, 
            minHeight: '60px',
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#f5f5f5'
          }}
        >
          {isProcessing ? (
            <Box display="flex" alignItems="center" gap={2}>
              <CircularProgress size={20} />
              <Typography color="text.secondary">Converting handwriting to text...</Typography>
            </Box>
          ) : (
            <Typography>
              {previewText || 'Start writing to see the converted text here...'}
            </Typography>
          )}
        </Paper>

        {/* Canvas area */}
        <Box 
          sx={{ 
            position: 'relative',
            width: `${CANVAS_WIDTH}px`,
            height: `${CANVAS_HEIGHT}px`,
            mx: 'auto', // Center the canvas
            bgcolor: '#fff',
            border: '1px solid #ccc',
            borderRadius: 1,
            overflow: 'hidden'
          }}
        >
          <SignatureCanvas
            ref={sigPadRef}
            // onEnd={handleCanvasChange}
            canvasProps={{
              width: CANVAS_WIDTH,
              height: CANVAS_HEIGHT,
              className: 'signature-canvas',
              style: { 
                width: '100%',
                height: '100%',
                backgroundColor: '#fff'
              }
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <IconButton onClick={handleEraserToggle} color={isErasing ? 'primary' : 'default'}>
          <Eraser />
        </IconButton>
        <Button onClick={handleClear}>Clear</Button>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleSave} 
          variant="contained" 
          disabled={isRecognizing}
        >
          {isRecognizing ? <CircularProgress size={24} /> : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CanvasModal;
