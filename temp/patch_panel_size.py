p = 'build-guides.js'
src = open(p, encoding='utf-8').read()

old = ("          quickFactsHtml = '<div style=\"flex:0 0 128px;width:128px;min-width:0;background:#22252c;border-radius:8px;padding:8px;box-sizing:border-box;display:flex;flex-direction:column;gap:6px\">' +")
new = ("          quickFactsHtml = '<div style=\"flex:0 0 160px;width:160px;height:160px;min-width:0;background:#22252c;border-radius:8px;padding:8px;box-sizing:border-box;display:flex;flex-direction:column;gap:4px;overflow:hidden\">' +")
assert src.count(old) == 1, src.count(old)
src = src.replace(old, new, 1)
open(p, 'w', encoding='utf-8', newline='').write(src)
print('done')
