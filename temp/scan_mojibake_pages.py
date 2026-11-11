import glob, re

MOJI = re.compile('[\u251c\u2514\u2500\u2534\u252c\u2588\u2593\u2592\u2584\u258c\u2580\u2596]')
bad = []
for f in glob.glob('C:/Users/Daniel/projects/topmusiciangear/guides/*.html'):
    d = open(f, encoding='utf8').read()
    m = MOJI.search(d)
    if m:
        s = max(0, m.start() - 60)
        bad.append((f.split('/')[-1].split('\\')[-1], d[s:m.end() + 60].replace('\n', ' ')))
print('paginas con mojibake:', len(bad))
for f, ctx in bad[:10]:
    print('  ', f, '|', ctx[:150])
