import re, os
checks = {
    'sm57-vs-sm58_es.html': ['Ideal Para'],
    'adam-vs-genelec_es.html': ['Ideal Para'],
    'ableton-vs-fl-studio_es.html': ['Ideal Para'],
    'scarlett-vs-volt_es.html': ['Ideal Para'],
    'martin-d28-vs-taylor-314.html': ['Best For'],
    'apollo-vs-babyface.html': ['Best For'],
    'fabfilter-vs-ozone.html': ['Best For'],
    'pro-tools-vs-cubase_es.html': ['Ideal Para'],
}
for fname, patterns in checks.items():
    path = os.path.join(r'C:\Users\Daniel\projects\topmusiciangear\guides', fname)
    html = open(path, 'r', encoding='utf-8').read()
    print(f'=== {fname} ===')
    for p in patterns:
        for line in html.split('\n'):
            if p in line and ('td' in line or 'fs-label' in line):
                print(f'  {line.strip()}')
    print()
