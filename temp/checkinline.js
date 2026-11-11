const fs = require('fs');
const { execSync } = require('child_process');
const html = execSync('git -C C:/Users/Daniel/projects/topmusiciangear show origin/main:index.html', {encoding:'utf8'});
console.log('inline style present:', html.includes('style="gap:12px !important;"'));
