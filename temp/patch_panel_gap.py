p = 'build-guides.js'
src = open(p, encoding='utf-8').read()
old = "display:flex;flex-direction:column;gap:4px;overflow:hidden"
new = "display:flex;flex-direction:column;gap:2px;overflow:hidden"
assert src.count(old) == 1
src = src.replace(old, new, 1)
# reduce padding 8->6
old2 = "flex:0 0 160px;width:160px;height:160px;min-width:0;background:#22252c;border-radius:8px;padding:8px;box-sizing:border-box;display:flex;flex-direction:column;gap:2px;overflow:hidden"
new2 = "flex:0 0 160px;width:160px;height:160px;min-width:0;background:#22252c;border-radius:8px;padding:6px;box-sizing:border-box;display:flex;flex-direction:column;gap:2px;overflow:hidden"
assert src.count(old2) == 1
src = src.replace(old2, new2, 1)
open(p, 'w', encoding='utf-8', newline='').write(src)
print('done')
