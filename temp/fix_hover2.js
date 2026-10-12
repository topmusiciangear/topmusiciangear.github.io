var fs = require('fs');
var BS = String.fromCharCode(92), DQ = String.fromCharCode(34);
function patch(f, a, b, expect) {
  var s = fs.readFileSync(f, 'utf8');
  var n = s.split(a).length - 1;
  console.log(f + ' found x' + n + ' :: ' + a.slice(0, 60));
  if (n !== expect) { console.log('EXPECTED x' + expect + ' -- ABORT'); process.exit(1); }
  fs.writeFileSync(f, s.split(a).join(b));
}
patch('build-guides.js', "'+gRowFont+'" + BS + DQ + ">", "'+gRowFont+'" + DQ + " class=" + DQ + "shop-wm" + DQ + ">", 1);
patch('temp/gen-shop-buttons.js', "' + dispSt + '" + DQ + ">", "' + dispSt + '" + DQ + " class=" + DQ + "shop-wm" + DQ + ">", 1);
patch('build-guides.js',
  ".shop-more-list a:hover{transform:scale(1.05);background:#34383d;box-shadow:0 4px 16px rgba(0,0,0,.5)}",
  ".shop-more-list a:hover{transform:scale(1.05);background:#34383d;box-shadow:0 4px 16px rgba(0,0,0,.5)}.shop-more-list .shop-wm{transition:color .18s ease}.shop-more-list a:hover .shop-wm{color:#FFC107}",
  1);
console.log('hover-amber part2 OK');
