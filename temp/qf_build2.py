import json, re, collections

txt = open('temp/mic_tables_full.txt', encoding='utf-8').read()
blocks = re.split(r'(?m)^PID (\d+)\s*$', txt)
tables = collections.defaultdict(lambda: collections.defaultdict(list))
for i in range(1, len(blocks) - 1, 2):
    pid = int(blocks[i]); body = blocks[i + 1]
    for line in body.splitlines():
        line = line.strip()
        if ':' not in line:
            continue
        k, v = line.split(':', 1)
        tables[pid][k.strip()].append(v.strip())

def first(pid, row):
    vals = tables[pid].get(row) or []
    vals = [v for v in vals if v and v.lower() not in ('', '-')]
    if not vals:
        return ''
    # shortest non-placeholder value
    def ok(v):
        lv = v.lower()
        return not ('not published' in lv or lv.startswith('n/a') or 'not officially' in lv or 'not specified' in lv)
    good = [v for v in vals if ok(v)]
    return (good or vals)[0]

def head(v):
    return re.split(r'\s*\|\s*', v)[0].strip()

BAD = ('not published', 'n/a', 'not officially', '~', 'est.')

def num(v):
    m = re.search(r'(\d+(?:\.\d+)?)\s*dB', v or '')
    return m.group(1) if m else None

def freq(v):
    v = head(v)
    if not v or any(b in v.lower() for b in BAD):
        return ''
    v = v.replace('–', '-').replace('—', '-')
    m = re.search(r'(\d+(?:\.\d+)?)\s*(Hz|kHz)\s*-\s*(\d+(?:\.\d+)?)\s*(Hz|kHz)', v, re.I)
    if not m:
        return ''
    lo, lu, hi, hu = m.groups()
    return '%s %s\u2013%s %s' % (lo, lu.lower().replace('hz', 'Hz').replace('khz', 'kHz'), hi, hu.lower().replace('hz', 'Hz').replace('khz', 'kHz'))

p = json.load(open('data/products.json', encoding='utf-8'))
out = []
for x in p:
    if x.get('category') != 'microphones':
        continue
    pid = x['id']
    facts = x.get('facts') or []
    if len(facts) < 3:
        out.append((pid, x['title'], 'NO-FACTS', '', ''))
        continue
    cur = facts[2]
    curlab = cur.get('label', {}).get('en', '')
    noise = first(pid, 'Self-Noise')
    spl = first(pid, 'Max SPL')
    fr = first(pid, 'Frequency Response')
    cand = None
    n = num(noise)
    if n and n != '0':
        cand = (n + ' dB-A', 'Self-noise')
    else:
        n2 = num(spl)
        if n2 and '~' not in head(spl) and 'est' not in head(spl).lower():
            cand = (n2 + ' dB', 'Max SPL')
        else:
            f = freq(fr)
            if f:
                cand = (f, 'Frequency range')
    if not cand:
        out.append((pid, x['title'], 'KEEP-NO-DATA', cur.get('value', ''), curlab + ' [table noise=%s spl=%s fr=%s]' % (head(noise), head(spl), head(fr))))
        continue
    val, lab = cand
    if curlab == lab and cur.get('value', '').replace('-', '\u2013') == val.replace('-', '\u2013'):
        continue
    out.append((pid, x['title'], cur.get('value', '') + ' (' + curlab + ')', '-> ' + val + ' (' + lab + ')', ''))

lines = []
for pid, title, a, b, c in out:
    lines.append('%s :: %s :: %s :: %s %s' % (pid, title[:46], a, b, c))
open('temp/qf_third_proposals.txt', 'w', encoding='utf-8').write('\n'.join(lines))
print('proposals:', len(out))
