import urllib.request, json, os, time

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}
cand_dir = r"C:\Users\delia_chang\.gemini\antigravity\brain\33ae99a4-095f-42c2-985e-1de9635c31d5\verification_candidates"

batch2_pages = [
    ('skogafoss', 'Skógafoss (彩虹瀑布)', 'Sk%C3%B3gafoss'),
    ('fjadrargljufur', 'Fjaðrárgljúfur (羽毛峽谷)', 'Fja%C3%B0r%C3%A1rglj%C3%BAfur'),
    ('diamond_beach', '鑽石沙灘 (Diamond Beach)', 'Brei%C3%B0amerkursandur'),
    ('akureyri', '阿克雷利小鎮 (Akureyri)', 'Akureyri'),
    ('godafoss', '眾神瀑布 (Goðafoss)', 'Go%C3%B0afoss'),
    ('dettifoss', '黛堤瀑布 (Dettifoss)', 'Dettifoss'),
    ('krafla_viti', '克拉夫拉 Viti 火口湖', 'Krafla'),
    ('hverir', '米湖 Hverir 地熱區', 'Hverir'),
    ('lagarfljot', '拉加爾湖 (Lagarfljót)', 'Lagarflj%C3%B3t'),
    ('seydisfjordur', '塞濟斯菲厄澤 (Seyðisfjörður)', 'Sey%C3%B0isfj%C3%B6r%C3%B0ur'),
    ('bulandstindur', '金字塔山 (Búlandstindur)', 'B%C3%BAlandstindur'),
    ('sun_voyager', '太陽航行者 (Sun Voyager)', 'S%C3%B3lfar'),
    ('harpa', 'Harpa 音樂廳', 'Harpa_(concert_hall)'),
    ('thingvellir', '辛格韋德利 (Þingvellir)', '%C3%9Eingvellir'),
    ('strokkur', '史托克間歇泉 (Strokkur)', 'Strokkur'),
    ('gullfoss', '黃金瀑布 (Gullfoss)', 'Gullfoss'),
    ('kerid', 'Kerið 火口湖', 'Keri%C3%B0'),
    ('sky_lagoon', '天空之鏡溫泉 (Sky Lagoon)', 'Sky_Lagoon'),
    ('kirkjufell', '教堂山與瀑布 (Kirkjufell)', 'Kirkjufell')
]

os.makedirs(cand_dir, exist_ok=True)

results = []
for key, name, title in batch2_pages:
    url = f'https://en.wikipedia.org/api/rest_v1/page/summary/{title}'
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            img_src = data.get('originalimage', {}).get('source') or data.get('thumbnail', {}).get('source')
            if img_src:
                r2 = urllib.request.Request(img_src, headers=headers)
                out_path = os.path.join(cand_dir, f'{key}_candidate.jpg')
                with urllib.request.urlopen(r2) as resp2, open(out_path, 'wb') as f:
                    f.write(resp2.read())
                sz = os.path.getsize(out_path)
                print(f'{key} ({name}) -> SUCCESS ({sz} bytes)')
                results.append((key, name, img_src, sz, True))
            else:
                print(f'{key} ({name}) -> NO IMAGE IN SUMMARY')
                results.append((key, name, None, 0, False))
    except Exception as e:
        print(f'{key} error: {e}')
        results.append((key, name, None, 0, False))
    time.sleep(0.4)

print("Batch 2 download finished!")
