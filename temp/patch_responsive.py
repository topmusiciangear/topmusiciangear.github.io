p = 'build-guides.js'
src = open(p, encoding='utf-8').read()

# Replace the inline-sized panel div with a class-based one
old = "quickFactsHtml = '<div style=\"flex:1 1 auto;min-width:0;display:grid;grid-template-rows:repeat(4,1fr);gap:4px;height:160px\">' +"
new = "quickFactsHtml = '<div class=\"guide-section-quickfacts\" style=\"flex:1 1 auto;min-width:0;display:grid;grid-template-rows:repeat(4,1fr);gap:4px\">' +"
assert src.count(old) == 1
src = src.replace(old, new, 1)
open(p, 'w', encoding='utf-8', newline='').write(src)
print('done')

# Add responsive CSS to the injected style tag
src = open(p, encoding='utf-8').read()
cssneedle = 'gpq{display:grid'
# use the guide-section-quickfacts css appended to the injected style tag
injected = src.find('shop-wm{transition:color .18s ease}.shop-more-list a:hover .shop-wm{color:#FFB300}}')
assert injected >= 0
old2 = 'shop-wm{transition:color .18s ease}.shop-more-list a:hover .shop-wm{color:#FFB300}}'
new2 = old2 + '</style><style>' + \
  '.guide-section-quickfacts{flex:0 0 120px;width:120px;height:120px;min-width:0;background:#22252c;border-radius:8px;padding:4px 6px;box-sizing:border-box;display:grid;grid-template-rows:repeat(4,1fr);gap:3px;overflow:hidden;align-self:stretch}' + \
  '@media(min-width:901px){.guide-section-quickfacts{flex:0 0 160px;width:160px;height:160px;padding:6px 8px;gap:4px}}' + \
  '@media(max-width:900px){.guide-section-mediabuy .guide-section-img,.guide-section-mediabuy .guide-video-thumb{width:120px;height:120px}}' + \
  '</style>'
assert src.count(old2) == 1
src = src.replace(old2, new2, 1)
open(p, 'w', encoding='utf-8', newline='').write(src)
print('css injected')
