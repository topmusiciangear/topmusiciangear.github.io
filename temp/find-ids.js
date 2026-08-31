const fs = require('fs');
const d = fs.readFileSync('data/products.json', 'utf8');
const lines = d.split('\n');

// Find ID 19
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('"id": 19,') || lines[i].includes('"id":19,')) {
    console.log('=== ID 19 ===');
    for (let j = i; j < i + 25 && j < lines.length; j++) {
      console.log((j + 1) + ': ' + lines[j]);
    }
    break;
  }
}

console.log('\n');

// Find ID 60
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('"id": 60,') || lines[i].includes('"id":60,')) {
    console.log('=== ID 60 ===');
    for (let j = i; j < i + 25 && j < lines.length; j++) {
      console.log((j + 1) + ': ' + lines[j]);
    }
    break;
  }
}
