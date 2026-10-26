s = open('guides/at2020-vs-p120.html', encoding='utf-8').read()
i = s.find('The AT2020: Clean, Honest and Easy to Mix')
j = s.find('The P120: Switches That Earn Their Place')
chunk = s[i:j]
print('Best for count in AT2020 review:', chunk.count('Best for'))
print('Ideal para count:', chunk.count('Ideal para'))
import re
for m in re.finditer(r'<div class="guide-section-imgs">(.*?)</div>\s*<div class="guide-section-buy">', chunk, re.S):
    print('MEDIABUY SNIPPET:')
    print(m.group(1)[:700])
    break
# check score badge (ring style) present in review section
print('badge-size present:', 'var(--badge-size)' in chunk)
print('gpq-bestfor present:', 'gpq-bestfor' in chunk)
