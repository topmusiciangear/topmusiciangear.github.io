import re

d = open('temp/mic_tables_full.txt', encoding='utf-8').read()
pids = ['675', '364', '365', '366', '206', '207', '434', '226', '232', '360', '229', '231', '52', '51', '210', '227', '228', '213', '635', '636', '212', '214', '230', '215', '211', '298', '196', '197']
for pid in pids:
    m = re.search(r'(?m)^PID ' + pid + r'\s*$', d)
    if not m:
        print('PID', pid, '-- none --')
        continue
    nxt = re.search(r'(?m)^PID \d+\s*$', d[m.end():])
    blk = d[m.end(): m.end() + (nxt.start() if nxt else len(d))]
    print('PID', pid)
    for line in blk.splitlines():
        line = line.strip()
        if not line or ':' not in line:
            continue
        k = line.split(':')[0].strip()
        if k in ('Type', 'Polar Pattern', 'Frequency Response', 'Self-Noise', 'Max SPL', 'Connection'):
            print('   ', line[:180])
