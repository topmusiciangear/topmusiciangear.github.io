import urllib.request
import re
req = urllib.request.Request('https://topmusiciangear.com/guides/at2020-vs-p120.html')
resp = urllib.request.urlopen(req)
content = resp.read().decode('utf-8')
# Find style tags
m2 = re.search(r'<style[^>]*>(.*?)</style>', content, re.S)
if m2:
    print('Inline style found, first 500 chars:')
    print(m2.group(1)[:500])
else:
    print('No inline style found')
    # Look for any style attribute
    m3 = re.search(r'style=[\"\\'](.*?)[\"\\']', content)
    if m3:
        print('Found style attr')