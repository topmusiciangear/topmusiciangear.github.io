import os

files = ['js/translations.min.js', 'js/translations.v4.min.js']
for f in files:
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    # Replace Spanish "Producción" with "Top Gear"
    content = content.replace('catName_production:"Producci\xf3n"', 'catName_production:"Top Gear"')
    with open(f, 'w', encoding='utf-8') as fh:
        fh.write(content)
    print('Updated ' + f)
