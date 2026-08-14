with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()
with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()
with open('data.js', 'r', encoding='utf-8') as f:
    data_js = f.read()
with open('app.js', 'r', encoding='utf-8') as f:
    app_js = f.read()

offline = html.replace('<link rel="stylesheet" href="style.css" />', f'<style>\n{css}\n</style>')
offline = offline.replace('<script src="data.js"></script>', f'<script>\n{data_js}\n</script>')
offline = offline.replace('<script src="app.js"></script>', f'<script>\n{app_js}\n</script>')

with open('iceland_2026_guide_offline.html', 'w', encoding='utf-8') as f:
    f.write(offline)

print('Updated iceland_2026_guide_offline.html successfully!')
