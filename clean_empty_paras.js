const fs=require('fs');
let data=fs.readFileSync('data/guides.json','utf8');
// Remove empty strong paragraphs
data=data.replace(/<p><strong>\s*<\/strong>\s*-\s*[^<]*<\/p>/gi,'');
// Remove paragraphs with strong empty
data=data.replace(/<p><strong>\s*<\/strong>[^<]*<\/p>/gi,'');
fs.writeFileSync('data/guides.json', data);
console.log('cleaned empty strong paragraphs');
