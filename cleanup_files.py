# Clean up temporary files
import os
import shutil

files_to_remove = [
    'find_imgs.py',
    'find_img_context.py',
    'find_content_imgs.py',
    'find_sections.py',
    'check_guide.py',
    'fix_inline.py',
    'update_version.py',
    'update_version_final.py',
    'check_guide_css.py',
    'check_index.py',
    'get_full_css.py',
    'check_old_css.py',
    'css/style.css.backup',
    'css/style.min.css.backup',
    'css/style_corrected.css',
    'css/style_ba1acf2cb9.css',
]

for file in files_to_remove:
    if os.path.exists(file):
        if os.path.isdir(file):
            shutil.rmtree(file)
        else:
            os.remove(file)
        print(f"Removed: {file}")
    else:
        print(f"Not found: {file}")

print("Cleanup complete!")