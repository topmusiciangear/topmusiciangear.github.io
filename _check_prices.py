with open('guides/pro-microphones_es.html', 'r', encoding='utf-8') as f:
    content = f.read()

import re
# Find all price-like patterns
prices = re.findall(r'[\$€£]\d+[\d,.]*|\(\$[\d,]+\)|3,599|10,999|599|999', content)
print('Price matches found:', prices[:20])

# Check for the exact pattern the user mentioned
if ',599' in content and '$3,599' not in content:
    print('ISSUE: Found ,599 without $3 prefix')
if ',999' in content and '$10,999' not in content:
    print('ISSUE: Found ,999 without $10 prefix')

# Show context around where prices should be
for marker in ['3,599', ',599', '10,999', ',999', 'U 87']:
    idx = content.find(marker)
    if idx >= 0:
        start = max(0, idx - 50)
        end = min(len(content), idx + 50)
        print(f'Context around \"{marker}\": ...{content[start:end]}...')
