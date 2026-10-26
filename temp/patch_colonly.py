p = 'build-guides.js'
src = open(p, encoding='utf-8').read()
old1 = "quickFactsHtml = '<div style=\"flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:4px;align-self:stretch\">' +"
new1 = "quickFactsHtml = '<div style=\"flex:1 1 auto;min-width:0;display:grid;grid-template-rows:repeat(4,1fr);gap:4px;align-self:stretch\">' +"
assert src.count(old1) == 1, src.count(old1)
src = src.replace(old1, new1, 1)
open(p, 'w', encoding='utf-8', newline='').write(src)
print('done')
