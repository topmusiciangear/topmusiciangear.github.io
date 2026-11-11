import re
files = ['best-parlor-guitars_es.html', 'channel-strip-plugins_es.html', 'tuners-bass-guitar_es.html', 'american-pro-vs-les-paul_es.html']
for f in files:
    d = open('C:/Users/Daniel/projects/topmusiciangear/guides/' + f, encoding='utf8').read()
    m = re.search(r'<meta name="description" content="([^"]+)"', d)
    print(f[:34], '->', m.group(1)[:130] if m else 'SIN DESC')
