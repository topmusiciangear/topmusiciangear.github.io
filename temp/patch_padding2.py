p = 'build-guides.js'
src = open(p, encoding='utf-8').read()

# Base .qf-card padding 4px 6px -> 3px 6px
old1 = ".qf-card{background:#22252c;border-radius:8px;padding:4px 6px;box-sizing:border-box;overflow:hidden;min-height:0;display:flex;flex-direction:column;justify-content:center;gap:1px}"
new1 = ".qf-card{background:#22252c;border-radius:8px;padding:3px 6px;box-sizing:border-box;overflow:hidden;min-height:0;display:flex;flex-direction:column;justify-content:center;gap:1px}"
assert src.count(old1) == 1, ('old1', src.count(old1))
src = src.replace(old1, new1, 1)

# .qf-bestfor padding 3px 6px -> 2px 6px
old2 = ".qf-bestfor{padding:3px 6px;gap:0}"
new2 = ".qf-bestfor{padding:2px 6px;gap:0}"
assert src.count(old2) == 1, ('old2', src.count(old2))
src = src.replace(old2, new2, 1)

# Desktop media query: reduce padding
old3 = "@media(min-width:901px){.qf-card{padding:6px 8px;gap:2px}.qf-label{font-size:9px}.qf-value{font-size:11px}.qf-fact{padding:4px 8px;gap:6px}.qf-icon{width:16px;height:16px}}"
new3 = "@media(min-width:901px){.qf-card{padding:5px 8px;gap:2px}.qf-label{font-size:9px}.qf-value{font-size:11px}.qf-fact{padding:3px 8px;gap:6px}.qf-icon{width:16px;height:16px}}"
assert src.count(old3) == 1, ('old3', src.count(old3))
src = src.replace(old3, new3, 1)

open(p, 'w', encoding='utf-8', newline='').write(src)
print('done')
