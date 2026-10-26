import json, re, html

g = json.load(open('data/guides.json', encoding='utf-8'))
print('section keys:', sorted({k for x in g for s in (x.get('sections') or []) for k in s.keys()}))
print('guide keys with es:', [k for k in g[0].keys() if k.endswith('_es')])

def strip(h):
    h = re.sub(r'<[^>]+>', ' ', h or '')
    return ' '.join(html.unescape(h).split())

# gather sentences mentioning SM7B / P-225 / KeyLab
targets = ['SM7B', 'P-225', 'KeyLab Essential 61', 'HS8']
corpus = []
for gi in g:
    for fld in ('intro', 'intro_es', 'conclusion', 'conclusion_es', 'verdict', 'verdict_es'):
        if gi.get(fld):
            corpus.append((gi['id'], fld, strip(gi[fld])))
    for si, s in enumerate(gi.get('sections') or []):
        for fld in ('content', 'content_es'):
            if s.get(fld):
                corpus.append((gi['id'], 'sec%d.%s' % (si, fld), strip(s[fld])))

for t in targets:
    print('\n===', t)
    n = 0
    for gid, fld, txt in corpus:
        for sent in re.split(r'(?<=[.!?])\s+', txt):
            if t.lower() in sent.lower() and 8 <= len(sent.split()) <= 32:
                print(' ', gid, fld, '|', sent[:190])
                n += 1
                if n >= 4:
                    break
        if n >= 4:
            break
