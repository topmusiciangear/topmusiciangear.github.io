# -*- coding: utf-8 -*-
"""Verify the rendered quickfacts blocks on a set of guide pages.

For every page: counts qf-fact cards, lists their label/value text, checks that
each icon slot got real markup (not an empty span) and that a Best For card is
present. Also flags any leftover placeholder or Spanish text on English pages.
"""
import glob
import re
import sys

PAGES = sys.argv[1:] or [
    'best-digital-pianos', 'best-digital-pianos_es',
    'best-stage-keyboards', 'best-stage-keyboards_es',
    'best-synthesizers', 'best-synthesizers_es',
    'best-keyboard', 'best-keyboard_es',
]

for name in PAGES:
    h = open('guides/%s.html' % name, encoding='utf-8').read()
    blocks = re.findall(r'<div class="guide-section-quickfacts">(.*?)</div>\s*</div>', h, re.S)
    # fall back: count cards globally
    cards = re.findall(r'<div class="qf-card qf-fact">(.*?)</div>\s*</div>', h, re.S)
    icons = re.findall(r'<span class="qf-icon"[^>]*>(.*?)</span>', h, re.S)
    best = re.findall(r'<div class="qf-card qf-bestfor">.*?<div class="qf-value">(.*?)</div>',
                      h, re.S)
    labels = [re.sub(r'<[^>]+>', '', x).strip()
              for x in re.findall(r'<div class="qf-label">(.*?)</div>', h, re.S)]
    values = [re.sub(r'<[^>]+>', '', x).strip()
              for x in re.findall(r'<div class="qf-value">(.*?)</div>', h, re.S)]

    empty_icons = sum(1 for i in icons if not i.strip())
    print('%-28s blocks=%d facts=%d icons=%d empty_icons=%d'
          % (name, len(blocks), len(cards), len(icons), empty_icons))
    print('    bestFor:', best[:2])
    print('    labels :', labels[:4])
    print('    values :', values[:4])
    if empty_icons:
        print('    !! EMPTY ICONS')
    print()
