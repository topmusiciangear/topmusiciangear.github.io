p = 'build-guides.js'
src = open(p, encoding='utf-8').read()

old1 = "quickFactsHtml = '<div style=\"flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:4px;align-self:stretch\">' +"
new1 = "quickFactsHtml = '<div style=\"flex:1 1 auto;min-width:0;display:grid;grid-template-rows:repeat(4,1fr);gap:4px;align-self:stretch\">' +"
assert src.count(old1) == 1, ('old1', src.count(old1))
src = src.replace(old1, new1, 1)

# Best for card: add nothing (grid handles sizing); ensure no flex:1 1 0 (it doesn't have it)
# Fact cards: remove flex:1 1 0;min-height:0 -> they have it; replace
old3 = "overflow:hidden;flex:1 1 0;min-height:0;flex-direction:row;align-items:center;gap:6px;padding:4px 8px"
new3 = "overflow:hidden;flex-direction:row;align-items:center;gap:6px;padding:4px 8px"
assert src.count(old3) == 1, ('old3', src.count(old3))
src = src.replace(old3, new3, 1)

open(p, 'w', encoding='utf-8', newline='').write(src)
print('done')
