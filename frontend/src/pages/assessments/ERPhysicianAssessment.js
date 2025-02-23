// import React, { useState } from 'react';
// import AssessmentForm from './AssessmentForm';
// import VoiceInput from '../../components/VoiceInput';
// import {
//   Box,
//   Grid,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormControl,
//   FormLabel,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from '@mui/material';

// function ERPhysicianAssessment() {
//   const [formData, setFormData] = useState({
//     erPhysician: '',
//     erNurse: '',
//     triageLevel: '',
//     gcsScore: '',
//     arrivalDate: '',
//     arrivalTime: '',
//     arrivalTimeAmPm: 'AM',
//     arrivalMode: '',
//     previousAdmission: '',
//     mrNo: '',
//     returnToER: '',
//     mlcStatus: '',
//     preArrivalNotification: '',
//     notificationTime: '',
//     notificationTimeAmPm: 'AM',
//     notifiedBy: '',
//     vitals: {
//       temp: '',
//       pr: '',
//       bp: '',
//       rr: '',
//       spo2: '',
//       gcs: '',
//       grbs: '',
//       painScore: '',
//       urineOutput: '',
//     },
//     outsideInvestigations: '',
//     coMorbidities: '',
//     drugAllergies: '',
//   });

//   const handleInputChange = (field) => (event) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: event.target.value
//     }));
//   };

//   const handleVitalsChange = (field) => (event) => {
//     setFormData(prev => ({
//       ...prev,
//       vitals: {
//         ...prev.vitals,
//         [field]: event.target.value
//       }
//     }));
//   };

//   const formContent = (
//     <Box sx={{ p: 3 }}>
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={6}>
//           <VoiceInput
//             label="ER Physician"
//             value={formData.erPhysician}
//             onChange={handleInputChange('erPhysician')}
//           />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <VoiceInput
//             label="ER Nurse"
//             value={formData.erNurse}
//             onChange={handleInputChange('erNurse')}
//           />
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <FormControl component="fieldset">
//             <FormLabel component="legend">Initial Triage Level</FormLabel>
//             <RadioGroup
//               row
//               value={formData.triageLevel}
//               onChange={handleInputChange('triageLevel')}
//             >
//               {[1, 2, 3, 4].map((level) => (
//                 <FormControlLabel
//                   key={level}
//                   value={level.toString()}
//                   control={<Radio />}
//                   label={level}
//                 />
//               ))}
//             </RadioGroup>
//           </FormControl>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <VoiceInput
//             label="GCS (E/V/M) Score"
//             value={formData.gcsScore}
//             onChange={handleInputChange('gcsScore')}
//           />
//         </Grid>

//         <Grid item xs={12}>
//           <TableContainer component={Paper} variant="outlined">
//             <Table size="small">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Vitals</TableCell>
//                   <TableCell>Value</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {[
//                   { label: 'Temperature (°F)', field: 'temp' },
//                   { label: 'Pulse Rate (/min)', field: 'pr' },
//                   { label: 'Blood Pressure (mmHg)', field: 'bp' },
//                   { label: 'Respiratory Rate (/min)', field: 'rr' },
//                   { label: 'SpO₂ (%)', field: 'spo2' },
//                   { label: 'GCS (E/V/M)', field: 'gcs' },
//                   { label: 'GRBS (mg/dL)', field: 'grbs' },
//                   { label: 'Pain Score (0-10)', field: 'painScore' },
//                   { label: 'Urine Output', field: 'urineOutput' },
//                 ].map(({ label, field }) => (
//                   <TableRow key={field}>
//                     <TableCell>{label}</TableCell>
//                     <TableCell>
//                       <VoiceInput
//                         value={formData.vitals[field]}
//                         onChange={handleVitalsChange(field)}
//                         size="small"
//                       />
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Grid>

//         <Grid item xs={12}>
//           <VoiceInput
//             label="Outside Investigations & Treatment"
//             value={formData.outsideInvestigations}
//             onChange={handleInputChange('outsideInvestigations')}
//             multiline
//             rows={4}
//           />
//         </Grid>

//         <Grid item xs={12}>
//           <VoiceInput
//             label="Co-morbidities"
//             value={formData.coMorbidities}
//             onChange={handleInputChange('coMorbidities')}
//             multiline
//             rows={4}
//           />
//         </Grid>

//         <Grid item xs={12}>
//           <VoiceInput
//             label="Drug Allergies"
//             value={formData.drugAllergies}
//             onChange={handleInputChange('drugAllergies')}
//             multiline
//             rows={4}
//           />
//         </Grid>
//       </Grid>
//     </Box>
//   );

//   return (
//     <AssessmentForm 
//       title="ER Physician Assessment" 
//       formContent={formContent}
//     />
//   );
// }

// export default ERPhysicianAssessment;



































// ERPhysicianAssessment.jsx
// import React, { useState, useImperativeHandle, forwardRef } from 'react';
// import { Box, Typography, TextField } from '@mui/material';

// const ERPhysicianAssessment = forwardRef((props, ref) => {
//   const [erFormData, setErFormData] = useState({
//     diagnosis: '',
//     treatment: '',
//     recommendations: '',
//   });

//   // Expose a method to get the ER assessment data
//   useImperativeHandle(ref, () => ({
//     getFormData: () => ({
//       formType: 'er-physician-assessment',
//       ...erFormData,
//       submittedAt: new Date().toISOString(),
//     })
//   }));

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setErFormData(prev => ({ ...prev, [name]: value }));
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h5" sx={{ mb: 2 }}>ER Physician Assessment</Typography>
//       <TextField
//         name="diagnosis"
//         label="Diagnosis"
//         fullWidth
//         value={erFormData.diagnosis}
//         onChange={handleChange}
//         sx={{ mb: 2 }}
//       />
//       <TextField
//         name="treatment"
//         label="Treatment"
//         fullWidth
//         value={erFormData.treatment}
//         onChange={handleChange}
//         sx={{ mb: 2 }}
//       />
//       <TextField
//         name="recommendations"
//         label="Recommendations"
//         fullWidth
//         multiline
//         rows={4}
//         value={erFormData.recommendations}
//         onChange={handleChange}
//         sx={{ mb: 2 }}
//       />
//     </Box>
//   );
// });

// export default ERPhysicianAssessment;

























// ERPhysicianAssessment.jsx
import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Box, Typography, TextField } from '@mui/material';

const ERPhysicianAssessment = forwardRef((props, ref) => {
  const [erFormData, setErFormData] = useState({
    diagnosis: '',
    treatment: '',
    recommendations: '',
  });

  // Expose a method to get the ER assessment data
  useImperativeHandle(ref, () => ({
    getFormData: () => ({
      formType: 'er-physician-assessment',
      ...erFormData,
      submittedAt: new Date().toISOString(),
    })
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>ER Physician Assessment</Typography>
      <TextField
        name="diagnosis"
        label="Diagnosis"
        fullWidth
        value={erFormData.diagnosis}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        name="treatment"
        label="Treatment"
        fullWidth
        value={erFormData.treatment}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        name="recommendations"
        label="Recommendations"
        fullWidth
        multiline
        rows={4}
        value={erFormData.recommendations}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
    </Box>
  );
});

export default ERPhysicianAssessment;

