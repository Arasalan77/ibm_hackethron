import React, { useState } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Tooltip,
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import EditIcon from '@mui/icons-material/Edit';
import MicOffIcon from '@mui/icons-material/MicOff';

function VoiceInput({ 
  label, 
  value, 
  onChange, 
  multiline = false, 
  rows = 1,
  fullWidth = true,
  size = "small",
  required = false
}) {
  const [isListening, setIsListening] = useState(false);
  const [inputMode, setInputMode] = useState('text'); // 'text' or 'voice'

  const handleVoiceInput = () => {
    if (!isListening) {
      setIsListening(true);
      setInputMode('voice');
      
      // Request microphone access and start voice recognition
      if ('webkitSpeechRecognition' in window) {
        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
          
          onChange({ target: { value: transcript } });
        };

        recognition.onerror = (event) => {
          console.error('Speech recognition error', event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
      } else {
        alert('Speech recognition is not supported in this browser.');
        setIsListening(false);
      }
    } else {
      setIsListening(false);
      setInputMode('text');
    }
  };

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', width: fullWidth ? '100%' : 'auto' }}>
      <TextField
        label={label}
        value={value}
        onChange={onChange}
        multiline={multiline}
        rows={rows}
        fullWidth={fullWidth}
        size={size}
        required={required}
        InputProps={{
          sx: { pr: 7 }, // Make room for the icons
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          gap: 0.5,
          pr: 1,
        }}
      >
        <Tooltip title="Text Input">
          <IconButton
            size="small"
            onClick={() => setInputMode('text')}
            color={inputMode === 'text' ? 'primary' : 'default'}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title={isListening ? 'Stop Voice Input' : 'Start Voice Input'}>
          <IconButton
            size="small"
            onClick={handleVoiceInput}
            color={isListening ? 'error' : 'default'}
          >
            {isListening ? <MicOffIcon fontSize="small" /> : <MicIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default VoiceInput;
