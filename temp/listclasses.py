s = open('guides/at2020-vs-p120.html', encoding='utf-8').read()
# find all top-level-ish containers in body
import re
# find divs with class containing 'product' or 'guide' in body
for m in re.finditer(r'class="([^"]*(?:product|guide)[^"]*)"', s):
    pass
# print unique class names containing product
classes = set(re.findall(r'class="([^"]+)"', s))
prod_classes = sorted(c for c in classes if 'product' in c or 'guide-detail' in c)
print('product/guide classes:')
for c in prod_classes:
    print(' ', c)
print('total classes:', len(classes))
