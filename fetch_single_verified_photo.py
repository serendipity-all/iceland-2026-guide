import urllib.request, json, os, shutil

artifact_dir = r"C:\Users\delia_chang\.gemini\antigravity\brain\33ae99a4-095f-42c2-985e-1de9635c31d5"
os.makedirs(os.path.join(artifact_dir, "verification_candidates"), exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

# Direct canonical Wikipedia Commons images with authoritative article provenance:
spots_to_check = [
    {
        "id": "whale_watching",
        "title": "西格夫德峽灣賞鯨 (Whale Watching)",
        "wiki_article": "Whale watching in Iceland",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Humpback_Whale_Iceland.jpg/1280px-Humpback_Whale_Iceland.jpg",
        "provenance": "維基百科【Whale watching in Iceland】條目官方主圖（拍攝於冰島胡薩維克/北部峽灣之座頭鯨）"
    },
    {
        "id": "blue_lagoon",
        "title": "藍湖溫泉 (Blue Lagoon)",
        "wiki_article": "Blue Lagoon (Iceland)",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/3/38/17-08-04-Blaue-Lagune-RalfR-DSC_2422.jpg",
        "provenance": "維基百科【Blue Lagoon (Iceland)】條目官方拍攝地熱牛奶藍溫泉池"
    },
    {
        "id": "hallgrimskirkja",
        "title": "哈爾格林姆教堂 (Hallgrímskirkja)",
        "wiki_article": "Hallgrímskirkja",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8b/Hallgrimskirkja_mai_2016.jpg",
        "provenance": "維基百科【Hallgrímskirkja】條目官方拍攝74.5m正面幾何大教堂"
    }
]

for item in spots_to_check:
    fname = f"{item['id']}_candidate.jpg"
    dst = os.path.join(artifact_dir, "verification_candidates", fname)
    req = urllib.request.Request(item['image_url'], headers=headers)
    try:
        with urllib.request.urlopen(req) as resp, open(dst, 'wb') as f:
            f.write(resp.read())
        print(f"Downloaded {item['id']}: {os.path.getsize(dst)} bytes")
    except Exception as e:
        print(f"Error {item['id']}: {e}")

print("Candidate downloading complete!")
