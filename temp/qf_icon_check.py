import re
import sys

path = sys.argv[1] if len(sys.argv) > 1 else 'guides/best-acoustic-guitars-for-beginners.html'
s = open(path, encoding='utf-8').read()

m = re.search(r'<div class="guide-section-quickfacts">', s)
i = m.start()
depth = 0
j = i
while j < len(s):
    if s.startswith('<div', j):
        depth += 1
        j += 4
        continue
    if s.startswith('</div>', j):
        depth -= 1
        j += 6
        if depth == 0:
            break
        continue
    j += 1
block = s[i:j]

for k, svg in enumerate(re.findall(r'<svg.*?</svg>', block, re.S)):
    paths = re.findall(r'<(path|line|rect|circle|polygon|polyline)\b', svg)
    print('svg', k)
    print('   head:', svg[:120].replace('\n', ' '))
    print('   shapes:', len(paths), paths[:8])
    print('   bytes:', len(svg))
