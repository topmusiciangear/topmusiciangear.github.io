# -*- coding: utf-8 -*-
"""Show the markup of one quickfact block so the icon + label structure is visible."""
import re
import sys

path = sys.argv[1]
needle = sys.argv[2] if len(sys.argv) > 2 else 'Current draw'
h = open(path, encoding='utf-8').read()
i = h.find(needle)
print(re.sub(r'\s+', ' ', h[max(0, i - 900):i + 120]))
print()
print('svg viewBoxes in first 12 qf blocks:',
      re.findall(r'viewBox="([^"]+)"', h)[:12])
