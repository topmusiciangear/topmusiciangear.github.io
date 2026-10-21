const { execSync } = require('child_process');
const out = execSync('gh api repos/topmusiciangear/topmusiciangear.github.io/pages/builds/latest', { encoding: 'utf8' });
const b = JSON.parse(out);
console.log('status:', b.status);
console.log('commit:', b.commit);
console.log('created:', b.created_at);
console.log('updated:', b.updated_at);
if (b.error) console.log('error:', JSON.stringify(b.error));
