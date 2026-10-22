const fs = require('fs');
const files = ['index.html', 'es/index.html'];
const svgFrom = 'data-fa="magnifying-glass" style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--text-muted);font-size:13px;z-index:1;"';
const svgTo = svgFrom.replace('color:var(--text-muted)', 'color:#fff');
const inputFrom = 'background:var(--surface);color:var(--text);font-family:inherit;';
const inputTo = 'background:var(--surface);color:#fff;font-family:inherit;';

for (const f of files) {
  let s = fs.readFileSync(f, 'utf8');
  const svgCount = s.split(svgFrom).length - 1;
  const inputCount = s.split(inputFrom).length - 1;
  if (svgCount !== 1) throw new Error(`${f}: expected 1 search icon, found ${svgCount}`);
  if (inputCount !== 1) throw new Error(`${f}: expected 1 search input, found ${inputCount}`);
  s = s.replace(svgFrom, svgTo).replace(inputFrom, inputTo);
  fs.writeFileSync(f, s);
  console.log('OK', f);
}
