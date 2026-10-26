# -*- coding: utf-8 -*-
"""Detail: podcast spelling in Spanish, and every 'home studio' inside ES text."""
import json
import re

guides = json.load(open('data/guides.json', encoding='utf-8'))

with_accent = re.compile(r'pódcast', re.I)
without = re.compile(r'\bpodcast\b', re.I)
home = re.compile(r'home studio', re.I)


def es_strings(g):
    for field in ('title_es', 'metaDesc_es', 'intro_es', 'conclusion_es', 'verdict_es'):
        if g.get(field):
            yield field, g[field]
    for i, s in enumerate(g.get('sections') or []):
        for field in ('heading_es', 'body_es'):
            if s.get(field):
                yield 'sections[%d].%s' % (i, field), s[field]
    for i, q in enumerate(g.get('faq') or []):
        for field in ('q_es', 'a_es'):
            if q.get(field):
                yield 'faq[%d].%s' % (i, field), q[field]
    for key in ('pros_es', 'cons_es'):
        for i, x in enumerate(g.get(key) or []):
            yield '%s[%d]' % (key, i), x


n_acc = n_plain = 0
for g in guides:
    for where, text in es_strings(g):
        n_acc += len(with_accent.findall(text))
        n_plain += len(without.findall(text))

print('ES text: "pódcast" %d   "podcast" (no accent) %d' % (n_acc, n_plain))
print()

print('"home studio" inside Spanish guide fields:')
for g in guides:
    for where, text in es_strings(g):
        for m in home.finditer(text):
            a = max(0, m.start() - 70)
            b = min(len(text), m.end() + 70)
            print('  %-32s %-18s ...%s...' % (g['id'], where,
                                              text[a:b].replace('\n', ' ')))
