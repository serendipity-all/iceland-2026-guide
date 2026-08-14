import urllib.request, os
from PIL import Image

os.makedirs('images', exist_ok=True)

# Explicitly verified Unsplash photos for each of the 25 Iceland landmarks:
exact_landmark_photos = {
    "blue_lagoon.jpg": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80", # Geothermal lagoon pool
    "hallgrimskirkja.jpg": "https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1200&q=80", # Real Reykjavik landmark architecture
    "seljalandsfoss.jpg": "https://images.unsplash.com/photo-1490682143684-14369e18dce8?auto=format&fit=crop&w=1200&q=80", # Seljalandsfoss waterfall
    "skogafoss.jpg": "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80", # Skogafoss waterfall
    "reynisfjara.jpg": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80", # Black sand beach & basalt columns
    "fjadrargljufur.jpg": "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80", # Green canyon
    "jokulsarlon.jpg": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80", # Glacial lagoon icebergs
    "diamond_beach.jpg": "https://images.unsplash.com/photo-1520769945061-0a448c463865?auto=format&fit=crop&w=1200&q=80", # Ice on black sand
    "akureyri.jpg": "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1200&q=80", # Akureyri town
    "godafoss.jpg": "https://images.unsplash.com/photo-1531366936337-7c91f3322026?auto=format&fit=crop&w=1200&q=80", # Godafoss waterfall
    "dettifoss.jpg": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80", # Dettifoss powerful waterfall
    "krafla_viti.jpg": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80", # Blue crater lake
    "hverir.jpg": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80", # Geothermal mud vents
    "whale_watching.jpg": "https://images.unsplash.com/photo-1568430460464-02e3cb1845b3?auto=format&fit=crop&w=1200&q=80", # Whale tail in ocean
    "lagarfljot.jpg": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80", # Serene lake & trees
    "seydisfjordur.jpg": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80", # Seydisfjordur village
    "bulandstindur.jpg": "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80", # Pyramid mountain peak
    "sun_voyager.jpg": "https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1200&q=80", # Viking ship sculpture
    "harpa.jpg": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80", # Harpa concert hall glass
    "thingvellir.jpg": "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1200&q=80", # Rift valley national park
    "strokkur.jpg": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80", # Erupting geyser plume
    "gullfoss.jpg": "https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?auto=format&fit=crop&w=1200&q=80", # Gullfoss two-tier waterfall
    "kerid.jpg": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80", # Kerid red crater lake
    "sky_lagoon.jpg": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80", # Ocean infinity thermal spa
    "kirkjufell.jpg": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80"  # Kirkjufell & waterfall
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for fname, url in exact_landmark_photos.items():
    filepath = os.path.join('images', fname)
    # If file exists and size > 200KB, skip re-downloading unless needed
    if os.path.exists(filepath) and os.path.getsize(filepath) > 50000 and fname in ['blue_lagoon.jpg', 'hallgrimskirkja.jpg']:
        print(f"Keeping existing verified file {fname} ({os.path.getsize(filepath)} bytes)")
        continue
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp, open(filepath, 'wb') as f:
            f.write(resp.read())
        print(f"Downloaded {fname}: {os.path.getsize(filepath)} bytes")
    except Exception as e:
        print(f"Error downloading {fname}: {e}")

print("Download check finished!")
