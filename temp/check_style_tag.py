import re
s = open('build-guides.js', encoding='utf-8').read()
# Find the injected style tag content (the one containing guide-section-quickfacts)
m = re.search(r'<style>(.*?)</style>', s, re.S)
if m:
    print('INJECTED STYLE TAG LENGTH:', len(m.group(1)))
    print(m.group(1)[:300])
else:
    print('NO STYLE TAG FOUND')
# Check if guide-section-img rules exist inside injected style
if 'guide-section-img' in s:
    i = s.find('.guide-section-img{')
    print('guide-section-img{ at', i, repr(s[i:i+120]))
