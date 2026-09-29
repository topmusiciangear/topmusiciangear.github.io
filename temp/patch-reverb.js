var fs = require('fs');
var oldPiece = ": (k === 'amazon' && isPlugins) ? '' : (prices[k] ? '<span style=\"margin-left:auto;display:flex;align-items:baseline;gap:6px;white-space:nowrap\">' + ((k === 'gear4music') ? '' : (k === 'reverb') ? '<span style=\"color:#a8a8a8;font-size:12px;font-weight:600\">' + t('aprox.', 'approx.') + '</span>' : '') + '<span style=\"font-weight:700;color:#fff\">' + prices[k] + '</span></span>' : (k === 'reverb') ? '<span style=\"margin-left:auto;font-size:12px;font-weight:600;color:#a8a8a8;font-style:italic\">' + t('Verificar precio', 'Check price') + '</span>' : '');";
var newPiece = ": (k === 'amazon' && isPlugins) ? '' : (k === 'reverb') ? '<span style=\"margin-left:auto;font-size:12px;font-weight:600;color:#a8a8a8;font-style:italic\">' + t('Verificar precio', 'Check price') + '</span>' : (prices[k] ? '<span style=\"margin-left:auto;display:flex;align-items:baseline;gap:6px;white-space:nowrap\">' + '<span style=\"font-weight:700;color:#fff\">' + prices[k] + '</span></span>' : '');";

['build-guides.js', 'js/shop-buttons.js'].forEach(function (f) {
  var s = fs.readFileSync(f, 'utf8');
  if (s.indexOf(oldPiece) < 0) {
    if (s.indexOf(newPiece) > -1) { console.log(f + ': already patched'); return; }
    console.error(f + ': pattern not found');
    process.exit(1);
  }
  s = s.replace(oldPiece, newPiece);
  fs.writeFileSync(f, s);
  console.log(f + ': patched');
});