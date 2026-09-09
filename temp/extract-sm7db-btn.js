var { execSync } = require('child_process');
var fs = require('fs');
var raw = execSync('git show 79c81d7156:build-guides.js', { maxBuffer: 32 * 1024 * 1024 }).toString('utf8');
var lines = raw.split('\n');
lines.forEach(function (l, i) {
  var m = l.match(/^\s*321\s*:\s*\{/);
  if (m) {
    console.log(('line ' + (i + 1) + ': ' + l).trim());
  }
});