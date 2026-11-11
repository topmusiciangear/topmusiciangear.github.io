import re, glob, json

# 1. cuantas guias generadas tienen mojibake en meta desc
pat = re.compile(r'<meta name="description" content="([^"]+)"')
bad = []
for f in glob.glob('C:/Users/Daniel/projects/topmusiciangear/guides/*.html'):
    d = open(f, encoding='utf8').read()
    m = pat.search(d)
    if m and ('\u251c' in m.group(1) or '\u00c3' in m.group(1) or '\u2514' in m.group(1) or '\u2580' in m.group(1) or '\u2596' in m.group(1) or '\u2592' in m.group(1) or '\u258c' in m.group(1)):
        bad.append(f.split('\\')[-1].split('/')[-1])
print('paginas con mojibake en meta desc:', len(bad))
for b in bad[:20]:
    print('  ', b)

# 2. el JSON fuente
g = json.load(open('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', encoding='utf8'))
n = 0
for x in g:
    for k in ('description', 'description_es', 'metaDesc', 'metaDesc_es'):
        v = x.get(k)
        if v and ('\u251c' in v or '\u00c3' in v or '\u2514' in v or '\u2580' in v or '\u2596' in v or '\u2592' in v or '\u258c' in v):
            n += 1
            print('JSON:', x['id'], '::', k)
print('campos JSON con mojibake:', n)
