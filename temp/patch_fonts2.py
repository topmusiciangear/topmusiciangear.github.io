p = 'build-guides.js'
src = open(p, encoding='utf-8').read()

# Best for card fonts: 9px -> 8px, 11px -> 10px
old1 = "              '<div style=\"font-size:9px;color:#4d8dff;letter-spacing:.04em;text-transform:uppercase;font-weight:600\">' + _bfl + '</div>' +\n              '<div style=\"font-size:11px;font-weight:600;color:#fff;line-height:1.2\">' + _bf + '</div>' +"
new1 = "              '<div style=\"font-size:8px;color:#4d8dff;letter-spacing:.04em;text-transform:uppercase;font-weight:600\">' + _bfl + '</div>' +\n              '<div style=\"font-size:10px;font-weight:600;color:#fff;line-height:1.1\">' + _bf + '</div>' +"
assert src.count(old1) == 1, ('old1', src.count(old1))
src = src.replace(old1, new1, 1)

# Fact cards fonts: 11px -> 10px, 9px -> 8px
old2 = "                  '<div style=\"font-size:11px;font-weight:600;color:#fff;line-height:1.1\">' + (f.value || '') + '</div>' +\n                  '<div style=\"font-size:9px;color:#9aa0ab;line-height:1.1\">' + (lbl || '') + '</div>' +"
new2 = "                  '<div style=\"font-size:10px;font-weight:600;color:#fff;line-height:1.1\">' + (f.value || '') + '</div>' +\n                  '<div style=\"font-size:8px;color:#9aa0ab;line-height:1.1\">' + (lbl || '') + '</div>' +"
assert src.count(old2) == 1, ('old2', src.count(old2))
src = src.replace(old2, new2, 1)

# Reduce _cardBase padding 6px 8px -> 4px 6px
old3 = "_cardBase = 'background:#22252c;border-radius:8px;padding:6px 8px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;gap:2px;overflow:hidden;'"
new3 = "_cardBase = 'background:#22252c;border-radius:8px;padding:4px 6px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;gap:2px;overflow:hidden;'"
assert src.count(old3) == 1, ('old3', src.count(old3))
src = src.replace(old3, new3, 1)

open(p, 'w', encoding='utf-8', newline='').write(src)
print('done')
