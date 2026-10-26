p = 'build-guides.js'
src = open(p, encoding='utf-8').read()
old = "quickFactsHtml = '<div style=\"flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:4px;height:100%\">' +"
new = "quickFactsHtml = '<div style=\"flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:4px;align-self:stretch\">' +"
assert src.count(old) == 1, src.count(old)
src = src.replace(old, new, 1)
open(p, 'w', encoding='utf-8', newline='').write(src)
print('done')
