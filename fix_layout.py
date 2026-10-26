#!/usr/bin/env python3
"""
Comprehensive fix for guide section layout issues.
This script will fix:
1. Guide section photo/text alignment on both PC and mobile
2. Photo sizing consistency
3. Product grid layout
4. Responsive behavior
"""

import re

def fix_guide_layout():
    print("🔧 Fixing guide section layout issues...")
    
    # Read current CSS
    with open('css/style.css', encoding='utf-8') as f:
        css = f.read()
    
    # Step 1: Fix guide section PC layout
    print("1. Fixing guide section PC layout...")
    
    # Add proper guide section PC flex layout
    if '.guide-section { display: flex;' not in css:
        # Find guide-section rule and add flex properties
        guide_section_match = re.search(r'\.guide-section\s*\{([^}]+)\}', css)
        if guide_section_match:
            current_styles = guide_section_match.group(1)
            if 'display: flex' not in current_styles:
                # Add flex properties to guide-section
                new_styles = current_styles + '\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n  align-items: flex-start;\n  margin-bottom: 20px;'
                css = css[:guide_section_match.start(1)] + '.guide-section {' + new_styles + '\n}' + css[guide_section_match.end(1):]
    
    # Fix guide-section-heading
    if '.guide-section-heading { width: 100%; order: 0;' not in css:
        guide_heading_match = re.search(r'\.guide-section-heading\s*\{([^}]+)\}', css)
        if guide_heading_match:
            current_styles = guide_heading_match.group(1)
            new_styles = current_styles + '\n  width: 100%;\n  order: 0;\n  margin-bottom: 12px;'
            css = css[:guide_heading_match.start(1)] + '.guide-section-heading {' + new_styles + '\n}' + css[guide_heading_match.end(1):]
    
    # Fix guide-section-content
    if '.guide-section-content { flex: 0 0 340px; max-width: 340px;' not in css:
        guide_content_match = re.search(r'\.guide-section-content\s*\{([^}]+)\}', css)
        if guide_content_match:
            current_styles = guide_content_match.group(1)
            new_styles = current_styles + '\n  flex: 0 0 340px;\n  max-width: 340px;\n  margin-top: 0;\n  order: 2;'
            css = css[:guide_content_match.start(1)] + '.guide-section-content {' + new_styles + '\n}' + css[guide_content_match.end(1):]
    
    # Fix guide-section-mediabuy
    if '.guide-section-mediabuy { flex: 1 1 300px; margin-top: 0;' not in css:
        mediabuy_match = re.search(r'\.guide-section-mediabuy\s*\{([^}]+)\}', css)
        if mediabuy_match:
            current_styles = mediabuy_match.group(1)
            new_styles = current_styles + '\n  flex: 1 1 300px;\n  order: 1;\n  margin-top: 0;'
            css = css[:mediabuy_match.start(1)] + '.guide-section-mediabuy {' + new_styles + '\n}' + css[mediabuy_match.end(1):]
    
    # Step 2: Fix mobile layout
    print("2. Fixing mobile layout...")
    
    # Ensure mobile media query exists and has correct rules
    if '@media (max-width: 640px) {' not in css:
        # Find where to add mobile media query
        body_match = re.search(r'body\s*\{[^}]+\}', css)
        if body_match:
            end_of_body = body_match.end(0)
            mobile_css = '''
@media (max-width: 640px) {
  .guide-section {
    display: block;
  }
  .guide-section-heading {
    width: 100%;
    order: 0;
    margin-bottom: 8px;
    font-size: 1.2rem;
  }
  .guide-section-mediabuy {
    flex-direction: column;
    width: 100%;
    margin-bottom: 12px;
  }
  .guide-section-mediabuy > .guide-section-imgs {
    width: 100%;
    margin-bottom: 12px;
  }
  .guide-section-mediabuy .guide-section-img,
  .guide-section-mediabuy .guide-video-thumb {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: contain;
    margin: 0;
  }
  .guide-section-mediabuy > .guide-section-buy {
    width: 100%;
    max-width: none;
    margin-top: 16px;
  }
  .guide-section-content {
    max-width: 100%;
    margin-top: 12px;
  }
}
'''
            css = css[:end_of_body] + mobile_css + css[end_of_body:]
    else:
        # Update existing mobile media query
        css = re.sub(
            r'@media \(max-width: 640px\)\s*\{[^}]+\}',
            '''@media (max-width: 640px) {
  .guide-section {
    display: block;
  }
  .guide-section-heading {
    width: 100%;
    order: 0;
    margin-bottom: 8px;
    font-size: 1.2rem;
  }
  .guide-section-mediabuy {
    flex-direction: column;
    width: 100%;
    margin-bottom: 12px;
  }
  .guide-section-mediabuy > .guide-section-imgs {
    width: 100%;
    margin-bottom: 12px;
  }
  .guide-section-mediabuy .guide-section-img,
  .guide-section-mediabuy .guide-video-thumb {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: contain;
    margin: 0;
  }
  .guide-section-mediabuy > .guide-section-buy {
    width: 100%;
    max-width: none;
    margin-top: 16px;
  }
  .guide-section-content {
    max-width: 100%;
    margin-top: 12px;
  }
}''',
            css,
            flags=re.DOTALL
        )
    
    # Step 3: Fix product grid
    print("3. Fixing product grid layout...")
    
    # Ensure guide-section-prods has proper grid styling
    if '.guide-section-prods { display: grid;' not in css:
        prods_match = re.search(r'\.guide-section-prods\s*\{([^}]+)\}', css)
        if prods_match:
            current_styles = prods_match.group(1)
            new_styles = current_styles + '\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 16px;\n  margin-top: 18px;'
            css = css[:prods_match.start(1)] + '.guide-section-prods {' + new_styles + '\n}' + css[prods_match.end(1):]
    
    # Ensure guide-section-prod has proper card styling
    if '.guide-section-prod { background: var(--bg-card); border: 1px solid var(--border);' not in css:
        prod_match = re.search(r'\.guide-section-prod\s*\{([^}]+)\}', css)
        if prod_match:
            current_styles = prod_match.group(1)
            new_styles = current_styles + '\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius);\n  padding: 16px;\n  transition: transform 0.2s ease;'
            css = css[:prod_match.start(1)] + '.guide-section-prod {' + new_styles + '\n}' + css[prod_match.end(1):]
    
    # Step 4: Fix guide-section-prod-imgs
    print("4. Fixing product image gallery...")
    
    if '.guide-section-prod-imgs { display: flex;' not in css:
        prod_imgs_match = re.search(r'\.guide-section-prod-imgs\s*\{([^}]+)\}', css)
        if prod_imgs_match:
            current_styles = prod_imgs_match.group(1)
            new_styles = current_styles + '\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n  margin-bottom: 12px;'
            css = css[:prod_imgs_match.start(1)] + '.guide-section-prod-imgs {' + new_styles + '\n}' + css[prod_imgs_match.end(1):]
    
    # Step 5: Add hover effects
    print("5. Adding hover effects...")
    
    # Add hover effect for guide-section-prod
    if '.guide-section-prod:hover {' not in css:
        hover_rule = '''
.guide-section-prod:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,.2);
  border-color: rgba(59,130,246,.3);
}
'''
        css = css + hover_rule
    
    # Step 6: Update minified CSS
    print("6. Updating minified CSS...")
    
    # Basic minification (simple version)
    minified = css
    # Remove comments
    minified = re.sub(r'/\*.*?\*/', '', minified, flags=re.DOTALL)
    # Remove extra whitespace
    minified = re.sub(r'\s+', ' ', minified)
    # Remove spaces around brackets and punctuation
    minified = re.sub(r'\s*([{}:;])\s*', r'\1', minified)
    minified = re.sub(r'\s*([>+]|<|~| |,|\.|, )\s*', r'\1', minified)
    
    with open('css/style.min.css', 'w', encoding='utf-8', newline='') as f:
        f.write(minified)
    
    # Write back main CSS
    with open('css/style.css', 'w', encoding='utf-8', newline='') as f:
        f.write(css)
    
    print("✅ Layout fixes completed!")
    return True

if __name__ == "__main__":
    fix_guide_layout()