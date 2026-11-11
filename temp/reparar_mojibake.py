import json, glob

MOJI = ['\u251c', '\u2514', '\u2500', '\u2534', '\u252c', '\u2588', '\u2593', '\u2592', '\u2584', '\u00c3', '\u258c', '\u2580', '\u2596']

def tiene_moji(s):
    return any(c in s for c in MOJI)

def reparar(s):
    # round-trip: los bytes originales UTF-8 fueron interpretados como CP850
    try:
        fixed = s.encode('cp850').decode('utf8')
        if not tiene_moji(fixed):
            return fixed
    except (UnicodeEncodeError, UnicodeDecodeError):
        pass
    return None

total = 0
for path in ['C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'C:/Users/Daniel/projects/topmusiciangear/data/products.json']:
    data = json.load(open(path, encoding='utf8'))
    reparados = []
    fallidos = []

    def walk(o, loc):
        global total
        if isinstance(o, dict):
            for k in list(o.keys()):
                v = o[k]
                if isinstance(v, str) and tiene_moji(v):
                    r = reparar(v)
                    if r is not None:
                        o[k] = r
                        reparados.append(loc + '.' + k)
                    else:
                        fallidos.append((loc + '.' + k, v[:80]))
                elif isinstance(v, (dict, list)):
                    walk(v, loc + '.' + str(k))
        elif isinstance(o, list):
            for i, v in enumerate(o):
                if isinstance(v, str) and tiene_moji(v):
                    r = reparar(v)
                    if r is not None:
                        o[i] = r
                        reparados.append(loc + '[' + str(i) + ']')
                    else:
                        fallidos.append((loc + '[' + str(i) + ']', v[:80]))
                elif isinstance(v, (dict, list)):
                    walk(v, loc + '[' + str(i) + ']')

    walk(data, '')
    json.dump(data, open(path, 'w', encoding='utf8'), ensure_ascii=False, indent=2)
    print(path.split('/')[-1], '| reparados:', len(reparados), '| fallidos:', len(fallidos))
    for r in reparados[:8]:
        print('   OK', r)
    for f in fallidos[:8]:
        print('   FAIL', f[0], '|', f[1])
    total += len(reparados)
print('TOTAL reparados:', total)
