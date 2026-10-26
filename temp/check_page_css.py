s = open('guides/at2020-vs-p120.html', 'r', encoding='utf-8').read()
# Look for stylesheet links
import re
m = re.search(r'href=.([^"]*\.css.)', s)
if m:
    print('CSS file link:', m.group(1))
else:
    print('No CSS file link found')
    
# Look for style tags
m2 = re.search(r'<style[^>]*>(.*?)</style>', s, re.S)
if m2:
    body = m2.group(1)
    checks = ['flex-direction:row', 'flex-wrap:wrap', 'width:50%', 'flex:1 1 100%']
    for c in checks:
        if c in body:
            print(f'Found in style tag: {c}')
    
    # Print first 300 chars of the style tag
    print('Style tag starts with:')
    print(body[:300])