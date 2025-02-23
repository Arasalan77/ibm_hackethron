// import React, { useState,useImperativeHandle, forwardRef } from 'react';
// import {
//   Box,
//   Typography,
//   TextField,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormControl,
//   FormLabel,
//   Checkbox,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
// } from '@mui/material';
// import { Mic, Pencil } from 'lucide-react';
// import CanvasModal from '../../components/CanvasModal';

// const VitalsTable = ({ onFieldClick, fieldValues }) => {
//   const vitalSigns = [
//     { label: 'Temp F', key: 'temp' },
//     { label: 'PR/min', key: 'pr' },
//     { label: 'BP mmHg', key: 'bp' },
//     { label: 'RR/min', key: 'rr' },
//     { label: 'SpO2 %', key: 'spo2' },
//     { label: 'GCS (E/V/M)', key: 'gcs' },
//     { label: 'GRBS mg/dL', key: 'grbs' },
//     { label: 'Urine Output', key: 'urine' },
//     { label: 'Weight (kg)', key: 'weight' }
//   ];

//   return (
//     <TableContainer component={Paper} variant="outlined">
//       <Table size="small">
//         <TableHead>
//           <TableRow>
//             <TableCell>Vital Sign</TableCell>
//             {[1, 2, 3, 4, 5, 6].map((time) => (
//               <TableCell key={time}>Time {time}</TableCell>
//             ))}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {vitalSigns.map((vital) => (
//             <TableRow key={vital.key}>
//               <TableCell>{vital.label}</TableCell>
//               {[1, 2, 3, 4, 5, 6].map((time) => {
//                 const fieldId = `vitals_${vital.key}_time${time}`;
//                 return (
//                   <TableCell key={time}>
//                     <TextField
//                       variant="standard"
//                       placeholder="Click to write"
//                       size="small"
//                       fullWidth
//                       value={fieldValues[fieldId] || ''}
//                       onClick={() => onFieldClick(fieldId, vital.label + ' - Time ' + time)}
//                       InputProps={{
//                         readOnly: true,
//                       }}
//                     />
//                   </TableCell>
//                 );
//               })}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// const PainScale = () => {
//   const painLevels = [
//     { emoji: '😊', label: 'No Pain', score: '0' },
//     { emoji: '🙂', label: 'Mild', score: '2' },
//     { emoji: '😐', label: 'Moderate', score: '4' },
//     { emoji: '😟', label: 'Distressing', score: '6' },
//     { emoji: '😣', label: 'Intense', score: '8' },
//     { emoji: '😫', label: 'Unbearable', score: '10' }
//   ];

//   return (
//     <Box sx={{ mt: 2 }}>
//       <Typography variant="subtitle1" fontWeight="bold">Pain Assessment</Typography>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
//         {painLevels.map((level) => (
//           <Box key={level.label} sx={{ textAlign: 'center' }}>
//             <Typography variant="h4">{level.emoji}</Typography>
//             <Typography variant="body2">{level.label}</Typography>
//             <Typography variant="caption">{level.score}</Typography>
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// const NursingInitialAssessment = forwardRef((props, ref) => {
//   const [isCanvasOpen, setIsCanvasOpen] = useState(false);
//   const [currentField, setCurrentField] = useState(null);
//   const [fieldValues, setFieldValues] = useState({});
//   const [isProcessing, setIsProcessing] = useState(false);


//   // Add form state
//   const [formData, setFormData] = useState({
//     modeOfArrival: '',
//     valuables: '',
//     restraints: '',
//     religion: '',
//     culturalBarriers: '',
//     sourceOfHistory: {
//       patient: false,
//       other: false
//     }
//   });


//   const handleFieldClick = (fieldId, label) => {
//     setCurrentField({ id: fieldId, label });
//     setIsCanvasOpen(true);
//   };

//   const handleCanvasClose = () => {
//     setIsCanvasOpen(false);
//     setCurrentField(null);
//     console.log("in handleCanvasClose()")
//   };

//   const handleCanvasSave = async (recognizedText, fieldId) => {
//     console.log("in handleCanvasSave(), fieldId:", fieldId, "recognizedText:", recognizedText);
//     if (!fieldId) return;
    
//     try {
//       // Update the field value with the recognized text
//       setFieldValues(prev => ({
//         ...prev,
//         [fieldId]: recognizedText
//       }));
      
//       handleCanvasClose();
//     } catch (error) {
//       console.error('Error handling canvas save:', error);
//     } finally {
//       setIsProcessing(false);
//     }
//   };


//   const handleRadioChange = (event) => {
//     const { name, value } = event.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleCheckboxChange = (event) => {
//     const { name, checked } = event.target;
//     setFormData(prev => ({
//       ...prev,
//       sourceOfHistory: {
//         ...prev.sourceOfHistory,
//         [name]: checked
//       }
//     }));
//   };

//   const handleSubmit = async () => {
//     // Combine all form data
//     const completeFormData = {
//       // General Information
//       ...formData,
      
//       // Canvas/Text Fields
//       ...fieldValues,
      
//       // Metadata
//       submittedAt: new Date().toISOString(),
      
//       // You can add any additional metadata or structured data here
//       formVersion: '1.0',
//       formType: 'nursing-initial-assessment'
//     };

//     const renderTextField = (id, label, props = {}) => (
//       <TextField
//         {...props}
//         value={fieldValues[id] || ''}
//         onClick={() => handleFieldClick(id, label)}
//         InputProps={{
//           readOnly: true,
//           ...props.InputProps,
//         }}
//       />
//     );
  
//     // Expose a method to get the form data, including canvas data (base64)
//     useImperativeHandle(ref, () => ({
//       getFormData: () => {
//         return {
//           formType: 'nursing-initial-assessment',
//           generalInformation: {
//             modeOfArrival: formData.modeOfArrival,
//             valuables: formData.valuables,
//             restraints: formData.restraints,
//             religion: formData.religion,
//             culturalBarriers: formData.culturalBarriers,
//             sourceOfHistory: formData.sourceOfHistory,
//           },
//           dateAndTime: {
//             dateOfArrival: fieldValues['dateOfArrival'] || '',
//             timeOfArrival: fieldValues['timeOfArrival'] || '',
//             assessmentStartTime: fieldValues['assessmentStartTime'] || ''
//           },
//           patientHistory: {
//             initialTriageLevel: fieldValues['initialTriageLevel'] || '',
//             relationship: fieldValues['relationship'] || '',
//             patientComplaints: fieldValues['patientComplaints'] || '',
//           },
//           vitals: Object.keys(fieldValues)
//             .filter(key => key.startsWith('vitals_'))
//             .reduce((acc, key) => ({ ...acc, [key]: fieldValues[key] }), {}),
//           submittedAt: new Date().toISOString(),
//         };
//       }
//     }));


//     try {
//       // Send to your backend
//       const response = await fetch('/api/nursing-assessment', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(completeFormData)
//       });

//       if (!response.ok) {
//         throw new Error('Failed to submit form');
//       }

//       // Handle successful submission
//       console.log('Form submitted successfully');
      
//       // You might want to clear the form or redirect
//       // resetForm();
//       // or
//       // navigate('/success');
      
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       // Handle error (show error message to user, etc.)
//     }
//   };


//   const renderTextField = (id, label, props = {}) => (
//     <TextField
//       {...props}
//       value={fieldValues[id] || ''}
//       onClick={() => handleFieldClick(id, label)}
//       InputProps={{
//         readOnly: true,
//         ...props.InputProps,
//       }}
//     />
//   );



//   return (
//     <Box sx={{ p: 3 }}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
//         <Typography variant="h5">Nursing Initial Assessment</Typography>
//       </Box>

//       <Box sx={{ mb: 3 }}>
//         {renderTextField('dateOfArrival', 'Date of Arrival', {
//           label: "Date of Arrival",
//           fullWidth: true,
//           sx: { mb: 2 }
//         })}
        
//         {renderTextField('timeOfArrival', 'Time of Arrival', {
//           label: "Time of Arrival",
//           fullWidth: true,
//           sx: { mb: 2 }
//         })}
        
//         {renderTextField('initialTriageLevel', 'Initial Triage Level', {
//           label: "Initial Triage Level",
//           fullWidth: true
//         })}
//       </Box>

//       <Box sx={{ mb: 3 }}>
//         <Typography variant="subtitle1" fontWeight="bold">General Information</Typography>
        
//         <FormControl component="fieldset" sx={{ mt: 2 }}>
//           <FormLabel>Mode of Arrival</FormLabel>
//           <RadioGroup row name="modeOfArrival" value={formData.modeOfArrival} onChange={handleRadioChange}>
//             <FormControlLabel value="walking" control={<Radio />} label="Walking" />
//             <FormControlLabel value="wheelchair" control={<Radio />} label="Wheelchair" />
//             <FormControlLabel value="stretcher" control={<Radio />} label="Stretcher" />
//           </RadioGroup>
//         </FormControl>

//         <FormControl component="fieldset" sx={{ mt: 2 }}>
//           <FormLabel>Valuables</FormLabel>
//           <RadioGroup row>
//             <FormControlLabel value="belongings" control={<Radio />} label="Belongings" />
//             <FormControlLabel value="documents" control={<Radio />} label="Documents" />
//             <FormControlLabel value="none" control={<Radio />} label="None" />
//             <FormControlLabel value="handover" control={<Radio />} label="Hand over to attendant" />
//           </RadioGroup>
//         </FormControl>

//         <FormControl component="fieldset" sx={{ mt: 2 }}>
//           <FormLabel>Restraints</FormLabel>
//           <RadioGroup row>
//             <FormControlLabel value="yes" control={<Radio />} label="Yes" />
//             <FormControlLabel value="no" control={<Radio />} label="No" />
//           </RadioGroup>
//         </FormControl>
//       </Box>

//       <Box sx={{ mb: 3 }}>
//         <FormControl component="fieldset">
//           <FormLabel>Religion</FormLabel>
//           <RadioGroup row>
//             <FormControlLabel value="hindu" control={<Radio />} label="Hindu" />
//             <FormControlLabel value="muslim" control={<Radio />} label="Muslim" />
//             <FormControlLabel value="christian" control={<Radio />} label="Christian" />
//             <FormControlLabel value="sikh" control={<Radio />} label="Sikh" />
//             <FormControlLabel value="others" control={<Radio />} label="Others" />
//           </RadioGroup>
//         </FormControl>

//         <FormControl component="fieldset" sx={{ mt: 2 }}>
//           <FormLabel>Cultural or Religious Barriers</FormLabel>
//           <RadioGroup row>
//             <FormControlLabel value="yes" control={<Radio />} label="Yes" />
//             <FormControlLabel value="no" control={<Radio />} label="No" />
//           </RadioGroup>
//         </FormControl>
//       </Box>

//       <Box sx={{ mb: 3 }}>
//         <Typography variant="subtitle1" fontWeight="bold">Source of History</Typography>
//         <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
//           <FormControlLabel control={<Checkbox />} label="Patient" />
//           <FormControlLabel control={<Checkbox />} label="Other" />
//         </Box>
//         {renderTextField('relationship', 'Relationship', {
//           label: "Relationship",
//           fullWidth: true,
//           sx: { mt: 1 }
//         })}
//       </Box>

//       <Box sx={{ mb: 3 }}>
//         {renderTextField('assessmentStartTime', 'Assessment Start Time', {
//           label: "Assessment Start Time",
//           fullWidth: true
//         })}
//       </Box>

//       <Box sx={{ mb: 3 }}>
//         <Typography variant="subtitle1" fontWeight="bold">Patient's Complaints & History</Typography>
//         {renderTextField('patientComplaints', "Patient's Complaints & History", {
//           multiline: true,
//           rows: 4,
//           fullWidth: true,
//           placeholder: "Enter patient's complaints and history...",
//           sx: { mt: 1 }
//         })}
//       </Box>

//       <Box sx={{ mb: 3 }}>
//         <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>Vitals/Time</Typography>
//         <VitalsTable onFieldClick={handleFieldClick} fieldValues={fieldValues} />
//       </Box>

//       <PainScale />

//       <CanvasModal 
//         open={isCanvasOpen}
//         onClose={handleCanvasClose}
//         onSave={(recognizedText) => handleCanvasSave(recognizedText, currentField?.id)}
//         title={currentField?.label || ''}
//         processing={isProcessing}
//       />
//     </Box>
//   );
// });

// export default NursingInitialAssessment;



























// NursingInitialAssessment.jsx
// import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
// import {
//   Box,
//   Typography,
//   TextField,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormControl,
//   FormLabel,
//   Checkbox,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button
// } from '@mui/material';
// import SignatureCanvas from 'react-signature-canvas';

// // VitalsTable renders vital sign fields
// const VitalsTable = ({ onFieldClick, fieldValues }) => {
//   const vitalSigns = [
//     { label: 'Temp F', key: 'temp' },
//     { label: 'PR/min', key: 'pr' },
//     { label: 'BP mmHg', key: 'bp' },
//     { label: 'RR/min', key: 'rr' },
//     { label: 'SpO2 %', key: 'spo2' },
//     { label: 'GCS (E/V/M)', key: 'gcs' },
//     { label: 'GRBS mg/dL', key: 'grbs' },
//     { label: 'Urine Output', key: 'urine' },
//     { label: 'Weight (kg)', key: 'weight' }
//   ];

//   return (
//     <TableContainer component={Paper} variant="outlined">
//       <Table size="small">
//         <TableHead>
//           <TableRow>
//             <TableCell>Vital Sign</TableCell>
//             {[1, 2, 3, 4, 5, 6].map((time) => (
//               <TableCell key={time}>Time {time}</TableCell>
//             ))}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {vitalSigns.map((vital) => (
//             <TableRow key={vital.key}>
//               <TableCell>{vital.label}</TableCell>
//               {[1, 2, 3, 4, 5, 6].map((time) => {
//                 const fieldId = `vitals_${vital.key}_time${time}`;
//                 return (
//                   <TableCell key={time}>
//                     <TextField
//                       variant="standard"
//                       placeholder="Click to write"
//                       size="small"
//                       fullWidth
//                       value={fieldValues[fieldId] || ''}
//                       onClick={() => onFieldClick(fieldId, `${vital.label} - Time ${time}`)}
//                       InputProps={{
//                         readOnly: true,
//                       }}
//                     />
//                   </TableCell>
//                 );
//               })}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// const PainScale = () => {
//   const painLevels = [
//     { emoji: '😊', label: 'No Pain', score: '0' },
//     { emoji: '🙂', label: 'Mild', score: '2' },
//     { emoji: '😐', label: 'Moderate', score: '4' },
//     { emoji: '😟', label: 'Distressing', score: '6' },
//     { emoji: '😣', label: 'Intense', score: '8' },
//     { emoji: '😫', label: 'Unbearable', score: '10' }
//   ];

//   return (
//     <Box sx={{ mt: 2 }}>
//       <Typography variant="subtitle1" fontWeight="bold">Pain Assessment</Typography>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
//         {painLevels.map((level) => (
//           <Box key={level.label} sx={{ textAlign: 'center' }}>
//             <Typography variant="h4">{level.emoji}</Typography>
//             <Typography variant="body2">{level.label}</Typography>
//             <Typography variant="caption">{level.score}</Typography>
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// const NursingInitialAssessment = forwardRef((props, ref) => {
//   const [fieldValues, setFieldValues] = useState({});
//   const [formData, setFormData] = useState({
//     modeOfArrival: '',
//     valuables: '',
//     restraints: '',
//     religion: '',
//     culturalBarriers: '',
//     sourceOfHistory: {
//       patient: false,
//       other: false
//     }
//   });

//   // Ref for the signature canvas (react-signature-canvas)
//   const sigCanvasRef = useRef(null);

//   // Instead of using a canvas modal, we prompt for field input directly.
//   const handleFieldClick = (fieldId, label) => {
//     const inputValue = prompt(`Enter value for ${label}:`);
//     setFieldValues(prev => ({
//       ...prev,
//       [fieldId]: inputValue || ''
//     }));
//   };

//   const handleRadioChange = (event) => {
//     const { name, value } = event.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleCheckboxChange = (event) => {
//     const { name, checked } = event.target;
//     setFormData(prev => ({
//       ...prev,
//       sourceOfHistory: {
//         ...prev.sourceOfHistory,
//         [name]: checked
//       }
//     }));
//   };

//   const renderTextField = (id, label, additionalProps = {}) => (
//     <TextField
//       {...additionalProps}
//       value={fieldValues[id] || ''}
//       onClick={() => handleFieldClick(id, label)}
//       InputProps={{
//         readOnly: true,
//         ...additionalProps.InputProps,
//       }}
//     />
//   );

//   // Expose a method to get the complete form data (including signature canvas data)
//   useImperativeHandle(ref, () => ({
//     getFormData: () => ({
//       formType: 'nursing-initial-assessment',
//       generalInformation: {
//         modeOfArrival: formData.modeOfArrival,
//         valuables: formData.valuables,
//         restraints: formData.restraints,
//         religion: formData.religion,
//         culturalBarriers: formData.culturalBarriers,
//         sourceOfHistory: formData.sourceOfHistory,
//       },
//       dateAndTime: {
//         dateOfArrival: fieldValues['dateOfArrival'] || '',
//         timeOfArrival: fieldValues['timeOfArrival'] || '',
//         assessmentStartTime: fieldValues['assessmentStartTime'] || ''
//       },
//       patientHistory: {
//         initialTriageLevel: fieldValues['initialTriageLevel'] || '',
//         relationship: fieldValues['relationship'] || '',
//         patientComplaints: fieldValues['patientComplaints'] || '',
//       },
//       vitals: Object.keys(fieldValues)
//         .filter(key => key.startsWith('vitals_'))
//         .reduce((acc, key) => ({ ...acc, [key]: fieldValues[key] }), {}),
//       // Get the signature canvas data as a base64 string
//       signature: sigCanvasRef.current ? sigCanvasRef.current.toDataURL() : '',
//       submittedAt: new Date().toISOString(),
//     })
//   }));

//   return (
//     <Box sx={{ p: 3 }}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
//         <Typography variant="h5">Nursing Initial Assessment</Typography>
//       </Box>

//       <Box sx={{ mb: 3 }}>
//         {renderTextField('dateOfArrival', 'Date of Arrival', {
//           label: "Date of Arrival",
//           fullWidth: true,
//           sx: { mb: 2 }
//         })}
//         {renderTextField('timeOfArrival', 'Time of Arrival', {
//           label: "Time of Arrival",
//           fullWidth: true,
//           sx: { mb: 2 }
//         })}
//         {renderTextField('initialTriageLevel', 'Initial Triage Level', {
//           label: "Initial Triage Level",
//           fullWidth: true
//         })}
//       </Box>

//       <Box sx={{ mb: 3 }}>
//         <Typography variant="subtitle1" fontWeight="bold">General Information</Typography>
//         <FormControl component="fieldset" sx={{ mt: 2 }}>
//           <FormLabel>Mode of Arrival</FormLabel>
//           <RadioGroup row name="modeOfArrival" value={formData.modeOfArrival} onChange={handleRadioChange}>
//             <FormControlLabel value="walking" control={<Radio />} label="Walking" />
//             <FormControlLabel value="wheelchair" control={<Radio />} label="Wheelchair" />
//             <FormControlLabel value="stretcher" control={<Radio />} label="Stretcher" />
//           </RadioGroup>
//         </FormControl>

//         <FormControl component="fieldset" sx={{ mt: 2 }}>
//           <FormLabel>Valuables</FormLabel>
//           <RadioGroup row name="valuables" value={formData.valuables} onChange={handleRadioChange}>
//             <FormControlLabel value="belongings" control={<Radio />} label="Belongings" />
//             <FormControlLabel value="documents" control={<Radio />} label="Documents" />
//             <FormControlLabel value="none" control={<Radio />} label="None" />
//             <FormControlLabel value="handover" control={<Radio />} label="Hand over to attendant" />
//           </RadioGroup>
//         </FormControl>

//         <FormControl component="fieldset" sx={{ mt: 2 }}>
//           <FormLabel>Restraints</FormLabel>
//           <RadioGroup row name="restraints" value={formData.restraints} onChange={handleRadioChange}>
//             <FormControlLabel value="yes" control={<Radio />} label="Yes" />
//             <FormControlLabel value="no" control={<Radio />} label="No" />
//           </RadioGroup>
//         </FormControl>
//       </Box>

//       <Box sx={{ mb: 3 }}>
//         <FormControl component="fieldset">
//           <FormLabel>Religion</FormLabel>
//           <RadioGroup row name="religion" value={formData.religion} onChange={handleRadioChange}>
//             <FormControlLabel value="hindu" control={<Radio />} label="Hindu" />
//             <FormControlLabel value="muslim" control={<Radio />} label="Muslim" />
//             <FormControlLabel value="christian" control={<Radio />} label="Christian" />
//             <FormControlLabel value="sikh" control={<Radio />} label="Sikh" />
//             <FormControlLabel value="others" control={<Radio />} label="Others" />
//           </RadioGroup>
//         </FormControl>

//         <FormControl component="fieldset" sx={{ mt: 2 }}>
//           <FormLabel>Cultural or Religious Barriers</FormLabel>
//           <RadioGroup row name="culturalBarriers" value={formData.culturalBarriers} onChange={handleRadioChange}>
//             <FormControlLabel value="yes" control={<Radio />} label="Yes" />
//             <FormControlLabel value="no" control={<Radio />} label="No" />
//           </RadioGroup>
//         </FormControl>
//       </Box>

//       <Box sx={{ mb: 3 }}>
//         <Typography variant="subtitle1" fontWeight="bold">Source of History</Typography>
//         <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
//           <FormControlLabel 
//             control={<Checkbox checked={formData.sourceOfHistory.patient} onChange={handleCheckboxChange} name="patient" />} 
//             label="Patient" 
//           />
//           <FormControlLabel 
//             control={<Checkbox checked={formData.sourceOfHistory.other} onChange={handleCheckboxChange} name="other" />} 
//             label="Other" 
//           />
//         </Box>
//         {renderTextField('relationship', 'Relationship', {
//           label: "Relationship",
//           fullWidth: true,
//           sx: { mt: 1 }
//         })}
//       </Box>

//       <Box sx={{ mb: 3 }}>
//         {renderTextField('assessmentStartTime', 'Assessment Start Time', {
//           label: "Assessment Start Time",
//           fullWidth: true
//         })}
//       </Box>

//       <Box sx={{ mb: 3 }}>
//         <Typography variant="subtitle1" fontWeight="bold">Patient's Complaints & History</Typography>
//         {renderTextField('patientComplaints', "Patient's Complaints & History", {
//           multiline: true,
//           rows: 4,
//           fullWidth: true,
//           placeholder: "Enter patient's complaints and history...",
//           sx: { mt: 1 }
//         })}
//       </Box>

//       <Box sx={{ mb: 3 }}>
//         <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>Vitals/Time</Typography>
//         <VitalsTable onFieldClick={handleFieldClick} fieldValues={fieldValues} />
//       </Box>

//       <PainScale />

//       {/* Signature Canvas Section */}
//       <Box sx={{ mb: 3, mt: 3 }}>
//         <Typography variant="subtitle1" fontWeight="bold">Signature</Typography>
//         <SignatureCanvas
//           ref={sigCanvasRef}
//           canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
//           backgroundColor="#f0f0f0"
//         />
//         <Button variant="outlined" onClick={() => sigCanvasRef.current && sigCanvasRef.current.clear()} sx={{ mt: 1 }}>
//           Clear Signature
//         </Button>
//       </Box>
//     </Box>
//   );
// });

// export default NursingInitialAssessment;

























// NursingInitialAssessment.jsx
import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@mui/material';
import SignatureCanvas from 'react-signature-canvas';

// VitalsTable renders a table of vital sign input fields
const VitalsTable = ({ onFieldChange, fieldValues }) => {
  const vitalSigns = [
    { label: 'Temp F', key: 'temp' },
    { label: 'PR/min', key: 'pr' },
    { label: 'BP mmHg', key: 'bp' },
    { label: 'RR/min', key: 'rr' },
    { label: 'SpO2 %', key: 'spo2' },
    { label: 'GCS (E/V/M)', key: 'gcs' },
    { label: 'GRBS mg/dL', key: 'grbs' },
    { label: 'Urine Output', key: 'urine' },
    { label: 'Weight (kg)', key: 'weight' }
  ];

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Vital Sign</TableCell>
            {[1, 2, 3, 4, 5, 6].map((time) => (
              <TableCell key={time}>Time {time}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {vitalSigns.map((vital) => (
            <TableRow key={vital.key}>
              <TableCell>{vital.label}</TableCell>
              {[1, 2, 3, 4, 5, 6].map((time) => {
                const fieldId = `vitals_${vital.key}_time${time}`;
                return (
                  <TableCell key={time}>
                    <TextField
                      variant="standard"
                      placeholder="Enter value"
                      size="small"
                      fullWidth
                      value={fieldValues[fieldId] || ''}
                      onChange={(e) => onFieldChange(fieldId, e.target.value)}
                    />
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const PainScale = () => {
  const painLevels = [
    { emoji: '😊', label: 'No Pain', score: '0' },
    { emoji: '🙂', label: 'Mild', score: '2' },
    { emoji: '😐', label: 'Moderate', score: '4' },
    { emoji: '😟', label: 'Distressing', score: '6' },
    { emoji: '😣', label: 'Intense', score: '8' },
    { emoji: '😫', label: 'Unbearable', score: '10' }
  ];

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" fontWeight="bold">Pain Assessment</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
        {painLevels.map((level) => (
          <Box key={level.label} sx={{ textAlign: 'center' }}>
            <Typography variant="h4">{level.emoji}</Typography>
            <Typography variant="body2">{level.label}</Typography>
            <Typography variant="caption">{level.score}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const NursingInitialAssessment = forwardRef((props, ref) => {
  // State for standard input fields
  const [fieldValues, setFieldValues] = useState({
    dateOfArrival: '',
    timeOfArrival: '',
    initialTriageLevel: '',
    relationship: '',
    assessmentStartTime: '',
    // Other fields (including vitals) will be stored here
  });

  // State for radio groups and checkboxes
  const [formData, setFormData] = useState({
    modeOfArrival: '',
    valuables: '',
    restraints: '',
    religion: '',
    culturalBarriers: '',
    sourceOfHistory: {
      patient: false,
      other: false
    }
  });

  // Refs for canvas fields
  const sigCanvasRef = useRef(null);           // for signature
  const complaintsCanvasRef = useRef(null);      // for Patient's Complaints & History

  // Handler for text field changes
  const handleInputChange = (fieldId, value) => {
    setFieldValues(prev => ({ ...prev, [fieldId]: value }));
  };

  // Handlers for radio/checkbox groups
  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData(prev => ({
      ...prev,
      sourceOfHistory: {
        ...prev.sourceOfHistory,
        [name]: checked
      }
    }));
  };

  // Helper to render a standard input field with onChange
  const renderInputField = (id, label, additionalProps = {}) => (
    <TextField
      {...additionalProps}
      label={label}
      value={fieldValues[id] || ''}
      onChange={(e) => handleInputChange(id, e.target.value)}
    />
  );

  // Expose a method to get the complete form data (including canvas data converted to base64)
  useImperativeHandle(ref, () => ({
    getFormData: () => ({
      formType: 'nursing-initial-assessment',
      generalInformation: {
        modeOfArrival: formData.modeOfArrival,
        valuables: formData.valuables,
        restraints: formData.restraints,
        religion: formData.religion,
        culturalBarriers: formData.culturalBarriers,
        sourceOfHistory: formData.sourceOfHistory,
      },
      dateAndTime: {
        dateOfArrival: fieldValues['dateOfArrival'] || '',
        timeOfArrival: fieldValues['timeOfArrival'] || '',
        assessmentStartTime: fieldValues['assessmentStartTime'] || ''
      },
      patientHistory: {
        initialTriageLevel: fieldValues['initialTriageLevel'] || '',
        relationship: fieldValues['relationship'] || '',
        // Get the Patient's Complaints & History canvas data as a base64 string
        patientComplaints: complaintsCanvasRef.current ? complaintsCanvasRef.current.toDataURL() : '',
      },
      vitals: Object.keys(fieldValues)
        .filter(key => key.startsWith('vitals_'))
        .reduce((acc, key) => ({ ...acc, [key]: fieldValues[key] }), {}),
      // Get the signature canvas data as a base64 string
      signature: sigCanvasRef.current ? sigCanvasRef.current.toDataURL() : '',
      submittedAt: new Date().toISOString(),
    })
  }));

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h5">Nursing Initial Assessment</Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        {renderInputField('dateOfArrival', "Date of Arrival", { fullWidth: true, sx: { mb: 2 } })}
        {renderInputField('timeOfArrival', "Time of Arrival", { fullWidth: true, sx: { mb: 2 } })}
        {renderInputField('initialTriageLevel', "Initial Triage Level", { fullWidth: true })}
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold">General Information</Typography>
        <FormControl component="fieldset" sx={{ mt: 2 }}>
          <FormLabel>Mode of Arrival</FormLabel>
          <RadioGroup row name="modeOfArrival" value={formData.modeOfArrival} onChange={handleRadioChange}>
            <FormControlLabel value="walking" control={<Radio />} label="Walking" />
            <FormControlLabel value="wheelchair" control={<Radio />} label="Wheelchair" />
            <FormControlLabel value="stretcher" control={<Radio />} label="Stretcher" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" sx={{ mt: 2 }}>
          <FormLabel>Valuables</FormLabel>
          <RadioGroup row name="valuables" value={formData.valuables} onChange={handleRadioChange}>
            <FormControlLabel value="belongings" control={<Radio />} label="Belongings" />
            <FormControlLabel value="documents" control={<Radio />} label="Documents" />
            <FormControlLabel value="none" control={<Radio />} label="None" />
            <FormControlLabel value="handover" control={<Radio />} label="Hand over to attendant" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" sx={{ mt: 2 }}>
          <FormLabel>Restraints</FormLabel>
          <RadioGroup row name="restraints" value={formData.restraints} onChange={handleRadioChange}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Box>

      <Box sx={{ mb: 3 }}>
        <FormControl component="fieldset">
          <FormLabel>Religion</FormLabel>
          <RadioGroup row name="religion" value={formData.religion} onChange={handleRadioChange}>
            <FormControlLabel value="hindu" control={<Radio />} label="Hindu" />
            <FormControlLabel value="muslim" control={<Radio />} label="Muslim" />
            <FormControlLabel value="christian" control={<Radio />} label="Christian" />
            <FormControlLabel value="sikh" control={<Radio />} label="Sikh" />
            <FormControlLabel value="others" control={<Radio />} label="Others" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" sx={{ mt: 2 }}>
          <FormLabel>Cultural or Religious Barriers</FormLabel>
          <RadioGroup row name="culturalBarriers" value={formData.culturalBarriers} onChange={handleRadioChange}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold">Source of History</Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
          <FormControlLabel 
            control={<Checkbox checked={formData.sourceOfHistory.patient} onChange={handleCheckboxChange} name="patient" />} 
            label="Patient" 
          />
          <FormControlLabel 
            control={<Checkbox checked={formData.sourceOfHistory.other} onChange={handleCheckboxChange} name="other" />} 
            label="Other" 
          />
        </Box>
        {renderInputField('relationship', "Relationship", { fullWidth: true, sx: { mt: 1 } })}
      </Box>

      <Box sx={{ mb: 3 }}>
        {renderInputField('assessmentStartTime', "Assessment Start Time", { fullWidth: true })}
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold">Patient's Complaints & History</Typography>
        {/* Use a canvas field for larger text input */}
        <SignatureCanvas
          ref={complaintsCanvasRef}
          canvasProps={{ width: 500, height: 200, className: 'complaintsCanvas' }}
          backgroundColor="#fff"
        />
        <Button variant="outlined" onClick={() => complaintsCanvasRef.current && complaintsCanvasRef.current.clear()} sx={{ mt: 1 }}>
          Clear Complaints
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>Vitals/Time</Typography>
        <VitalsTable onFieldChange={handleInputChange} fieldValues={fieldValues} />
      </Box>

      <PainScale />

      {/* Signature canvas section */}
      <Box sx={{ mb: 3, mt: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold">Signature</Typography>
        <SignatureCanvas
          ref={sigCanvasRef}
          canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
          backgroundColor="#f0f0f0"
        />
        <Button variant="outlined" onClick={() => sigCanvasRef.current && sigCanvasRef.current.clear()} sx={{ mt: 1 }}>
          Clear Signature
        </Button>
      </Box>
    </Box>
  );
});

export default NursingInitialAssessment;






