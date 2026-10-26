import json, re, unicodedata

g = json.load(open('data/guides.json', encoding='utf-8'))
p = json.load(open('data/products.json', encoding='utf-8'))
mapping = json.load(open('temp/qf_table_map.json', encoding='utf-8'))

def norm(s):
    s = unicodedata.normalize('NFKD', s or '')
    s = ''.join(c for c in s if not unicodedata.combining(c))
    s = s.lower()
    s = re.sub(r'[^a-z0-9]+', ' ', s).strip()
    return s

rows_by_pid = {}
for guide in g:
    pt = guide.get('productTable') or {}
    if guide.get('category') != 'microphones':
        continue
    for gid, idx, title, pid in mapping:
        if gid != guide['id'] or not pid:
            continue
        for row in pt.get('rows') or []:
            vals = row.get('values') or []
            if idx < len(vals) and isinstance(vals[idx], dict):
                v = (vals[idx].get('value') or '').strip()
                if v:
                    rows_by_pid.setdefault(pid, {}).setdefault(row.get('label'), []).append(v)

def first(pid, *labels):
    rows = rows_by_pid.get(pid, {})
    for lab in rows:
        for want in labels:
            if norm(lab) == norm(want):
                return rows[lab][0]
    return None

def type_word(pid):
    t = first(pid, 'Type')
    src = t or first(pid, 'Mic Capsule') or ''
    n = norm(src)
    if not n:
        return None
    if 'ribbon' in n:
        return 'Ribbon'
    if 'dynamic' in n:
        return 'Dynamic'
    if 'condenser' in n:
        return 'Condenser'
    if 'wireless' in n or 'digital uhf' in n or 'analog uhf' in n:
        return 'Wireless'
    return None

def pattern_word(pid):
    pat = first(pid, 'Polar Pattern')
    n = norm(pat or '')
    if not n:
        cap = norm(first(pid, 'Mic Capsule') or '')
        for w, out in (('hypercardioid', 'Hypercardioid'), ('supercardioid', 'Supercardioid'),
                       ('cardioid', 'Cardioid'), ('omni', 'Omni')):
            if w in cap:
                return out
        return None
    if 'multi pattern' in n or '9 patterns' in n or n.startswith('switchable') or 'variable' in n:
        m = re.search(r'(\d+)\s*patterns', n)
        if m:
            return m.group(1) + ' patterns'
        return 'Multi-pattern'
    if 'lobar' in n:
        return 'Lobar'
    if 'figure 8' in n:
        return 'Figure-8'
    if 'supercardioid' in n:
        return 'Supercardioid'
    if 'hypercardioid' in n:
        return 'Hypercardioid'
    if 'cardioid' in n:
        return 'Cardioid'
    if 'omni' in n:
        return 'Omni'
    return None

NUM = re.compile(r'\d')

def selfnoise(pid):
    v = first(pid, 'Self-Noise', 'Self-noise')
    if not v or not NUM.search(v):
        return None
    n = norm(v)
    if 'n a' in n:
        return None
    if 'not' in n and 'published' in n:
        return None
    m = re.search(r'(\d+(?:[.,]\d+)?)\s*(?:d\s*b)', n)
    if not m:
        return None
    return m.group(1).replace(',', '.') + ' dB-A'

def spl(pid):
    v = first(pid, 'Max SPL')
    if not v:
        return None
    n = norm(v)
    if 'not' in n and 'published' in n:
        return None
    if 'commonly cited' in n and 'not official' in n:
        return None
    m = re.search(r'(\d{2,3})\s*d\s*b', n)
    if not m:
        return None
    val = m.group(1)
    if val == '0':
        return None
    return val + ' dB'

def freq(pid):
    v = first(pid, 'Frequency Response')
    if not v:
        return None
    m = re.search(r'(\d+)\s*hz\s*[-–]\s*(\d+(?:[.,]\d+)?)\s*k\s*hz', norm(v))
    if not m:
        return None
    lo, hi = m.group(1), m.group(2).replace(',', '.')
    return f"{lo} Hz – {hi} kHz"

def band(pid):
    t = first(pid, 'Technology')
    n = norm(t or '')
    if 'uhf' in n:
        return 'UHF'
    if '2 4' in n or '2.4' in (t or ''):
        return '2.4 GHz'
    return None

def sample(pid):
    v = first(pid, 'Bit Depth / Sample Rate')
    if not v:
        return None
    n = norm(v)
    if 'not' in n and 'published' in n:
        return None
    m = re.search(r'(\d+)\s*bit\s*(\d+(?:\.\d+)?)\s*khz', n)
    if not m:
        return None
    return f"{m.group(1)}-bit/{m.group(2)} kHz"

proposals = {}
for prod in p:
    if not prod.get('facts') or prod.get('category') != 'microphones':
        continue
    pid = prod['id']
    t = type_word(pid)
    pat = pattern_word(pid)
    if not t or not pat:
        proposals[pid] = {'incomplete': True, 'type': t, 'pattern': pat}
        continue
    third = None
    if selfnoise(pid):
        third = (selfnoise(pid), 'Self-noise', 'volumeHigh')
    elif spl(pid):
        third = (spl(pid), 'Max SPL', 'gauge')
    elif freq(pid):
        third = (freq(pid), 'Frequency range', 'wave')
    elif sample(pid):
        third = (sample(pid), 'Sample rate', 'sliders')
    elif band(pid):
        third = (band(pid), 'Band', 'wave')
    proposals[pid] = {'incomplete': False, 'type': t, 'pattern': pat, 'third': third}

json.dump(proposals, open('temp/qf_proposals.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

lines = []
for prod in p:
    if prod.get('category') != 'microphones' or not prod.get('facts'):
        continue
    pid = prod['id']
    pr = proposals[pid]
    ours = [(f['value'], f['label'].get('en', '')) for f in prod['facts']]
    if pr['incomplete']:
        lines.append(f"[NO TABLE] {pid} {prod['title']} :: ours={ours} type={pr['type']} pat={pr['pattern']}")
    else:
        third = pr['third']
        lines.append(f"{pid} {prod['title'][:55]} :: ours={ours} -> {pr['type']} / {pr['pattern']} / {third}")
open('temp/qf_proposal_list.txt', 'w', encoding='utf-8').write('\n'.join(lines))
print('\n'.join(lines))
