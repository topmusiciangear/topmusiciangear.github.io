p = 'build-guides.js'
src = open(p, encoding='utf-8').read()

# column: flex -> grid with 4 equal rows
old1 = "quickFactsHtml = '<div style=\"flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:4px;align-self:stretch\">' +"
new1 = "quickFactsHtml = '<div style=\"flex:1 1 auto;min-width:0;display:grid;grid-template-rows:repeat(4,1fr);gap:4px;align-self:stretch\">' +"
assert src.count(old1) == 1, src.count(old1)
src = src.replace(old1, new1, 1)

# Best for card: remove flex:1 1 0;min-height:0 (grid handles it)
old2 = "'<div style=\"background:#22252c;border-radius:8px;padding:6px 8px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;gap:2px;overflow:hidden;flex:1 1 0;min-height:0\">' +"
new2 = "'<div style=\"background:#22252c;border-radius:8px;padding:6px 8px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;gap:2px;overflow:hidden;min-height:0\">' +"
assert src.count(old2) == 1, src.count(old2)
src = src.replace(old2, new2, 1)

# fact cards: remove flex:1 1 0;min-height:0
old3 = "'<div style=\"background:#22252c;border-radius:8px;padding:6px 8px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;gap:2px;overflow:hidden;flex:1 1 0;min-height:0;flex-direction:row;align-items:center;gap:6px;padding:4px 8px\">' +"
new3 = "'<div style=\"background:#22252c;border-radius:8px;padding:6px 8px;box-sizing:border-box;display:flex;flex-direction:row;align-items:center;gap:6px;padding:4px 8px;overflow:hidden;min-height:0\">' +"
assert src.count(old3) == 1, src.count(old3)
src = src.replace(old3, new3, 1)

open(p, 'w', encoding='utf-8', newline='').write(src)
print('done')
