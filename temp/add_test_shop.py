import re
txt=open('build-guides.js',encoding='utf-8').read()
# Find insertion point before closing }
# We know line with "1039:" ... then blank line then "  };function"
# Insert new entry after 1039 line
pattern=r'(1039:\s*\{[^}]+\},)\s*\n\s*\};function'
replacement=r'\1\n  1055: {prices:{gear4music:"£179.00",amazon:"$199.00",zzounds:"$199.00"}},\n  };function'
new_txt=re.sub(pattern, replacement, txt, flags=re.S)
open('build-guides.js','w',encoding='utf-8').write(new_txt)
print('done')
