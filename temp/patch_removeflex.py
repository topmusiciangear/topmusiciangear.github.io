p = 'build-guides.js'
src = open(p, encoding='utf-8').read()
old = "quickFactsHtml = '<div class=\"guide-section-quickfacts\" style=\"flex:1 1 auto;min-width:0;display:grid;grid-template-rows:repeat(4,1fr);gap:4px\">' +"
new = "quickFactsHtml = '<div class=\"guide-section-quickfacts\" style=\"min-width:0;display:grid;grid-template-rows:repeat(4,1fr);gap:4px\">' +"
assert src.count(old) == 1
src = src.replace(old, new, 1)
open(p, 'w', encoding='utf-8', newline='').write(src)
print('done')
