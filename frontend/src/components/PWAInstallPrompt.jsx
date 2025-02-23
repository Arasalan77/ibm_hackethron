import React, { useEffect, useState } from 'react';
import { Button, Snackbar, Box } from '@mui/material';

const PWAInstallPrompt = () => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);

  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

    // Show iOS-specific instructions
    if (isIOS && !isStandalone) {
      setShowIOSPrompt(true);
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;

    const result = await installPrompt.prompt();
    console.log(`Install prompt was: ${result.outcome}`);
    setInstallPrompt(null);
  };

  const isInstallable = installPrompt || showIOSPrompt;

  if (!isInstallable) return null;

  return (
    <>
      {/* For Android/Desktop */}
      {installPrompt && (
        <Box position="fixed" bottom={16} right={16} zIndex={1000}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleInstallClick}
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              padding: '10px 20px',
            }}
          >
            Install App
          </Button>
        </Box>
      )}

      {/* For iOS */}
      <Snackbar
        open={showIOSPrompt}
        message="Install this app: tap Share then 'Add to Home Screen'"
        action={
          <Button color="secondary" size="small" onClick={() => setShowIOSPrompt(false)}>
            Close
          </Button>
        }
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ bottom: { xs: 16, sm: 24 } }}
      />
    </>
  );
};

export default PWAInstallPrompt;
