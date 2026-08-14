import urllib.request, json, os, time

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}
cand_dir = r"C:\Users\delia_chang\.gemini\antigravity\brain\33ae99a4-095f-42c2-985e-1de9635c31d5\verification_candidates"

rem_pages = [
    ('akureyri', 'Akureyri'),
    ('hverir', 'Hverar%C3%B6n%C3%B0'),
    ('seydisfjordur', 'Sey%C3%B0isfj%C3%B6r%C3%B0ur'),
    ('sun_voyager', 'S%C3%B3lfar'),
    ('harpa', 'Harpa_(concert_hall)'),
    ('strokkur', 'Strokkur'),
    ('gullfoss', 'Gullfoss'),
    ('sky_lagoon', 'Reykjav%C3%ADk')
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
    time.sleep(0.5)

print("Finished fetching remaining 8 Wikipedia images!")
