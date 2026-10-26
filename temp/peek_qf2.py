import re
for path in ['guides/best-mic-for-podcasting.html', 'guides/best-mic-for-podcasting_es.html']:
    s = open(path, encoding='utf-8').read()
    print('=====', path)
    for chunk in s.split('guide-section-quickfacts">')[1:]:
        blk = chunk.split('</div>\n<div class="store-buttons">')[0]
        blk = chunk.split('store-buttons')[0]
        best = re.search(r'qf-bestfor">\s*<div class="qf-label">([^<]*)</div>\s*<div class="qf-value">([^<]*)</div>', blk)
        vals = re.findall(r'<div class="qf-value">([^<]*)</div>\s*<div class="qf-label">([^<]*)</div>', blk)
        print(' bestFor:', best.group(2) if best else '?')
        for v, l in vals:
            print('   -', v, '|', l)
