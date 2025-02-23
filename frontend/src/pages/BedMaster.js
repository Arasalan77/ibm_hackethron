import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';

// Sample bed data
const mockBeds = [
  {
    id: 1,
    number: '101-A',
    ward: 'General Ward',
    status: 'Occupied',
    patient: 'John Doe',
    admissionDate: '2025-01-30',
  },
  {
    id: 2,
    number: '101-B',
    ward: 'General Ward',
    status: 'Available',
    patient: null,
    admissionDate: null,
  },
  {
    id: 3,
    number: '201-A',
    ward: 'ICU',
    status: 'Occupied',
    patient: 'Jane Smith',
    admissionDate: '2025-01-29',
  },
  {
    id: 4,
    number: '201-B',
    ward: 'ICU',
    status: 'Under Maintenance',
    patient: null,
    admissionDate: null,
  },
  {
    id: 5,
    number: '301-A',
    ward: 'Pediatric Ward',
    status: 'Available',
    patient: null,
    admissionDate: null,
  },
];

function BedMaster() {
  const [beds, setBeds] = useState(mockBeds);
  const [open, setOpen] = useState(false);
  const [selectedBed, setSelectedBed] = useState(null);

  const handleOpen = (bed = null) => {
    setSelectedBed(bed || {
      number: '',
      ward: '',
      status: 'Available',
      patient: null,
      admissionDate: null,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBed(null);
  };

  const handleSave = () => {
    if (selectedBed.id) {
      setBeds(beds.map(b => b.id === selectedBed.id ? selectedBed : b));
    } else {
      setBeds([...beds, { ...selectedBed, id: beds.length + 1 }]);
    }
    handleClose();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return '#4caf50';
      case 'Occupied':
        return '#f44336';
      case 'Under Maintenance':
        return '#ff9800';
      default:
        return '#000';
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5">Bed Master</Typography>
          <Button variant="contained" color="primary" onClick={() => handleOpen()}>
            Add New Bed
          </Button>
        </Box>

        <Grid container spacing={3}>
          {beds.map((bed) => (
            <Grid item xs={12} sm={6} md={4} key={bed.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Bed {bed.number}
                  </Typography>
                  <Typography color="textSecondary">
                    Ward: {bed.ward}
                  </Typography>
                  <Typography style={{ color: getStatusColor(bed.status) }}>
                    Status: {bed.status}
                  </Typography>
                  {bed.patient && (
                    <>
                      <Typography>
                        Patient: {bed.patient}
                      </Typography>
                      <Typography>
                        Admitted: {bed.admissionDate}
                      </Typography>
                    </>
                  )}
                  <Button
                    size="small"
                    onClick={() => handleOpen(bed)}
                    sx={{ mt: 1 }}
                  >
                    Edit
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            {selectedBed?.id ? 'Edit Bed' : 'Add New Bed'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Bed Number"
                value={selectedBed?.number || ''}
                onChange={(e) => setSelectedBed({ ...selectedBed, number: e.target.value })}
              />
              <TextField
                label="Ward"
                value={selectedBed?.ward || ''}
                onChange={(e) => setSelectedBed({ ...selectedBed, ward: e.target.value })}
              />
              <TextField
                select
                label="Status"
                value={selectedBed?.status || 'Available'}
                onChange={(e) => setSelectedBed({ ...selectedBed, status: e.target.value })}
              >
                <MenuItem value="Available">Available</MenuItem>
                <MenuItem value="Occupied">Occupied</MenuItem>
                <MenuItem value="Under Maintenance">Under Maintenance</MenuItem>
              </TextField>
              {selectedBed?.status === 'Occupied' && (
                <>
                  <TextField
                    label="Patient Name"
                    value={selectedBed?.patient || ''}
                    onChange={(e) => setSelectedBed({ ...selectedBed, patient: e.target.value })}
                  />
                  <TextField
                    label="Admission Date"
                    type="date"
                    value={selectedBed?.admissionDate || ''}
                    onChange={(e) => setSelectedBed({ ...selectedBed, admissionDate: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                  />
                </>
              )}
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

export default BedMaster;
