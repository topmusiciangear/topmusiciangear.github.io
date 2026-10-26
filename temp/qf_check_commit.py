import subprocess

raw = subprocess.run(
    ['git', 'show', 'HEAD:guides/best-beginner-electric-guitar.html'],
    capture_output=True).stdout.decode('utf-8')

print('overrides.css in committed page:', 'overrides.css?v=59' in raw)
print('custom qf svgs            :', raw.count('viewBox="0 0 24 16"'))
print('qf-value cards            :', raw.count('class="qf-value"'))
print('Best for card             :', 'qf-bestfor' in raw)
