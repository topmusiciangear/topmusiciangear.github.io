import re
src = open('build-guides.js', encoding='utf-8').read()
for pat in [r'function \w*Card\w*', r'function \w*Store\w*', r'function productRatingLine', r'Compare \d+ more stores', r'Compare N more', r'guide-product-card']:
    for m in re.finditer(pat, src):
        print(m.start(), m.group(0)[:60])
        # print line number
    print('---', pat)
# line numbers for productCard
for m in re.finditer(r'function productCard', src):
    print('productCard at line', src[:m.start()].count('\n')+1)
