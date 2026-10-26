import re
s = open('guides/at2020-vs-p120.html', encoding='utf-8').read()
i = s.find('The P120: Switches That Earn Their Place')
j = s.find('Which One Flatters Your Voice?')
chunk = s[i:j]
for m in re.finditer(r'<div class="guide-section-imgs">(.*?)</div>\s*<div class="guide-section-buy">', chunk, re.S):
    print(m.group(1))
    break
