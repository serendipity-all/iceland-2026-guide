import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

new_content = re.sub(r'src="images/([^"?]+)"', r'src="images/\1?v=20260813"', content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print('Updated index.html with cache-busting!')
