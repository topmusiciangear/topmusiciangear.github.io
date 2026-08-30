const fs=require("fs");
let build=fs.readFileSync("build-guides.js","utf8");

// Show context around the first 300 entry
const pos = build.indexOf('300: {prices:{gear4music:"£499.00"');
console.log("Context around first 300:");
console.log(JSON.stringify(build.substring(pos-50, pos+120)));

// Remove by finding the exact line
const lines = build.split('\n');
let removed = false;
for(let i=0; i<lines.length; i++) {
  if(lines[i].includes('300:') && lines[i].includes('£499.00')) {
    console.log(`\nRemoving line ${i}: ${lines[i].trim().substring(0,100)}`);
    lines.splice(i, 1);
    removed = true;
    break;
  }
}
if(removed) {
  build = lines.join('\n');
  fs.writeFileSync("build-guides.js", build, "utf8");
  console.log("File updated");
  
  // Verify
  const re=/300:\s*\{prices:\{([^}]+)\}/g;
  let m;
  let count=0;
  while((m=re.exec(build))!==null) {
    count++;
    console.log(`Verify ${count}: {prices:{${m[1]}}}`);
  }
  console.log("Total 300 entries:", count);
} else {
  console.log("Could not find incorrect entry to remove");
}
