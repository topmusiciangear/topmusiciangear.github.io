# -*- coding: utf-8 -*-
"""List Spanish table row labels that break the sentence-case rule.

Spanish only capitalises the first word of a label (plus acronyms and brand
names), so a label like 'Consumo de Corriente' or 'Característica Destacada'
is wrong. Prints distinct labels with the guides that use them.
"""
import json
import re
from collections import defaultdict

ACRONYMS = {
    'DSP', 'USB', 'XLR', 'MIDI', 'SPL', 'EQ', 'FX', 'DAW', 'VST', 'PA', 'IEM',
    'TS', 'TRS', 'ADAT', 'CV', 'LED', 'LCD', 'OLED', 'RAM', 'CPU', 'Hz', 'kHz',
    'MHz', 'dB', 'BBD', 'II', 'III', 'IV', 'UHF', 'RF', 'AM', 'FM', 'AC', 'DC',
    'BT', 'USB-C', 'iOS', 'OS', 'AA', 'AAA', 'V', 'W', 'mA', 'kg', 'lb', 'mm',
}

guides = json.load(open('data/guides.json', encoding='utf-8'))
hits = defaultdict(list)

for g in guides:
    pt = g.get('productTable') or {}
    for row in pt.get('rows', []):
        lab = row.get('label_es')
        if not lab:
            continue
        words = re.findall(r"[A-Za-zÁÉÍÓÚÜÑáéíóúüñ][\wÁÉÍÓÚÜÑáéíóúüñ\-']*", lab)
        # words after the first that start with a capital but are not acronyms
        caps = [w for w in words[1:]
                if w[0].isupper() and w not in ACRONYMS and not w.isupper()]
        if caps:
            hits[lab].append((g['id'], caps))

print('distinct offending labels:', len(hits))
for lab, where in sorted(hits.items(), key=lambda kv: -len(kv[1])):
    print('  %-32s x%-3d  e.g. %s' % (lab, len(where),
                                       ', '.join(sorted({c for _, cs in where for c in cs}))))
    gids = sorted({g for g, _ in where})
    print('       ', ', '.join(gids[:6]) + (' ...' if len(gids) > 6 else ''))
