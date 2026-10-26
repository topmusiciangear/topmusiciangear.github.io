# -*- coding: utf-8 -*-
"""Replace the accented Spanish "vía" with the English "via" in EN fields only.

English does not accent "via", so an accented one on an English page reads like a
machine translation. In Spanish fields "vía" is correct, so those are never
touched: the walker skips every key named "es" or ending in "_es" (and therefore
"value_es", "faq_a2_es", "content_es", ...).

Word boundary matters: "vía" must be its own word, so words that merely contain
the letters (none here) are left alone.

Run:  python temp/fix_via_en.py
"""
import json
import re

PATH = 'data/guides.json'

BEFORE = 0
AFTER = 0


def fix(s):
    global BEFORE, AFTER
    n_before = len(re.findall(r'\bvía\b', s)) + len(re.findall(r'\bVía\b', s))
    if not n_before:
        return s
    BEFORE += n_before
    s2 = re.sub(r'\bvía\b', 'via', s)
    s2 = re.sub(r'\bVía\b', 'Via', s2)
    left = len(re.findall(r'\bvía\b', s2)) + len(re.findall(r'\bVía\b', s2))
    AFTER += left
    return s2


def walk(node):
    if isinstance(node, dict):
        for k in list(node.keys()):
            if k == 'es' or k.endswith('_es'):
                continue
            node[k] = walk(node[k])
        return node
    if isinstance(node, list):
        return [walk(v) for v in node]
    if isinstance(node, str):
        return fix(node)
    return node


guides = json.load(open(PATH, encoding='utf-8'))
walk(guides)

open(PATH, 'w', encoding='utf-8', newline='').write(
    json.dumps(guides, ensure_ascii=False, indent=2) + '\n')

print('replaced:', BEFORE)
print('left in EN fields:', AFTER)
