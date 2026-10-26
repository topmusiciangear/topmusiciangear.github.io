import requests, re, json, sys, difflib
from urllib.parse import urljoin

BASE = "https://topmusiciangear.com"
EN_URL = "https://topmusiciangear.com/guides/at2020-vs-p120.html"
ES_URL = "https://topmusiciangear.com/guides/at2020-vs-p120_es.html"

def fetch(url):
    r = requests.get(url, timeout=10, headers={'User-Agent': 'Mozilla/5.0'})
    r.raise_for_status()
    return r.text

def extract_css_links(html, base):
    # find <link rel="stylesheet" ...>
    links = re.findall(r'<link[^>]+rel=["\']stylesheet["\'][^>]*href=["\']([^"\']+)["\']', html, re.IGNORECASE)
    return [urljoin(base, href) for href in links]

def extract_inline_styles(html):
    # find <style>...</style>
    return re.findall(r'<style[^>]*>(.*?)</style>', html, re.DOTALL | re.IGNORECASE)

def extract_font_faces(css_text):
    # find @font-face blocks
    return re.findall(r'@font-face\s*\{[^}]+\}', css_text, re.DOTALL)

def extract_font_families(css_text):
    # find font-family declarations
    return re.findall(r'font-family\s*:\s*([^;}]+)', css_text, re.IGNORECASE)

def extract_font_display(css_text):
    # find font-display property
    return re.findall(r'font-display\s*:\s*([^;}]+)', css_text, re.IGNORECASE)

def extract_font_preload(html):
    # find <link rel="preload" as="font" ...>
    return re.findall(r'<link[^>]+rel=["\']preload["\'][^>]*as=["\']font["\'][^>]*href=["\']([^"\']+)["\']', html, re.IGNORECASE)

def fetch_css(url):
    try:
        r = requests.get(url, timeout=10, headers={'User-Agent': 'Mozilla/5.0'})
        r.raise_for_status()
        return r.text
    except Exception as e:
        return f"ERROR: {e}"

def audit_page(url, label):
    print(f"\n=== {label} ===")
    html = fetch(url)
    # CSS links
    css_links = extract_css_links(html, BASE)
    print(f"CSS links ({len(css_links)}):")
    for link in css_links:
        print(f"  {link}")
    # inline styles
    inline_styles = extract_inline_styles(html)
    print(f"Inline style blocks: {len(inline_styles)}")
    for i, s in enumerate(inline_styles):
        if len(s) > 200:
            print(f"  block {i}: {len(s)} chars")
            # check for font-face
            if '@font-face' in s:
                print("   -> contains @font-face")
            if ':root' in s:
                print("   -> contains :root")
    # font preload
    preloads = re.findall(r'<link[^>]+rel=["\']preload["\'][^>]*as=["\']font["\'][^>]*href=["\']([^"\']+)["\']', html, re.IGNORECASE)
    if preloads:
        print(f"Font preloads: {preloads}")
    else:
        print("No font preloads")
    # inline style font-face?
    for i, s in enumerate(extract_inline_styles(html)):
        if '@font-face' in s:
            print(f"Inline style block {i} contains @font-face")
    # check for font-family in inline styles
    for i, s in enumerate(extract_inline_styles(html)):
        fams = re.findall(r'font-family\s*:\s*([^;}]+)', s, re.IGNORECASE)
        if fams:
            print(f"Inline block {i} font-family: {fams}")

    # fetch CSS files
    css_urls = [urljoin(BASE, link) for link in extract_css_links(html, BASE)]
    for css_url in css_urls:
        css_text = fetch_css(urljoin(BASE, css_url))
        if css_text.startswith("ERROR"):
            print(f"  CSS fetch error: {css_text}")
            continue
        # font-face
        faces = extract_font_faces(css_text)
        print(f"CSS {css_url}: @font-face blocks: {len(faces)}")
        for face in faces:
            # extract font-family and font-display
            fam = re.search(r'font-family\s*:\s*([^;}]+)', face, re.IGNORECASE)
            disp = re.search(r'font-display\s*:\s*([^;}]+)', face, re.IGNORECASE)
            fam_str = fam.group(1).strip() if fam else 'unknown'
            disp_str = disp.group(1).strip() if disp else 'none'
            print(f"  font-family: {fam_str}, font-display: {disp_str}")
        # font-display occurrences
        disp_all = re.findall(r'font-display\s*:\s*([^;}]+)', css_text, re.IGNORECASE)
        if disp_all:
            print(f"  font-display values: {set(disp_all)}")
        # font-family usage
        families = extract_font_families(css_text)
        if families:
            print(f"  font-family usages (sample): {list(set(families))[:10]}")
    print("\n")

def main():
    print("Fetching EN page...")
    en_html = fetch(EN_URL)
    print("Fetching ES page...")
    es_html = fetch(ES_URL)

    audit_page(EN_URL, "EN")
    audit_page(ES_URL, "ES")

    # compare CSS files
    # get CSS links from EN (should be same)
    en_css_links = extract_css_links(fetch(EN_URL), BASE)
    es_css_links = extract_css_links(fetch(ES_URL), BASE)
    print(f"EN CSS links: {en_css_links}")
    print(f"ES CSS links: {es_css_links}")

if __name__ == "__main__":
    main()