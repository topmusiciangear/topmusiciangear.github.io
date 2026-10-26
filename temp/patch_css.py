s=open('build-guides.js',encoding='utf-8').read()
old = "'.guide-section-imgs{display:flex;gap:12px;margin-top:16px;flex-wrap:wrap}'"
new = "'.guide-section-imgs{display:flex;gap:12px;margin-top:16px;flex-wrap:wrap;width:100%}'"
n = s.count(old)
s = s.replace(old, new)
open('build-guides.js','w',encoding='utf-8').write(s)
print('replaced', n)
