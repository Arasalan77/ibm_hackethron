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
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Sample ward data
const mockWards = [
  {
    id: 1,
    name: 'General Ward',
    capacity: 20,
    occupiedBeds: 15,
    nurseInCharge: 'Nurse Sarah',
    floor: '1st Floor',
    contact: 'Ext. 101',
  },
  {
    id: 2,
    name: 'ICU',
    capacity: 10,
    occupiedBeds: 8,
    nurseInCharge: 'Nurse Michael',
    floor: '2nd Floor',
    contact: 'Ext. 201',
  },
  {
    id: 3,
    name: 'Pediatric Ward',
    capacity: 15,
    occupiedBeds: 10,
    nurseInCharge: 'Nurse Emily',
    floor: '3rd Floor',
    contact: 'Ext. 301',
  },
  {
    id: 4,
    name: 'Surgery Ward',
    capacity: 12,
    occupiedBeds: 6,
    nurseInCharge: 'Nurse David',
    floor: '2nd Floor',
    contact: 'Ext. 202',
  },
];

function WardMaster() {
  const [wards, setWards] = useState(mockWards);
  const [open, setOpen] = useState(false);
  const [selectedWard, setSelectedWard] = useState(null);

  const handleOpen = (ward = null) => {
    setSelectedWard(ward || {
      name: '',
      capacity: '',
      occupiedBeds: 0,
      nurseInCharge: '',
      floor: '',
      contact: '',
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedWard(null);
  };

  const handleSave = () => {
    if (selectedWard.id) {
      setWards(wards.map(w => w.id === selectedWard.id ? selectedWard : w));
    } else {
      setWards([...wards, { ...selectedWard, id: wards.length + 1 }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setWards(wards.filter(w => w.id !== id));
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5">Ward Master</Typography>
          <Button variant="contained" color="primary" onClick={() => handleOpen()}>
            Add New Ward
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ward Name</TableCell>
                <TableCell align="center">Capacity</TableCell>
                <TableCell align="center">Occupied</TableCell>
                <TableCell>Nurse In Charge</TableCell>
                <TableCell>Floor</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {wards.map((ward) => (
                <TableRow key={ward.id}>
                  <TableCell>{ward.name}</TableCell>
                  <TableCell align="center">{ward.capacity}</TableCell>
                  <TableCell align="center">{ward.occupiedBeds}</TableCell>
                  <TableCell>{ward.nurseInCharge}</TableCell>
                  <TableCell>{ward.floor}</TableCell>
                  <TableCell>{ward.contact}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleOpen(ward)} size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(ward.id)} size="small">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            {selectedWard?.id ? 'Edit Ward' : 'Add New Ward'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Ward Name"
                value={selectedWard?.name || ''}
                onChange={(e) => setSelectedWard({ ...selectedWard, name: e.target.value })}
              />
              <TextField
                label="Capacity"
                type="number"
                value={selectedWard?.capacity || ''}
                onChange={(e) => setSelectedWard({ ...selectedWard, capacity: e.target.value })}
              />
              <TextField
                label="Occupied Beds"
                type="number"
                value={selectedWard?.occupiedBeds || ''}
                onChange={(e) => setSelectedWard({ ...selectedWard, occupiedBeds: e.target.value })}
              />
              <TextField
                label="Nurse In Charge"
                value={selectedWard?.nurseInCharge || ''}
                onChange={(e) => setSelectedWard({ ...selectedWard, nurseInCharge: e.target.value })}
              />
              <TextField
                label="Floor"
                value={selectedWard?.floor || ''}
                onChange={(e) => setSelectedWard({ ...selectedWard, floor: e.target.value })}
              />
              <TextField
                label="Contact"
                value={selectedWard?.contact || ''}
                onChange={(e) => setSelectedWard({ ...selectedWard, contact: e.target.value })}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave} variant="contained">Save</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
}

export default WardMaster;
