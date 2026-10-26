s = open('guides/at2020-vs-p120.html', encoding='utf-8').read()
needle = '<div class="guide-section-imgs">'
i = s.find(needle)
depth = 0
j = i
while j < len(s):
    if s[j:j+4] == '<div ':
        depth += 1
        j += 4
    elif s[j:j+6] == '</div>':
        depth -= 1
        if depth == 0:
            break
        j += 6
    else:
        j += 1
content = s[i:j+6]
# find direct children by splitting at depth 1
# Simple: find all '<div class=' or '<div style=' at top level
import re
# Print first 200 chars after imgs
print(content[:300])
print('---COUNTS---')
print('store-buttons:', content.count('store-buttons'))
print('quickfacts:', content.count('guide-section-quickfacts'))
print('video-thumb:', content.count('video-thumb'))
print('lb-video:', content.count('lb-video'))
# write full content
open('temp/imgs2.txt','w',encoding='utf-8').write(content)
print('written', len(content))
"