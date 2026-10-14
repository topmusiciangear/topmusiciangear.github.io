const fs = require('fs');
const { execSync } = require('child_process');
const src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
console.log('comparePhotos en motor:', src.includes('comparePhotos') ? 'SIGUE' : 'no');
console.log('label fix zZounds:', src.includes("primaryStoreKey === 'zzounds'") ? 'presente' : 'no');
console.log('doSwap order fix:', src.includes('orderArr') ? 'presente' : 'no');
const files = execSync('git ls-files temp/', { cwd: 'C:/Users/Daniel/projects/topmusiciangear' }).toString().trim().split('\n').filter(Boolean);
console.log('archivos temp/ en repo:', files.length);
files.slice(0, 40).forEach(f => console.log('  ' + f));