s = open('guides/at2020-vs-p120.html', encoding='utf-8').read()
i = s.find('The AT2020: Clean, Honest and Easy to Mix')
j = s.find('The P120: Switches That Earn Their Place')
chunk = s[i:j]
print('len', len(chunk))
# find img tags
import re
for m in re.finditer(r'<img[^>]*>', chunk):
    print('IMG at', m.start()-i, m.group(0)[:120])
print('--- product-card count in chunk:', chunk.count('guide-product-card'))
print('--- buy at count:', chunk.count('Buy at'))
# show tail
print('--- TAIL ---')
print(chunk[-900:])
