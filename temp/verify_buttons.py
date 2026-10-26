import re

for f in ('guides/best-bass-practice-amps_es.html', 'guides/best-bass-practice-amps.html',
          'guides/best-practice-amps_es.html', 'guides/best-practice-amps.html'):
    s = open(f, encoding='utf-8').read()
    print('===', f)
    for m in re.finditer(r'<a data-store="(gear4music|musicstore)"[^>]*href="([^"]+)"[^>]*>(.*?)</a>', s, re.S):
        body = m.group(3)
        txt = ' '.join(re.sub(r'<[^>]+>', ' ', body).split())
        if ('149' in txt and m.group(1) == 'gear4music') or ('379' in txt and m.group(1) == 'musicstore'):
            print(m.group(1), '|', txt)
            print('   href:', m.group(2)[:200])
