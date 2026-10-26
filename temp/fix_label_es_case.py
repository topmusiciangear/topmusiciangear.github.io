# -*- coding: utf-8 -*-
"""Normalise Spanish comparison-table row labels to sentence case.

Spanish capitalises only the first word of a label, so 'Consumo de Corriente'
or 'Característica Destacada' are wrong. Acronyms (DSP, SPL, FX) and very short
abbreviations (An, Al, Pr) keep their case. Also fixes the 'Diseno' -> 'Diseño'
typo found while auditing.

Only `label_es` is touched; `label` (English) and every cell value stay as they
are.
"""
import json
import re

PATH = 'data/guides.json'
WORD = re.compile(r"[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+")

FIX_TYPOS = {
    'Diseno del Puerto': 'Diseño del puerto',
}


def sentence_case(label):
    out = []
    last = 0
    idx = 0
    for m in WORD.finditer(label):
        w = m.group(0)
        out.append(label[last:m.start()])
        if idx == 0:
            # first word keeps whatever case it has
            out.append(w)
        elif (w.isupper() and len(w) >= 2) or len(w) <= 2:
            out.append(w)          # acronym or abbreviation
        else:
            out.append(w[0].lower() + w[1:])
        last = m.end()
        idx += 1
    out.append(label[last:])
    return ''.join(out)


guides = json.load(open(PATH, encoding='utf-8'))
changed = {}

for g in guides:
    pt = g.get('productTable') or {}
    for row in pt.get('rows', []):
        lab = row.get('label_es')
        if not lab:
            continue
        new = FIX_TYPOS.get(lab) or sentence_case(lab)
        if new != lab:
            row['label_es'] = new
            changed.setdefault((lab, new), set()).add(g['id'])

print('labels changed:', len(changed))
total = 0
for (old, new), gids in sorted(changed.items()):
    total += len(gids)
    print('  %-38s -> %-38s  (%d guides)' % (old, new, len(gids)))
print('row instances updated:', total)

open(PATH, 'w', encoding='utf-8', newline='').write(
    json.dumps(guides, ensure_ascii=False, indent=2) + '\n')
print('saved')
