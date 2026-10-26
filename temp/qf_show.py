import re
import sys

path = sys.argv[1] if len(sys.argv) > 1 else 'guides/best-beginner-electric-guitar.html'
s = open(path, encoding='utf-8').read()
blocks = re.findall(r'<div class="guide-section-quickfacts">.*?</div></div></div>', s, re.S)
print('quickfacts blocks:', len(blocks))
for b in blocks[:2]:
    print('-' * 60)
    print(b.replace('><', '>\n<'))
