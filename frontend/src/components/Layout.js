import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import '../css/PatientList.css';
import { patientData } from '../data';



const leftMenuItems = [
  // { label: 'Add New Patient', path: '/add-patient' },
  { label: 'Patients', path: '/patients' },
  // { label: 'Bed Master', path: '/bed-master' },
  // { label: 'Ward Master', path: '/ward-master' },
  // { label: 'Doctor Master', path: '/doctor-master' },
];

const rightMenuItems = [
  { label: 'Discharge Summary', path: '/discharge-summary'},
  { label: 'Case Summary', path: '/case-summary'},
  { label: 'Clinical Errors', path: '/clinical-errors'},
];

function Layout({ children }) {
  const navigate = useNavigate();
  const [leftAnchorEl, setLeftAnchorEl] = useState(null);
  const [rightAnchorEl, setRightAnchorEl] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLeftMenuOpen = (event) => {
    setLeftAnchorEl(event.currentTarget);
    setIsMenuOpen(true);
  };

  const handleRightMenuOpen = (event) => {
    setRightAnchorEl(event.currentTarget);
  };

  const handleLeftMenuClose = () => {
    setLeftAnchorEl(null);
    setIsMenuOpen(false);
  };

  const handleRightMenuClose = () => {
    setRightAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleLeftMenuClose();
    // handleRightMenuClose();
  };

  // Explicitly close the menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleLeftMenuOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={leftAnchorEl}
            open={Boolean(leftAnchorEl)}
            onClose={handleLeftMenuClose}
          >
            {/* {leftMenuItems.map((item) => (
              <MenuItem
                key={item.path}
                onClick={() => handleMenuItemClick(item.path)}
              >
                {item.label}
              </MenuItem>
            ))} */}


            <div className={`patient-menu ${isMenuOpen ? "open" : ""}`}>
              {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Patients</h2>
                <button className="close-button" onClick={handleLeftMenuClose}>
                  X
                </button>
              </div> */}
              {/* Close button inside the menu */}
              <button className="close-button" onClick={handleLeftMenuClose}>
                X
              </button>
              <h2>Patients</h2>
              <ul>
                {patientData.map((patient, index) => (
                  <li key={index} className="patient-item" onClick={() => handleMenuItemClick(patient.path)}>
                    <div className="patient-name">
                      {patient.name} ({patient.age})
                    </div>
                    <div>Ward: {patient.ward}</div>
                    <div>ID: {patient.patientID}</div>
                  </li>
                ))}
              </ul>
            </div>

          </Menu>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            MedAI Paperless IPD
          </Typography>

          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="assessment forms"
            onClick={handleRightMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={rightAnchorEl}
            open={Boolean(rightAnchorEl)}
            onClose={handleRightMenuClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {rightMenuItems.map((item) => (
              <MenuItem
                key={item.path}
                onClick={() => handleMenuItemClick(item.path)}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ flexGrow: 1, py: 3 }}>
        {children}
      </Container>
    </Box>
  );
}

export default Layout;
