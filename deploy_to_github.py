import os, json, base64, urllib.request, time

TOKEN = "YOUR_GITHUB_TOKEN_HERE"
REPO = "serendipity-all/iceland-2026-guide"
BRANCH = "main"

headers = {
    "Authorization": f"token {TOKEN}",
    "Accept": "application/vnd.github.v3+json",
    "User-Agent": "Antigravity-Deployer"
}

files_to_upload = [
    "index.html",
    "style.css",
    "data.js",
    "app.js",
    "README.md"
]

if os.path.exists("images"):
    for img_file in os.listdir("images"):
        files_to_upload.append(f"images/{img_file}")

def upload_file(path):
    if not os.path.exists(path):
        return
    url_get = f"https://api.github.com/repos/{REPO}/contents/{path}"
    req_get = urllib.request.Request(url_get, headers=headers)
    sha = None
    try:
        with urllib.request.urlopen(req_get) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            sha = data.get('sha')
    except Exception:
        pass
    
    with open(path, "rb") as f:
        content = base64.b64encode(f.read()).decode('utf-8')
    
    payload = {
        "message": f"Editorial Style Upgrade: {path}",
        "content": content,
        "branch": BRANCH
    }
    if sha:
        payload["sha"] = sha
        
    url_put = f"https://api.github.com/repos/{REPO}/contents/{path}"
    req_put = urllib.request.Request(url_put, data=json.dumps(payload).encode('utf-8'), headers=headers, method='PUT')
    try:
        with urllib.request.urlopen(req_put) as resp_put:
            print(f"SUCCESS {path}: status {resp_put.status}")
    except Exception as e:
        print(f"FAILED {path}: {e}")
    time.sleep(1.2)

for f in files_to_upload:
    upload_file(f)

print("\n🚀 EDITORIAL STYLE DEPLOYMENT COMPLETE!")
print(f"Check live site: https://{REPO.split('/')[0]}.github.io/{REPO.split('/')[1]}/")
