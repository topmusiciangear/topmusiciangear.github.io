s = open('guides/at2020-vs-p120.html', encoding='utf-8').read()
i = s.find('The P120: Switches That Earn Their Place')
j = s.find('Which One Flatters Your Voice?')
chunk = s[i:j]
print('Best for count in P120 review:', chunk.count('Best for'))
print('gpq-bestfor present:', 'gpq-bestfor' in chunk)
import re
for m in re.finditer(r'<div class="guide-section-imgs">(.*?)</div>\s*<div class="guide-section-buy">', chunk, re.S):
    print('MEDIABUY SNIPPET:')
    print(m.group(1)[:900])
    break
print('badge-size present:', 'var(--badge-size)' in chunk)
