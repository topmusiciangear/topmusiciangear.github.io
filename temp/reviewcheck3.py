s = open('guides/at2020-vs-p120.html', encoding='utf-8').read()
i = s.find('The P120: Switches That Earn Their Place')
j = s.find('Which One Flatters Your Voice?')
chunk = s[i:j]
print('Best for text:', 'Drums, loud amps, boomy rooms' in chunk)
print('Ideal para text:', 'Baterías, amplis potentes' in chunk)
import re
for m in re.finditer(r'<div class="guide-section-imgs">(.*?)</div>\s*<div class="guide-section-buy">', chunk, re.S):
    sn = m.group(1)
    # find the quickfacts div (128px)
    idx = sn.find('flex:0 0 128px')
    if idx >= 0:
        print('QUICKFACTS SNIPPET:')
        print(sn[idx:idx+600])
    break
