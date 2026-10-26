import json, re, unicodedata

specs = json.load(open('temp/specs_guitars.json', encoding='utf-8'))
p = json.load(open('data/products.json', encoding='utf-8'))
pm = {x['id']: x for x in p}

STOP = set('in mm lb kg the of and with'.split())


def toks(s):
    s = unicodedata.normalize('NFKD', s or '')
    s = ''.join(c for c in s if not unicodedata.combining(c)).lower()
    s = s.replace('–', '-').replace('—', '-')
    words = re.findall(r'[a-z0-9.]+', s)
    return set(w for w in words if w not in STOP)


def essence(kind, v):
    t = toks(v)
    t.discard('')
    return frozenset(t)


for pid, kinds in sorted(specs.items(), key=lambda kv: int(kv[0])):
    conflicts = []
    for kind, vals in kinds.items():
        if len(vals) < 2:
            continue
        # group values that are supersets/subsets of each other
        groups = []
        for v in vals:
            tv = essence(kind, v)
            placed = False
            for gr in groups:
                if any(tv <= g or g <= tv for g in gr['toks']):
                    gr['toks'].append(tv)
                    gr['vals'].append(v)
                    placed = True
                    break
            if not placed:
                groups.append({'toks': [tv], 'vals': [v]})
        if len(groups) > 1:
            conflicts.append((kind, [g['vals'] for g in groups]))
    if conflicts:
        print(f"PID {pid} | {pm[int(pid)]['title']}")
        for kind, gs in conflicts:
            print(f"   !! {kind}: {gs}")
