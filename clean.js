const fs = require('fs');
const path = require('path');

const filesToKeep = [
  'index.mjs',
  'index.d.ts',
  'interfaces',
  'imageConverter',
  // Add files to keep saved
];

const distPath = path.join(__dirname, 'dist');

fs.readdirSync(distPath).forEach((file) => {
  const filePath = path.join(distPath, file);

  if (!filesToKeep.includes(file)) {
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      fs.rmdirSync(filePath, { recursive: true });
    } else {
      fs.unlinkSync(filePath);
    }

    console.log(`Deleted: ${filePath}`);
  }
});
