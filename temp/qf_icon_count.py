import sys

path = sys.argv[1]
s = open(path, encoding='utf-8').read()
for name, sig in [
    ('chip', '<rect x="7" y="4" width="10" height="8"'),
    ('lock', '<rect x="6" y="7" width="12" height="8"'),
    ('custom16x24', 'viewBox="0 0 24 16"'),
]:
    print('%-12s %d' % (name, s.count(sig)))
