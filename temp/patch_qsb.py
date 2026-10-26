p = 'build-guides.js'
src = open(p, encoding='utf-8').read()

# Add quickScoreBadge helper before productCard
helper = '''function quickScoreBadge(p, lang) {
  var gs = guideScore(p, CURRENT_GUIDE_ID);
  if (gs === undefined || gs === null) return '';
  var score = Number(gs).toFixed(1);
  var label = (lang === 'es' ? 'nota' : 'score');
  return '<div style="position:absolute;top:8px;left:8px;width:42px;height:42px;border-radius:50%;background:#16181d;border:3px solid #4d8dff;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:2" aria-label="' + (lang === 'es' ? 'Nuestra nota: ' : 'Our score: ') + score + ' out of 10">' +
    '<div style="font-size:13px;font-weight:500;color:#fff;line-height:1">' + score + '</div>' +
    '<div style="font-size:11px;color:#9aa0ab;line-height:1;margin-top:1px">' + label + '</div>' +
  '</div>';
}

'''
marker = 'function productCard(p, lang) {'
assert src.count(marker) == 1
src = src.replace(marker, helper + marker, 1)

# Use quickScoreBadge in the facts branch instead of scoreBadge
old = "          scoreBadge(p, lang) +\n        '</div>' +"
new = "          quickScoreBadge(p, lang) +\n        '</div>' +"
assert src.count(old) == 1, src.count(old)
src = src.replace(old, new, 1)

open(p, 'w', encoding='utf-8', newline='').write(src)
print('done')
