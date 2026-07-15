import re, os
for f in ['ableton-vs-fl-studio_es.html', 'sm57-vs-sm58_es.html', 'adam-vs-genelec_es.html']:
    path = os.path.join('C:/Users/Daniel/projects/topmusiciangear/guides', f)
    html = open(path, 'r', encoding='utf-8').read()
    names = re.findall(r'guide-product-card-title">([^<]+)<', html)
    print(f, names)
