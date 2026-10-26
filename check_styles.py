with open('guides/at2020-vs-p120.html', encoding='utf-8') as f:
    c = f.read()

# Find all <style> blocks
import re
styles = re.findall(r'<style>(.*?)</style>', c, re.DOTALL)
for i, style in enumerate(styles):
    if 'guide-section-mediabuy' in style or 'guide-section-img' in style or 'guide-section-buy' in style:
        print(f'=== Style block {i} ===')
        print(style[:2000])
        print()