with open('guides/pro-microphones_es.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Directly search for the intro/section content that shows product comparisons
# Look at the sections area
idx = content.find('Estos dos micrófonos')
if idx < 0:
    idx = content.find('definen el nivel')
if idx >= 0:
    start = max(0, idx - 50)
    end = min(len(content), idx + 500)
    print('Section text:')
    print(content[start:end])
else:
    # Maybe the prices are in a different encoding
    idx = content.find('Estos dos micr')
    if idx >= 0:
        start = max(0, idx - 50)
        end = min(len(content), idx + 500)
        print('Section text (with encoding):')
        print(content[start:end])
    else:
        print('Not found in any form')

# Also check for the $ sign occurrences
count = content.count('$3,599')
print(f'\n$3,599 occurrences: {count}')
count = content.count('$10,999')
print(f'$10,999 occurrences: {count}')
count = content.count(',599')
print(f',599 occurrences: {count}')
count = content.count(',999')
print(f',999 occurrences: {count}')
