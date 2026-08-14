import urllib.request, json, os, time

headers = {'User-Agent': 'IcelandTravelGuideBot/1.0 (contact@example.com)'}
cand_dir = r"C:\Users\delia_chang\.gemini\antigravity\brain\33ae99a4-095f-42c2-985e-1de9635c31d5\verification_candidates"

rem_pages = [
    ('akureyri', 'Akureyri'),
    ('hverir', 'Hverir'),
    ('seydisfjordur', 'Sey%C3%B0isfj%C3%B6r%C3%B0ur'),
    ('sun_voyager', 'S%C3%B3lfar'),
    ('harpa', 'Harpa_(concert_hall)'),
    ('strokkur', 'Strokkur'),
    ('gullfoss', 'Gullfoss'),
    ('sky_lagoon', 'Sky_Lagoon')
]

for key, title in rem_pages:
    url = f'https://en.wikipedia.org/api/rest_v1/page/summary/{title}'
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            img_src = data.get('originalimage', {}).get('source') or data.get('thumbnail', {}).get('source')
            if img_src:
                time.sleep(1)
                r2 = urllib.request.Request(img_src, headers=headers)
                out_path = os.path.join(cand_dir, f'{key}_candidate.jpg')
                with urllib.request.urlopen(r2) as resp2, open(out_path, 'wb') as f:
                    f.write(resp2.read())
                sz = os.path.getsize(out_path)
                print(f"{key} -> SUCCESS ({sz} bytes)")
            else:
                print(f"{key} -> NO IMAGE")
    except Exception as e:
        print(f"{key} error: {e}")
    time.sleep(1.2)

print("Remaining download complete!")
