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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';

// Sample doctor data
const mockDoctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiology',
    experience: '15 years',
    contact: '+1-555-0123',
    email: 'sarah.johnson@hospital.com',
    availability: 'Mon-Fri',
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialization: 'Neurology',
    experience: '12 years',
    contact: '+1-555-0124',
    email: 'michael.chen@hospital.com',
    availability: 'Mon-Wed, Fri',
  },
  {
    id: 3,
    name: 'Dr. Emily Williams',
    specialization: 'Pediatrics',
    experience: '8 years',
    contact: '+1-555-0125',
    email: 'emily.williams@hospital.com',
    availability: 'Tue-Sat',
  },
];

function DoctorMaster() {
  const [doctors, setDoctors] = useState(mockDoctors);
  const [open, setOpen] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    specialization: '',
    experience: '',
    contact: '',
    email: '',
    availability: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddDoctor = () => {
    setDoctors([...doctors, { ...newDoctor, id: doctors.length + 1 }]);
    handleClose();
    setNewDoctor({
      name: '',
      specialization: '',
      experience: '',
      contact: '',
      email: '',
      availability: '',
    });
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5">Doctor Master</Typography>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Add New Doctor
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Specialization</TableCell>
                <TableCell>Experience</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Availability</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell>{doctor.name}</TableCell>
                  <TableCell>{doctor.specialization}</TableCell>
                  <TableCell>{doctor.experience}</TableCell>
                  <TableCell>{doctor.contact}</TableCell>
                  <TableCell>{doctor.email}</TableCell>
                  <TableCell>{doctor.availability}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New Doctor</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Name"
                value={newDoctor.name}
                onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
              />
              <TextField
                label="Specialization"
                value={newDoctor.specialization}
                onChange={(e) => setNewDoctor({ ...newDoctor, specialization: e.target.value })}
              />
              <TextField
                label="Experience"
                value={newDoctor.experience}
                onChange={(e) => setNewDoctor({ ...newDoctor, experience: e.target.value })}
              />
              <TextField
                label="Contact"
                value={newDoctor.contact}
                onChange={(e) => setNewDoctor({ ...newDoctor, contact: e.target.value })}
              />
              <TextField
                label="Email"
                value={newDoctor.email}
                onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
              />
              <TextField
                label="Availability"
                value={newDoctor.availability}
                onChange={(e) => setNewDoctor({ ...newDoctor, availability: e.target.value })}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAddDoctor} variant="contained">Add</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
}

export default DoctorMaster;
