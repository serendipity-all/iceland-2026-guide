import os

artifact_dir = r"C:\Users\delia_chang\.gemini\antigravity\brain\33ae99a4-095f-42c2-985e-1de9635c31d5"
cand_dir = os.path.join(artifact_dir, "verification_candidates")

candidates = [
    ("whale_watching_candidate.jpg", "西格夫德賞鯨 (Whale Watching)", "英文維基百科【Whale watching】主條目官方圖片（出海賞鯨船隻與鯨魚）"),
    ("blue_lagoon_candidate.jpg", "藍湖溫泉 (Blue Lagoon)", "英文維基百科【Blue Lagoon (Iceland)】主條目官方封面圖片（地熱牛奶藍溫泉）"),
    ("hallgrimskirkja_candidate.jpg", "哈爾格林姆教堂 (Hallgrímskirkja)", "英文維基百科【Hallgrímskirkja】主條目官方封面圖片（74.5m高正面教堂建築）"),
    ("seljalandsfoss_candidate.jpg", "水簾洞瀑布 (Seljalandsfoss)", "英文維基百科【Seljalandsfoss】主條目官方封面圖片（瀑布水幕與山壁）"),
    ("reynisfjara_candidate.jpg", "黑沙灘與海蝕柱 (Reynisfjara)", "英文維基百科【Reynisfjara】主條目官方封面圖片（玄武岩海蝕柱與黑沙灘）"),
    ("jokulsarlon_candidate.jpg", "傑古沙龍冰河湖 (Jökulsárlón)", "英文維基百科【Jökulsárlón】主條目官方封面圖片（藍色冰河湖與巨型浮冰）")
]

md = "# 經典景點維基百科官方原圖【反向權威來源驗證】\n\n"
md += "為確保 100% 絕對正確，以下所有照片皆直接自**英文維基百科（Wikipedia）主條目官方 Infobox 主圖**提取，絕不使用第三方圖庫或未驗證的關鍵字：\n\n"

for fname, name, source in candidates:
    fpath = os.path.join(cand_dir, fname).replace("\\", "/")
    md += f"### 📌 {name}\n"
    md += f"- **權威來源證明**：`{source}`\n"
    md += f"![{name}](file:///{fpath})\n\n"
    md += "---\n\n"

with open(os.path.join(artifact_dir, "candidate_gallery.md"), "w", encoding="utf-8") as f:
    f.write(md)

print("candidate_gallery.md created successfully!")
