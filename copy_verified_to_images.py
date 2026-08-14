import os, shutil

artifact_dir = r"C:\Users\delia_chang\.gemini\antigravity\brain\33ae99a4-095f-42c2-985e-1de9635c31d5"
cand_dir = os.path.join(artifact_dir, "verification_candidates")
img_dir = "images"

mapping = {
    "blue_lagoon_candidate.jpg": "blue_lagoon.jpg",
    "hallgrimskirkja_candidate.jpg": "hallgrimskirkja.jpg",
    "seljalandsfoss_candidate.jpg": "seljalandsfoss.jpg",
    "skogafoss_candidate.jpg": "skogafoss.jpg",
    "reynisfjara_candidate.jpg": "reynisfjara.jpg",
    "fjadrargljufur_candidate.jpg": "fjadrargljufur.jpg",
    "jokulsarlon_candidate.jpg": "jokulsarlon.jpg",
    "diamond_beach_candidate.jpg": "diamond_beach.jpg",
    "akureyri_candidate.jpg": "akureyri.jpg",
    "godafoss_candidate.jpg": "godafoss.jpg",
    "dettifoss_candidate.jpg": "dettifoss.jpg",
    "krafla_viti_candidate.jpg": "krafla_viti.jpg",
    "hverir_candidate.jpg": "hverir.jpg",
    "whale_watching_candidate.jpg": "whale_watching.jpg",
    "lagarfljot_candidate.jpg": "lagarfljot.jpg",
    "seydisfjordur_candidate.jpg": "seydisfjordur.jpg",
    "bulandstindur_candidate.jpg": "bulandstindur.jpg",
    "sun_voyager_candidate.jpg": "sun_voyager.jpg",
    "harpa_candidate.jpg": "harpa.jpg",
    "thingvellir_candidate.jpg": "thingvellir.jpg",
    "strokkur_candidate.jpg": "strokkur.jpg",
    "gullfoss_candidate.jpg": "gullfoss.jpg",
    "kerid_candidate.jpg": "kerid.jpg",
    "sky_lagoon_candidate.jpg": "sky_lagoon.jpg",
    "kirkjufell_candidate.jpg": "kirkjufell.jpg"
}

for src_name, dst_name in mapping.items():
    src_path = os.path.join(cand_dir, src_name)
    dst_path = os.path.join(img_dir, dst_name)
    if os.path.exists(src_path):
        shutil.copy(src_path, dst_path)
        print(f"Copied {src_name} -> {dst_name} ({os.path.getsize(dst_path)} bytes)")

print("All verified candidate photos copied to images/ directory!")
