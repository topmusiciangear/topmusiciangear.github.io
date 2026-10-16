const { execSync } = require('child_process');
try {
  execSync('node --check build-guides.js', { cwd: 'C:/Users/Daniel/projects/topmusiciangear', stdio: 'pipe' });
  console.log('SYNTAX OK');
} catch (e) {
  const out = (e.stdout || '').toString() + (e.stderr || '').toString();
  console.log(out.split('\n').slice(0, 8).join('\n'));
}
