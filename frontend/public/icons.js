// This creates a basic colored square icon with text
const canvas = document.createElement('canvas');
canvas.width = 512;
canvas.height = 512;
const ctx = canvas.getContext('2d');

// Draw background
ctx.fillStyle = '#1976d2';
ctx.fillRect(0, 0, 512, 512);

// Add text
ctx.fillStyle = 'white';
ctx.font = 'bold 80px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('W', 256, 256);

// Convert to base64
const icon512 = canvas.toDataURL();

// Scale down for 192x192
canvas.width = 192;
canvas.height = 192;
ctx.fillStyle = '#1976d2';
ctx.fillRect(0, 0, 192, 192);
ctx.fillStyle = 'white';
ctx.font = 'bold 40px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('W', 96, 96);

const icon192 = canvas.toDataURL();

export { icon192, icon512 }; 