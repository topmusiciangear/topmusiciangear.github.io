with open('guides/pro-microphones_es.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the meta description
import re
for m in re.finditer(r'<meta[^>]+description[^>]*>', content):
    print(m.group()[:200])
    print()

# Find the og:description
for m in re.finditer(r'og:description[^>]*content="([^"]+)"', content):
    print('og:desc:', m.group(1)[:200])
    print()

# Look for the intro text on the page
idx = content.find('guide-detail-intro')
if idx >= 0:
    print('Found guide-detail-intro at', idx)
    print(content[idx:idx+500])
else:
    # Try to find any section with U 87
    idx = content.find('U 87')
    if idx >= 0:
        start = max(0, idx - 200)
        end = min(len(content), idx + 300)
        print(content[start:end])
