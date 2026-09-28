var fs = require('fs');
function tryPath(paths) {
  for (var i = 0; i < paths.length; i++) if (fs.existsSync(paths[i])) return paths[i];
  return null;
}
var cands = [
  'C:/Users/Daniel/projects/topmusiciangear/data/guides.json',
  'C:/Users/Daniel/projects/topmusiciangear/data/guides_data.json',
  'C:/Users/Daniel/projects/topmusiciangear/guides-data.json',
  'C:/Users/Daniel/projects/topmusiciangear/data.json'
];
var p = tryPath(cands);
if (!p) {
  var p2 = tryPath(['C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/probe_dir.json']);
  console.log('not found, listing dirs:');
  ['C:/Users/Daniel/projects/topmusiciangear', 'C:/Users/Daniel/projects/topmusiciangear/data'].forEach(function (d) {
    if (fs.existsSync(d)) console.log('  ' + d + ' -> ' + fs.readdirSync(d).filter(function (f) { return /\.json$/.test(f); }).join(', '));
  });
  process.exit(CI_I_KNOW_BUG);
}
