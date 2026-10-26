import re
import sys


def blocks(s):
    out = []
    for m in re.finditer(r'<div class="guide-section-quickfacts">', s):
        i = m.start()
        depth = 0
        j = i
        while j < len(s):
            if s.startswith('<div', j):
                depth += 1
                j += 4
                continue
            if s.startswith('</div>', j):
                depth -= 1
                j += 6
                if depth == 0:
                    break
                continue
            j += 1
        out.append(s[i:j])
    return out


for path in sys.argv[1:]:
    s = open(path, encoding='utf-8').read()
    bs = blocks(s)
    print('=' * 70)
    print(path, '| blocks:', len(bs))
    for b in bs[:3]:
        vals = re.findall(r'<div class="qf-value">([^<]*)</div>', b)
        labs = re.findall(r'<div class="qf-label">([^<]*)</div>', b)
        custom = re.findall(r'viewBox="0 0 24 16"', b)
        fa = re.findall(r'fa-solid', b)
        print('   ', list(zip(labs, vals)), '| custom:', len(custom), 'fa:', len(fa))
