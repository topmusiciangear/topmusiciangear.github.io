import json, re, unicodedata

g = json.load(open('data/guides.json', encoding='utf-8'))
mapping = json.load(open('temp/qf_table_map.json', encoding='utf-8'))

def norm(s):
    s = unicodedata.normalize('NFKD', s or '')
    s = ''.join(c for c in s if not unicodedata.combining(c))
    s = s.lower()
    s = re.sub(r'[^a-z0-9]+', ' ', s).strip()
    return s

# gather ALL rows per product (unfiltered)
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
                    rows_by_pid.setdefault(pid, {}).setdefault(row.get('label'), set()).add(v)

out = []
for pid in sorted(rows_by_pid):
    out.append(f"PID {pid}")
    for lab, vals in rows_by_pid[pid].items():
        out.append(f"   {lab}: {' | '.join(sorted(vals))}")
open('temp/mic_tables_full.txt', 'w', encoding='utf-8').write('\n'.join(out))
print('written', len(rows_by_pid))
