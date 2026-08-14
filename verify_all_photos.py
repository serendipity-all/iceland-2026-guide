import urllib.request, json, urllib.parse, os, time
from PIL import Image

os.makedirs('images', exist_ok=True)

# Exact canonical Wikipedia search queries and fallback direct URLs for all 25 landmarks
canonical_landmarks = [
    ("blue_lagoon.jpg", "Bláa Lónið", "https://upload.wikimedia.org/wikipedia/commons/3/38/17-08-04-Blaue-Lagune-RalfR-DSC_2422.jpg"),
    ("hallgrimskirkja.jpg", "Hallgrímskirkja", "https://upload.wikimedia.org/wikipedia/commons/8/8b/Hallgrimskirkja_mai_2016.jpg"),
    ("seljalandsfoss.jpg", "Seljalandsfoss", "https://upload.wikimedia.org/wikipedia/commons/4/4b/Seljalandsfoss%2C_Su%C3%B0urland%2C_Islandia%2C_2014-08-16%2C_DD_201-203_HDR.JPG"),
    ("skogafoss.jpg", "Skógafoss", "https://upload.wikimedia.org/wikipedia/commons/d/de/Sk%C3%B3gafoss%2C_Su%C3%B0urland%2C_Islandia%2C_2014-08-16%2C_DD_16-18_HDR.JPG"),
    ("reynisfjara.jpg", "Reynisfjara", "https://upload.wikimedia.org/wikipedia/commons/a/a2/Reynisfjara_Sea_Stacks.jpg"),
    ("fjadrargljufur.jpg", "Fjaðrárgljúfur", "https://upload.wikimedia.org/wikipedia/commons/2/2b/Iceland_2008-05-27_%282684049831%29.jpg"),
    ("jokulsarlon.jpg", "Jökulsárlón", "https://upload.wikimedia.org/wikipedia/commons/c/c5/J%C3%B6kuls%C3%A1rl%C3%B3n_Lagoon.jpg"),
    ("diamond_beach.jpg", "Breiðamerkursandur", "https://upload.wikimedia.org/wikipedia/commons/f/f6/Diamond_Beach_Iceland.jpg"),
    ("akureyri.jpg", "Akureyrarkirkja", "https://upload.wikimedia.org/wikipedia/commons/c/c1/Akureyri_-_Skapti_Hallgr%C3%ADmsson.jpg"),
    ("godafoss.jpg", "Goðafoss", "https://upload.wikimedia.org/wikipedia/commons/c/cb/1_Go%C3%B0afoss_aerial_pano_2017.jpg"),
    ("dettifoss.jpg", "Dettifoss", "https://upload.wikimedia.org/wikipedia/commons/e/e9/Dettifoss_TimBekaert.JPG"),
    ("krafla_viti.jpg", "Viti (Krafla)", "https://upload.wikimedia.org/wikipedia/commons/7/79/Aerial_View_of_Krafla_and_Leirhnj%C3%BAkur_21.05.2008_16-08-27.JPG"),
    ("hverir.jpg", "Hverir", "https://upload.wikimedia.org/wikipedia/commons/4/4e/Hverir_geothermal_area_Iceland.jpg"),
    ("whale_watching.jpg", "Humpback whale breaching Iceland", "https://upload.wikimedia.org/wikipedia/commons/4/48/Humpback_Whale_Iceland.jpg"),
    ("lagarfljot.jpg", "Lagarfljót", "https://upload.wikimedia.org/wikipedia/commons/8/87/Lagarfljot_Lake_Iceland.jpg"),
    ("seydisfjordur.jpg", "Seyðisfjarðarkirkja", "https://upload.wikimedia.org/wikipedia/commons/8/85/Sey%C3%B0isfj%C3%B6r%C3%B0ur_Sept_2019_2.jpg"),
    ("bulandstindur.jpg", "Búlandstindur", "https://upload.wikimedia.org/wikipedia/commons/c/c8/B%C3%BAlandstindur_mountain.jpg"),
    ("sun_voyager.jpg", "Sólfar", "https://upload.wikimedia.org/wikipedia/commons/b/ba/S%C3%B3lfar_Reykjavik.jpg"),
    ("harpa.jpg", "Harpa concert hall", "https://upload.wikimedia.org/wikipedia/commons/b/b3/Harpa_Reykjav%C3%ADk_2014.jpg"),
    ("thingvellir.jpg", "Þingvellir", "https://upload.wikimedia.org/wikipedia/commons/8/83/%C3%9Eingvellir_from_the_information_centre.JPG"),
    ("strokkur.jpg", "Strokkur eruption", "https://upload.wikimedia.org/wikipedia/commons/2/2a/Strokkur_Geysir_%2814135319580%29_%28cropped%29.jpg"),
    ("gullfoss.jpg", "Gullfoss", "https://upload.wikimedia.org/wikipedia/commons/1/18/Gullfoss_from_the_Air_%28cropped%29.jpg"),
    ("kerid.jpg", "Kerið", "https://upload.wikimedia.org/wikipedia/commons/3/34/Keri%C3%B0_Crater_Lake_Iceland.jpg"),
    ("sky_lagoon.jpg", "Sky Lagoon Iceland", "https://upload.wikimedia.org/wikipedia/commons/1/13/Sky_Lagoon_Iceland_Ocean_Infinity_Pool.jpg"),
    ("kirkjufell.jpg", "Kirkjufell", "https://upload.wikimedia.org/wikipedia/commons/d/df/Kirkjufell_in_Iceland.jpg")
]

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

results = []
for fname, title, direct_url in canonical_landmarks:
    target_path = os.path.join('images', fname)
    success = False
    
    # Try direct download first with proper browser user-agent
    try:
        req = urllib.request.Request(direct_url, headers=headers)
        with urllib.request.urlopen(req) as resp, open(target_path, 'wb') as f:
            f.write(resp.read())
        size = os.path.getsize(target_path)
        if size > 10000:
            with Image.open(target_path) as img:
                results.append((fname, title, f"SUCCESS (Size: {size} bytes, Resolution: {img.size})"))
                success = True
    except Exception as e:
        print(f"Direct download failed for {fname}: {e}")
        
    if not success:
        results.append((fname, title, "FAILED"))
    time.sleep(0.3)

print("\n--- FINAL VERIFICATION REPORT ---")
for r in results:
    print(r)
