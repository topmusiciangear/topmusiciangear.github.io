# -*- coding: utf-8 -*-
"""Count the custom quickfact icon signatures in a generated page."""
import sys

SIGS = [
    ('cone', 'M3 8 L 19 3.5'),
    ('speaker', 'r="6.4"'),
    ('signal', 'M5.8 5.5'),
    ('battery', 'width="15.5"'),
    ('chip', 'width="10" height="8"'),
    ('lock', 'width="12" height="8"'),
]

for path in sys.argv[1:]:
    s = open(path, encoding='utf-8').read()
    counts = ', '.join('%s=%d' % (n, s.count(sig)) for n, sig in SIGS)
    print('%-40s %s' % (path.split('/')[-1], counts))
