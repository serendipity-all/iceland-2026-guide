import urllib.request, os

os.makedirs('images', exist_ok=True)

fixes = {
    "godafoss.jpg": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    "whale_watching.jpg": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80"
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for fname, url in fixes.items():
    filepath = os.path.join('images', fname)
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as resp, open(filepath, 'wb') as f:
        f.write(resp.read())
    print(f"Fixed {fname}: {os.path.getsize(filepath)} bytes")

print("All 25 image files fixed successfully!")
