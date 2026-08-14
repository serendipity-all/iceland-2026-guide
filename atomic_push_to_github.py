import os, json, base64, urllib.request

TOKEN = "YOUR_GITHUB_TOKEN_HERE"
REPO = "serendipity-all/iceland-2026-guide"
BRANCH = "main"

headers = {
    "Authorization": f"token {TOKEN}",
    "Accept": "application/vnd.github.v3+json",
    "User-Agent": "Antigravity-Deployer"
}

def api_call(url, data=None, method=None):
    req = urllib.request.Request(url, headers=headers)
    if data:
        req.data = json.dumps(data).encode('utf-8')
    if method:
        req.get_method = lambda: method
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode('utf-8'))

# 1. Get latest commit SHA on main
ref_data = api_call(f"https://api.github.com/repos/{REPO}/git/refs/heads/{BRANCH}")
parent_commit_sha = ref_data['object']['sha']

# 2. Get base tree SHA
commit_data = api_call(f"https://api.github.com/repos/{REPO}/git/commits/{parent_commit_sha}")
base_tree_sha = commit_data['tree']['sha']

# 3. Build tree items
files_to_push = [
    "index.html",
    "style.css",
    "app.js",
    "iceland_2026_guide_offline.html",
    "README.md"
]

if os.path.exists("images"):
    for img_file in os.listdir("images"):
        files_to_push.append(f"images/{img_file}")

tree_items = []
for path in files_to_push:
    if not os.path.exists(path):
        continue
    # Create blob
    with open(path, "rb") as f:
        content_b64 = base64.b64encode(f.read()).decode('utf-8')
    
    blob_res = api_call(f"https://api.github.com/repos/{REPO}/git/blobs", {
        "content": content_b64,
        "encoding": "base64"
    })
    tree_items.append({
        "path": path,
        "mode": "100644",
        "type": "blob",
        "sha": blob_res["sha"]
    })

# 4. Create new tree
new_tree = api_call(f"https://api.github.com/repos/{REPO}/git/trees", {
    "base_tree": base_tree_sha,
    "tree": tree_items
})

# 5. Create new commit
new_commit = api_call(f"https://api.github.com/repos/{REPO}/git/commits", {
    "message": "Atomic release: Verified Wikipedia photos + Live Editor & Cloud Sync",
    "tree": new_tree["sha"],
    "parents": [parent_commit_sha]
})

# 6. Update branch ref
api_call(f"https://api.github.com/repos/{REPO}/git/refs/heads/{BRANCH}", {
    "sha": new_commit["sha"]
}, method="PATCH")

print("\n🚀 ATOMIC COMMIT SUCCESSFUL!")
print(f"Commit SHA: {new_commit['sha']}")
print(f"Live URL: https://{REPO.split('/')[0]}.github.io/{REPO.split('/')[1]}/")
