import re
s = open('css/style.css', encoding='utf-8').read()
# Show line numbers and context around each guide-section-img rule
lines = s.split('\n')
for i, line in enumerate(lines):
    if '.guide-section-img' in line and ('{' in line or '.guide-section-img,' in line):
        ctx = '\n'.join(lines[max(0,i-3):i+8])
        print('=== LINE', i+1, '===')
        print(ctx)
        print()
