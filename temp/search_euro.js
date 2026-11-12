const fs = require('fs');
const path = 'C:/Users/Daniel/projects/topmusiciangear/';
const { execSync } = require('child_process');
try {
  const r = execSync('findstr /s /i "euro invertido" *.*', { cwd: path, encoding: 'utf8' });
  console.log(r);
} catch (e) {
  console.log('No matches found or error:', e.message);
}
