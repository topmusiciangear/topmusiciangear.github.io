p = 'build-guides.js'
src = open(p, encoding='utf-8').read()

old1 = ".qf-card{background:#22252c;border-radius:8px;padding:4px 6px;box-sizing:border-box;overflow:hidden;min-height:0;display:flex;flex-direction:column;justify-content:center;gap:1px}"
new1 = ".qf-card{background:#22252c;border-radius:8px;padding:3px 6px;box-sizing:border-box;overflow:hidden;min-height:0;display:flex;flex-direction:column;justify-content:center;gap:1px}"
assert src.count(old1) == 1, ('old1', src.count(old1))
src = src.replace(old1, new1, 1)

old3 = "@media(min-width:901px){.qf-card{padding:6px 8px;gap:2px}.qf-label{font-size:9px}.qf-value{font-size:11px}.qf-fact{padding:4px 8px;gap:6px}.qf-icon{width:16px;height:16px}}"
new3 = "@media(min-width:901px){.qf-card{padding:5px 8px;gap:2px}.qf-label{font-size:9px}.qf-value{font-size:11px}.qf-fact{padding:3px 8px;gap:6px}.qf-icon{width:16px;height:16px}}"
assert src.count(old3) == 1, ('old3', src.count(old3))
src = src.replace(old3, new3, 1)

open(p, 'w', encoding='utf-8', newline='').write(src)
print('done')
