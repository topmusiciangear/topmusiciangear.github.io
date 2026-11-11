import json, glob

# alcance del anglicismo "Reviews honestos" en todo el corpus
g = json.load(open('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', encoding='utf8'))
hits = []
def walk(o, loc):
    if isinstance(o, dict):
        for k, v in o.items():
            if isinstance(v, str) and ('eview honest' in v or 'eviews honest' in v):
                hits.append((loc + '.' + k, v[:90]))
            elif isinstance(v, (dict, list)):
                walk(v, loc + '.' + k)
    elif isinstance(o, list):
        for i, v in enumerate(o):
            if isinstance(v, str) and ('eview honest' in v or 'eviews honest' in v):
                hits.append((loc + '[' + str(i) + ']', v[:90]))
            elif isinstance(v, (dict, list)):
                walk(v, loc + '[' + str(i) + ']')
for x in g:
    walk(x, x['id'])
print('guides.json:', len(hits))
for h in hits[:15]:
    print('  ', h[0], '::', h[1])

p = json.load(open('C:/Users/Daniel/projects/topmusiciangear/data/products.json', encoding='utf8'))
ph = []
def walkp(o, loc):
    if isinstance(o, dict):
        for k, v in o.items():
            if isinstance(v, str) and ('eview honest' in v or 'eviews honest' in v):
                ph.append((loc + '.' + k, v[:90]))
            elif isinstance(v, (dict, list)):
                walkp(v, loc + '.' + k)
    elif isinstance(o, list):
        for i, v in enumerate(o):
            if isinstance(v, str) and ('eview honest' in v or 'eviews honest' in v):
                ph.append((loc + '[' + str(i) + ']', v[:90]))
            elif isinstance(v, (dict, list)):
                walkp(v, loc + '[' + str(i) + ']')
for x in p:
    walkp(x, str(x.get('id')))
print('products.json:', len(ph))
for h in ph[:10]:
    print('  ', h[0], '::', h[1])

# paginas generadas
n = 0
for f in glob.glob('C:/Users/Daniel/projects/topmusiciangear/guides/*.html'):
    d = open(f, encoding='utf8').read()
    c = d.count('eviews honestos') + d.count('eview honesto')
    if c:
        n += 1
        print('PAGE:', f.split('/')[-1], c)
print('paginas con el anglicismo:', n)

# confirmar disclosure corregido en la pagina local de tuners
d = open('C:/Users/Daniel/projects/topmusiciangear/guides/tuners-bass-guitar_es.html', encoding='utf8').read()
print('tuners local | creemos de verdad:', d.count('creemos de verdad'), '| genuinamente:', d.count('genuinamente'))
