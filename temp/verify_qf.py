import re, glob
targets = {
    '1.9 GHz': ['guides/wireless-intercom-systems.html'],
    'Figure-8': ['guides/best-ribbon-microphones.html'],
    'Hypercardioid': ['guides/best-ribbon-microphones.html'],
}
for val, files in targets.items():
    for f in files:
        try:
            s = open(f, encoding='utf-8').read()
        except FileNotFoundError:
            print('missing', f)
            continue
        print(f, '|', val, '->', s.count(val), '| Rango de frecuencia ->', s.count('Rango de frecuencia'))
# list a few mic guides that contain qf labels
n = 0
for f in glob.glob('guides/*.html'):
    if f.endswith('_es.html'):
        continue
    s = open(f, encoding='utf-8').read()
    if 'Frequency range' in s:
        n += 1
print('EN guides showing "Frequency range":', n)
