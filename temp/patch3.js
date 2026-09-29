var fs = require('fs');

var OPEN = '<span style="margin-left:auto;display:flex;align-items:baseline;gap:6px;white-space:nowrap"><span style="font-weight:700;color:#fff">';
var CLOSE = '</span></span>';
var LABEL = '<span style="margin-left:auto;font-size:12px;font-weight:600;color:#a8a8a8;font-style:italic">' + "' + tmgCheckLabel + '";

var files = ['build-guides.js', 'js/shop-buttons.js', 'temp/gen-shop-buttons.js'];

files.forEach(function (f) {
  var s = fs.readFileSync(f, 'utf8');

  // Repair the malformed variant produced by the previous bad patch
  var badMin = "'" + OPEN + "'+dispPrice+'" + CLOSE + "':'';);";
  var badSp = "'" + OPEN + "' + dispPrice + '" + CLOSE + "' : '');";
  var good = "'" + OPEN + "'+dispPrice+'" + CLOSE + "') : '';";

  if (s.indexOf(badMin) > -1) { s = s.split(badMin).join(good); console.log(f + ': repaired minified'); }
  if (s.indexOf(badSp) > -1) { s = s.split(badSp).join(good); console.log(f + ': repaired spaced'); }

  if (s.indexOf('tmgLabelSpan') > -1) {
    fs.writeFileSync(f, s);
    console.log(f + ': style already handled');
    return;
  }

  var re = new RegExp(
    "var dispPriceSpan = dispPrice \\? '" + OPEN.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "'\\s*\\+\\s*dispPrice\\s*\\+\\s*'" + CLOSE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "'\\s*:\\s*'';"
  );

  if (!re.test(s)) { console.error(f + ': pattern not found'); process.exit(1); }
  s = s.replace(re,
    "var tmgLabelSpan = '" + LABEL + "</span>';\n      var dispPriceSpan = dispPrice ? (dispPrice === tmgCheckLabel ? tmgLabelSpan : '" + OPEN + "'+dispPrice+'" + CLOSE + "') : '';"
  );
  fs.writeFileSync(f, s);
  console.log(f + ': dispPriceSpan now uses the italic label style');
});
