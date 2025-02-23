import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Button,
  Fab,
  Menu,
  MenuItem,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import ERPhysicianAssessment from './assessments/ERPhysicianAssessment';
import InpatientAssessment from './assessments/InpatientAssessment';
import NursingInitialAssessment from './assessments/NursingInitialAssessment';

// Define assessment types
const assessmentTypes = [
  {
    label: 'Nursing Initial Assessment',
    component: NursingInitialAssessment
  },
  {
    label: 'ER Physician Assessment',
    component: ERPhysicianAssessment
  },
  {
    label: 'Inpatient Assessment',
    component: InpatientAssessment
  }
];

// Mock data for demonstration
const mockPatients = [
  {
    id: 1,
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    admissionDate: '2025-01-30',
    caseSheets: [
      { id: 1, type: 'Nursing Initial Assessment', date: '2025-01-30' },
      { id: 2, type: 'ER Physician Assessment', date: '2025-01-31' },
    ],
  },
  {
    id: 2,
    name: 'Jane Smith',
    age: 32,
    gender: 'Female',
    admissionDate: '2025-01-29',
    caseSheets: [],
  },
];

function PatientList() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [open, setOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedCaseSheet, setSelectedCaseSheet] = useState(null);

  const handleViewCaseSheets = (patient) => {
    setSelectedPatient(patient);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPatient(null);
    setSelectedCaseSheet(null);
  };

  const handleAddClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleCaseSheetSelect = (type) => {
    setSelectedCaseSheet(type);
    handleMenuClose();
  };

  const handleSaveCaseSheet = () => {
    // Here you would typically save the case sheet data
    console.log('Saving case sheet...');
    handleClose();
  };

  const renderSelectedAssessment = () => {
    const selectedType = assessmentTypes.find(type => type.label === selectedCaseSheet);
    if (selectedType) {
      const AssessmentComponent = selectedType.component;
      return <AssessmentComponent patientId={selectedPatient?.id} />;
    }
    return null;
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Patient List
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Admission Date</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.admissionDate}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleViewCaseSheets(patient)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog 
          open={open} 
          onClose={handleClose} 
          maxWidth="lg" 
          fullWidth
          PaperProps={{
            sx: { minHeight: '80vh' }
          }}
        >
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              Case Sheets - {selectedPatient?.name}
            </Typography>
            <Fab
              color="primary"
              size="small"
              onClick={handleAddClick}
              sx={{ ml: 2 }}
            >
              <AddIcon />
            </Fab>
          </DialogTitle>
          <DialogContent>
            {!selectedCaseSheet ? (
              selectedPatient?.caseSheets.length > 0 ? (
                <List>
                  {selectedPatient.caseSheets.map((sheet) => (
                    <ListItem key={sheet.id}>
                      <ListItemText
                        primary={sheet.type}
                        secondary={`Date: ${sheet.date}`}
                      />
                      <Button color="primary" onClick={() => handleCaseSheetSelect(sheet.type)}>
                        View
                      </Button>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography color="text.secondary" align="center" sx={{ py: 3 }}>
                  No Patient Case Sheets
                </Typography>
              )
            ) : (
              <Box>
                {renderSelectedAssessment()}
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <Button onClick={handleClose} color="inherit">
                    Cancel
                  </Button>
                  <Button onClick={handleSaveCaseSheet} variant="contained" color="primary">
                    Save Case Sheet
                  </Button>
                </Box>
              </Box>
            )}
          </DialogContent>
        </Dialog>

        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
        >
          {assessmentTypes.map((type) => (
            <MenuItem
              key={type.label}
              onClick={() => handleCaseSheetSelect(type.label)}
            >
              {type.label}
            </MenuItem>
          ))}
        </Menu>
      </Paper>
    </Box>
  );
}

export default PatientList;
