src = open('build-guides.js', encoding='utf-8').read()
needle = 'shop-wm{transition:color .18s ease}.shop-more-list a:hover .shop-wm{color:#FFB300}}'
i = src.find(needle)
old = needle + '</style>'
new = needle + '</style><style>' + open('temp/gpq_css.txt',encoding='utf-8').read() + '</style>'
assert src.count(old) == 1
src = src.replace(old, new)
open('build-guides.js', 'w', encoding='utf-8', newline='').write(src)
print('done')
