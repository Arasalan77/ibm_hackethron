import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Sample template data
const mockTemplates = [
  {
    id: 1,
    name: 'General Case Sheet',
    description: 'Standard template for general medical cases',
    fields: ['Patient History', 'Symptoms', 'Diagnosis', 'Treatment Plan', 'Medications'],
    lastModified: '2025-01-30',
  },
  {
    id: 2,
    name: 'Surgery Case Sheet',
    description: 'Template for surgical procedures and post-op care',
    fields: ['Pre-op Assessment', 'Surgical Notes', 'Post-op Care', 'Recovery Plan'],
    lastModified: '2025-01-29',
  },
  {
    id: 3,
    name: 'Pediatric Case Sheet',
    description: 'Specialized template for pediatric cases',
    fields: ['Growth Metrics', 'Vaccination History', 'Development Assessment'],
    lastModified: '2025-01-28',
  },
  {
    id: 4,
    name: 'Orthopedic Case Sheet',
    description: 'Template for orthopedic cases and injuries',
    fields: ['Injury Details', 'X-Ray Results', 'Physical Therapy Plan'],
    lastModified: '2025-01-27',
  },
];

function CaseSheetTemplates() {
  const [templates, setTemplates] = useState(mockTemplates);
  const [open, setOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleOpen = (template = null) => {
    setSelectedTemplate(template);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTemplate(null);
  };

  const handleSave = () => {
    if (selectedTemplate) {
      setTemplates(templates.map(t => 
        t.id === selectedTemplate.id ? selectedTemplate : t
      ));
    } else {
      setTemplates([...templates, {
        ...selectedTemplate,
        id: templates.length + 1,
        lastModified: new Date().toISOString().split('T')[0],
      }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setTemplates(templates.filter(t => t.id !== id));
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5">Case Sheet Templates</Typography>
          <Button variant="contained" color="primary" onClick={() => handleOpen()}>
            Add New Template
          </Button>
        </Box>

        <List>
          {templates.map((template) => (
            <ListItem key={template.id} divider>
              <ListItemText
                primary={template.name}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      {template.description}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2">
                      Last modified: {template.lastModified}
                    </Typography>
                  </>
                }
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleOpen(template)} sx={{ mr: 1 }}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => handleDelete(template.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>
            {selectedTemplate ? 'Edit Template' : 'Add New Template'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Template Name"
                value={selectedTemplate?.name || ''}
                onChange={(e) => setSelectedTemplate({
                  ...selectedTemplate,
                  name: e.target.value,
                })}
              />
              <TextField
                label="Description"
                multiline
                rows={2}
                value={selectedTemplate?.description || ''}
                onChange={(e) => setSelectedTemplate({
                  ...selectedTemplate,
                  description: e.target.value,
                })}
              />
              <TextField
                label="Fields (comma-separated)"
                multiline
                rows={3}
                value={selectedTemplate?.fields?.join(', ') || ''}
                onChange={(e) => setSelectedTemplate({
                  ...selectedTemplate,
                  fields: e.target.value.split(',').map(f => f.trim()),
                })}
                helperText="Enter fields separated by commas"
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

export default CaseSheetTemplates;
