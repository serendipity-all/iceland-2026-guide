/* ==========================================================================
   ICELAND 2026 - EDITORIAL INTERACTIVE LOGIC & CLOUD SYNC
   ========================================================================== */

const dayColors = ['#ff5a36','#f89e3d','#c36ff0','#5b93e5','#2fae84','#6e8d4a','#cf6b8b','#7b6fe0','#e0b438','#2f9ea4','#71808a'];
let map, markerLayer, routeLine;
const allMarkers = [];
let activeSpotImgTarget = null;

function fmtDate(s) {
  return new Intl.DateTimeFormat('zh-TW', { month: 'numeric', day: 'numeric', weekday: 'short' }).format(new Date(s + 'T12:00:00'));
}

function intensityLabel(d) {
  if (d.intensity === 'walk') return '步行較多';
  if (d.intensity === 'longdrive' || d.longDrive) return '長車程';
  return '輕鬆';
}

function wikiUrl(slug) {
  return `https://en.wikipedia.org/wiki/${encodeURIComponent(slug || '')}`;
}

async function wikiThumb(slug, imgEl) {
  if (!slug) return;
  try {
    const r = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(slug)}`);
    if (!r.ok) throw new Error();
    const data = await r.json();
    const src = data.originalimage?.source || data.thumbnail?.source;
    if (src) {
      imgEl.src = src;
      imgEl.hidden = false;
    }
  } catch (e) {}
}

function spotCard(spot, day) {
  const el = document.createElement('article');
  el.className = 'spot-card';
  el.id = `spot-${spot.id}`;
  
  const imgSrc = spot.img ? `${spot.img}?v=20260813` : '';
  
  el.innerHTML = `
    <img src="${imgSrc}" alt="${spot.name}" loading="lazy" onerror="this.hidden=true;">
    
    <div class="spot-edit-bar">
      <button class="spot-edit-btn btn-move-up" title="上移"><i class="fa-solid fa-arrow-up"></i></button>
      <button class="spot-edit-btn btn-move-down" title="下移"><i class="fa-solid fa-arrow-down"></i></button>
      <button class="spot-edit-btn btn-wiki-match" title="維基匹配"><i class="fa-solid fa-wand-magic-sparkles"></i></button>
      <button class="spot-edit-btn btn-change-photo" title="更換照片"><i class="fa-solid fa-camera"></i></button>
      <button class="spot-edit-btn delete btn-delete-spot" title="刪除"><i class="fa-solid fa-trash"></i></button>
    </div>

    <div class="spot-content">
      <div class="spot-kicker" contenteditable="true">${spot.en}</div>
      <h4 contenteditable="true">${spot.name}</h4>
      <p contenteditable="true">${spot.highlight}</p>
      <div class="spot-gear">⌁ <span contenteditable="true">${spot.gear || '一般旅遊裝備'}</span></div>
    </div>
  `;

  const imgEl = el.querySelector('img');
  if (!spot.img && spot.wiki) {
    wikiThumb(spot.wiki, imgEl);
  } else if (imgSrc) {
    imgEl.hidden = false;
  }

  el.addEventListener('click', (e) => {
    if (e.target.closest('.spot-edit-bar') || e.target.getAttribute('contenteditable') === 'true') return;
    showSpot(spot, day);
  });

  return el;
}

function renderDays() {
  const wrap = document.getElementById('dayList');
  if (!wrap) return;
  wrap.innerHTML = '';

  tripData.days.forEach(d => {
    const card = document.createElement('article');
    card.className = 'day-card';
    card.dataset.filter = [d.intensity, d.longDrive ? 'longdrive' : '', d.aurora ? 'aurora' : ''].join(' ');
    card.id = `day-${d.day}`;

    const badges = [`<span class="badge">${intensityLabel(d)}</span>`];
    if (d.longDrive) badges.push('<span class="badge warn">長距離移動</span>');
    if (d.aurora) badges.push('<span class="badge aurora">極光彈性</span>');

    card.innerHTML = `
      <div class="day-top">
        <div>
          <div class="day-num">${String(d.day).padStart(2, '0')}</div>
          <div class="day-date">${fmtDate(d.date)}</div>
        </div>
        <div class="day-title">
          <h3 contenteditable="true">${d.label}</h3>
          <p contenteditable="true">${d.summary}</p>
        </div>
        <div class="badges">${badges.join('')}</div>
      </div>
      <div class="day-body">
        <div class="spot-grid"></div>
        <aside class="day-side">
          <div class="info-box">
            <strong>注意事項</strong>
            <ul class="tip-list">
              ${d.tips.map(x => `<li contenteditable="true">${x}</li>`).join('')}
            </ul>
          </div>
          <div class="day-actions">
            <button class="small-btn save-btn">♡ 收藏這天</button>
            <button class="small-btn map-btn">⌖ 地圖定位</button>
            <button class="small-btn add-spot btn-add-spot"><i class="fa-solid fa-plus"></i> 新增景點</button>
          </div>
        </aside>
      </div>
    `;

    const sg = card.querySelector('.spot-grid');
    d.spots.forEach(s => sg.appendChild(spotCard(s, d)));

    const save = card.querySelector('.save-btn');
    const key = `iceland-save-day-${d.day}`;
    if (localStorage.getItem(key)) {
      save.classList.add('saved');
      save.textContent = '♥ 已收藏';
    }
    save.onclick = () => {
      if (localStorage.getItem(key)) {
        localStorage.removeItem(key);
        save.classList.remove('saved');
        save.textContent = '♡ 收藏這天';
      } else {
        localStorage.setItem(key, '1');
        save.classList.add('saved');
        save.textContent = '♥ 已收藏';
      }
    };

    card.querySelector('.map-btn').onclick = () => focusDay(d);
    
    // Add Spot handler for day
    card.querySelector('.btn-add-spot').onclick = () => {
      const spotName = prompt('請輸入新增景點名稱（例：Dyrhólaey 迪霍拉里海蝕拱門）：');
      if (spotName) {
        const newSpot = {
          id: `spot-new-${Date.now()}`,
          name: spotName,
          en: spotName,
          type: 'nature',
          lat: d.spots[0]?.lat || 64.14,
          lng: d.spots[0]?.lng || -21.92,
          img: 'images/kirkjufell.jpg',
          wiki: '',
          highlight: '點擊此處輸入新增景點特色說明...',
          gear: '防風防水外套、好走的鞋',
          caution: '請留意現場天氣與安全指示。'
        };
        d.spots.push(newSpot);
        sg.appendChild(spotCard(newSpot, d));
        saveItineraryToLocal();
      }
    };

    wrap.appendChild(card);
  });
}

function showSpot(spot, day) {
  const dialog = document.getElementById('spotDialog');
  const body = document.getElementById('spotDialogBody');
  if (!dialog || !body) return;

  const imgSrc = spot.img ? `${spot.img}?v=20260813` : '';

  body.innerHTML = `
    <div class="dialog-hero">
      <img src="${imgSrc}" alt="${spot.name}" onerror="this.hidden=true;">
    </div>
    <div class="dialog-content">
      <div class="spot-kicker">DAY ${day.day} · ${spot.en}</div>
      <h3>${spot.name}</h3>
      <p>${spot.highlight}</p>
      <div class="dialog-grid">
        <div class="dialog-info">
          <strong>建議裝備</strong>
          <p>${spot.gear || '一般旅遊裝備'}</p>
        </div>
        <div class="dialog-info">
          <strong>注意事項</strong>
          <p>${spot.caution || '依現場天氣與公告調整。'}</p>
        </div>
      </div>
      <div class="dialog-links">
        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.name + ' Iceland')}" target="_blank" rel="noreferrer"><i class="fa-solid fa-location-arrow"></i> Google Maps 導航 ↗</a>
        <a href="${wikiUrl(spot.wiki)}" target="_blank" rel="noreferrer"><i class="fa-solid fa-book-atlas"></i> 維基百科背景 ↗</a>
        <a href="#route" class="dialog-map-link"><i class="fa-solid fa-map-pin"></i> 在全程地圖查看</a>
      </div>
    </div>
  `;

  if (!spot.img && spot.wiki) {
    wikiThumb(spot.wiki, body.querySelector('img'));
  }

  body.querySelector('.dialog-map-link').onclick = (e) => {
    e.preventDefault();
    dialog.close();
    document.getElementById('route')?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      map.setView([spot.lat, spot.lng], 10, { animate: true });
      const m = allMarkers.find(x => x.spot.id === spot.id);
      if (m) m.marker.openPopup();
    }, 450);
  };

  dialog.showModal();
}

function focusDay(day) {
  document.getElementById('route')?.scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => {
    const pts = day.spots.map(s => [s.lat, s.lng]);
    if (pts.length > 0) {
      map.fitBounds(pts, { padding: [55, 55], maxZoom: 9 });
    }
  }, 450);
}

function initMap() {
  const mapContainer = document.getElementById('map');
  if (!mapContainer) return;

  map = L.map('map', { zoomControl: true, scrollWheelZoom: false }).setView([64.85, -18.8], 6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  markerLayer = L.layerGroup().addTo(map);
  const route = [];

  tripData.days.forEach((d, i) => {
    d.spots.forEach(s => {
      route.push([s.lat, s.lng]);
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div class="marker-dot" style="background:${dayColors[i % dayColors.length]}"></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9]
      });
      const marker = L.marker([s.lat, s.lng], { icon })
        .bindPopup(`<strong>Day ${d.day} · ${s.name}</strong><br><span>${s.en}</span><br><a class="popup-link" href="#spot-${s.id}">查看景點卡 ↓</a>`);
      
      marker.on('popupopen', () => {
        document.querySelector('.leaflet-popup-content a')?.addEventListener('click', () => {
          document.getElementById(`spot-${s.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
      });
      
      marker.addTo(markerLayer);
      allMarkers.push({ marker, spot: s, day: d });
    });
  });

  routeLine = L.polyline(route, { color: '#18242d', weight: 2, opacity: 0.5, dashArray: '5 8' }).addTo(map);

  const legend = document.getElementById('mapLegend');
  if (legend) {
    tripData.days.forEach((d, i) => {
      legend.insertAdjacentHTML('beforeend', `<div class="legend-item"><span class="legend-dot" style="background:${dayColors[i % dayColors.length]}"></span><span>D${d.day} ${fmtDate(d.date)} · ${d.label}</span></div>`);
    });
  }

  document.querySelectorAll('[data-map-filter]').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('[data-map-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.mapFilter;
      markerLayer.clearLayers();
      allMarkers.filter(x => f === 'all' || x.spot.type === f).forEach(x => x.marker.addTo(markerLayer));
    };
  });
}

function renderPacking() {
  const grid = document.getElementById('packingGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const groups = [
    ['carry', '隨身包包', '證件、貴重物品與途中隨時會用到'],
    ['cabin', '手提行李', '托運延誤時仍能撐 1–2 天'],
    ['checked', '托運行李', '主要衣物與旅行用品'],
    ['shared', '共用／分裝', '夫妻或旅伴一起準備']
  ];

  groups.forEach(([key, title, sub]) => {
    const card = document.createElement('article');
    card.className = 'packing-card';
    card.innerHTML = `<div class="packing-head"><div><h3>${title}</h3><p>${sub}</p></div><span>${tripData.packing[key].length} 項</span></div><div class="check-list"></div>`;
    const list = card.querySelector('.check-list');
    
    tripData.packing[key].forEach((item, i) => {
      const id = `pack-${key}-${i}`;
      const row = document.createElement('label');
      row.className = 'check-row';
      row.innerHTML = `<input type="checkbox" ${localStorage.getItem(id) ? 'checked' : ''}><span>${item}</span>`;
      row.querySelector('input').onchange = e => e.target.checked ? localStorage.setItem(id, '1') : localStorage.removeItem(id);
      list.appendChild(row);
    });

    grid.appendChild(card);
  });

  const resetBtn = document.getElementById('resetPacking');
  if (resetBtn) {
    resetBtn.onclick = () => {
      Object.keys(localStorage).filter(k => k.startsWith('pack-')).forEach(k => localStorage.removeItem(k));
      document.querySelectorAll('#packingGrid input').forEach(x => x.checked = false);
    };
  }
}

function setupFilters() {
  document.querySelectorAll('#dayFilters [data-filter]').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('#dayFilters [data-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.day-card').forEach(c => {
        c.style.display = (f === 'all' || c.dataset.filter.includes(f)) ? '' : 'none';
      });
    };
  });
}

function renderToday() {
  const select = document.getElementById('todaySelect');
  if (!select) return;

  tripData.days.forEach(d => {
    select.insertAdjacentHTML('beforeend', `<option value="${d.day}">Day ${d.day} · ${fmtDate(d.date)} · ${d.label}</option>`);
  });

  const now = new Date();
  const todayISO = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  let active = tripData.days.find(d => d.date === todayISO) || tripData.days.find(d => new Date(d.date + 'T23:59:59') >= now) || tripData.days[tripData.days.length - 1];
  select.value = active.day;

  const draw = (d) => {
    const gear = [...new Set(d.spots.flatMap(s => (s.gear || '').split(/[、；]/).map(x => x.trim()).filter(Boolean)))].slice(0, 6);
    document.getElementById('todayPanel').innerHTML = `
      <article class="today-card">
        <div class="today-main">
          <div class="today-copy">
            <div class="today-date">DAY ${d.day} · ${fmtDate(d.date)}</div>
            <h3>${d.label}</h3>
            <p class="today-summary">${d.summary}</p>
            <div class="today-route">
              ${d.spots.map(s => `<div class="route-stop">${s.name}</div>`).join('')}
            </div>
          </div>
          <aside class="today-side">
            <div>
              <h4>今天記得帶</h4>
              <p>${gear.length ? gear.join(' · ') : '依天氣準備基本防風保暖裝備'}</p>
            </div>
            <div>
              <h4>今天最重要</h4>
              <ul>
                ${d.tips.slice(0, 3).map(x => `<li>${x}</li>`).join('')}
              </ul>
            </div>
            <div class="today-actions">
              <button id="todayMap"><i class="fa-solid fa-location-crosshairs"></i> 看今天地圖</button>
              <a href="https://en.vedur.is/" target="_blank" rel="noreferrer">Vedur 天氣 ↗</a>
              <a href="https://safetravel.is/" target="_blank" rel="noreferrer">SafeTravel ↗</a>
            </div>
          </aside>
        </div>
        <div class="daily-checks">
          <div class="daily-check"><strong>出門前</strong><span>手機 · 錢包 · 行充 · 水</span></div>
          <div class="daily-check"><strong>戶外</strong><span>風雨層隨身，不放大行李</span></div>
          <div class="daily-check"><strong>晚上</strong><span>${d.aurora ? '保留極光彈性 · 毛帽手套' : '確認隔日集合與天氣'}</span></div>
          <div class="daily-check"><strong>照片</strong><span>電池 · 鏡頭布 · 儲存空間</span></div>
        </div>
      </article>
    `;
    document.getElementById('todayMap').onclick = () => focusDay(d);
  };

  draw(active);
  select.onchange = () => draw(tripData.days.find(d => d.day === Number(select.value)));
}

function setupMisc() {
  const spotCountEl = document.getElementById('spotCount');
  if (spotCountEl) spotCountEl.textContent = tripData.days.reduce((n, d) => n + d.spots.length, 0);

  const days = Math.ceil((new Date(tripData.start) - new Date()) / 86400000);
  const countdownEl = document.getElementById('countdown');
  if (countdownEl) countdownEl.textContent = days > 0 ? `${days} 天` : days === 0 ? '今天' : '已出發';

  const focusMapBtn = document.getElementById('focusMapBtn');
  if (focusMapBtn) {
    focusMapBtn.onclick = () => {
      document.getElementById('route')?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => map.fitBounds([[63.3, -24], [66.5, -13.2]], { padding: [25, 25] }), 400);
    };
  }

  const themeBtn = document.getElementById('themeBtn');
  if (themeBtn) {
    themeBtn.onclick = () => {
      document.body.classList.toggle('dark');
      themeBtn.textContent = document.body.classList.contains('dark') ? '☀' : '☾';
      setTimeout(() => map && map.invalidateSize(), 50);
    };
  }

  // Edit Mode Toggle
  const editToggleBtn = document.getElementById('edit-mode-toggle');
  if (editToggleBtn) {
    editToggleBtn.onclick = () => {
      document.body.classList.toggle('edit-active');
      const isActive = document.body.classList.contains('edit-active');
      editToggleBtn.innerHTML = isActive 
        ? '<i class="fa-solid fa-check"></i> 完成退出' 
        : '<i class="fa-solid fa-pen-to-square"></i> ✏️ 編輯模式';
    };
  }

  // Edit Controls Event Delegation
  document.addEventListener('click', (e) => {
    // Reorder Up
    if (e.target.closest('.btn-move-up')) {
      const spotCardEl = e.target.closest('.spot-card');
      if (spotCardEl && spotCardEl.previousElementSibling) {
        spotCardEl.parentNode.insertBefore(spotCardEl, spotCardEl.previousElementSibling);
        saveItineraryToLocal();
      }
    }
    // Reorder Down
    if (e.target.closest('.btn-move-down')) {
      const spotCardEl = e.target.closest('.spot-card');
      if (spotCardEl && spotCardEl.nextElementSibling) {
        spotCardEl.parentNode.insertBefore(spotCardEl.nextElementSibling, spotCardEl);
        saveItineraryToLocal();
      }
    }
    // Delete Spot
    if (e.target.closest('.btn-delete-spot')) {
      const spotCardEl = e.target.closest('.spot-card');
      if (spotCardEl && confirm('確定要刪除這個景點嗎？')) {
        spotCardEl.remove();
        saveItineraryToLocal();
      }
    }
    // Wiki Match Photo
    if (e.target.closest('.btn-wiki-match')) {
      const spotCardEl = e.target.closest('.spot-card');
      const spotTitle = spotCardEl.querySelector('h4').innerText.trim();
      alert(`正連線為您自動匹配維基百科【${spotTitle}】條目官方原圖...`);
      const query = spotTitle.split(' ')[0];
      fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`)
        .then(r => r.json())
        .then(data => {
          const src = data.originalimage?.source || data.thumbnail?.source;
          if (src) {
            const img = spotCardEl.querySelector('img');
            img.src = src;
            img.hidden = false;
            alert(`✅ 已成功為「${spotTitle}」更新維基百科官方原圖！`);
            saveItineraryToLocal();
          } else {
            alert(`⚠️ 維基百科未找到「${spotTitle}」的封面照片，請手動更換照片。`);
          }
        })
        .catch(err => alert(`⚠️ 搜尋失敗：${err}`));
    }
    // Manual Photo Upload Modal
    if (e.target.closest('.btn-change-photo')) {
      const spotCardEl = e.target.closest('.spot-card');
      activeSpotImgTarget = spotCardEl.querySelector('img');
      const photoModal = document.getElementById('photo-modal');
      const modalUrlInput = document.getElementById('modal-photo-url');
      if (photoModal) {
        modalUrlInput.value = activeSpotImgTarget.src;
        photoModal.classList.add('active');
      }
    }
  });

  // Modal Buttons
  const modalCancelBtn = document.getElementById('modal-cancel-photo');
  const modalSaveBtn = document.getElementById('modal-save-photo');
  const photoModal = document.getElementById('photo-modal');
  const modalFileInput = document.getElementById('modal-photo-file');
  const modalUrlInput = document.getElementById('modal-photo-url');

  if (modalCancelBtn) {
    modalCancelBtn.onclick = () => photoModal.classList.remove('active');
  }

  if (modalSaveBtn) {
    modalSaveBtn.onclick = () => {
      if (activeSpotImgTarget) {
        if (modalFileInput && modalFileInput.files && modalFileInput.files[0]) {
          const reader = new FileReader();
          reader.onload = function(e) {
            activeSpotImgTarget.src = e.target.result;
            activeSpotImgTarget.hidden = false;
            photoModal.classList.remove('active');
            saveItineraryToLocal();
          };
          reader.readAsDataURL(modalFileInput.files[0]);
        } else if (modalUrlInput && modalUrlInput.value.trim()) {
          activeSpotImgTarget.src = modalUrlInput.value.trim();
          activeSpotImgTarget.hidden = false;
          photoModal.classList.remove('active');
          saveItineraryToLocal();
        }
      }
    };
  }

  // Cloud Sync
  const cloudSyncBtn = document.getElementById('cloud-sync-btn');
  if (cloudSyncBtn) {
    cloudSyncBtn.onclick = () => {
      alert('正同步將全隊最新行程寫回 GitHub 雲端伺服器...');
      const token = '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';
      const repo = 'serendipity-all/iceland-2026-guide';
      const path = 'index.html';
      const fullHtml = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
      const base64Content = btoa(unescape(encodeURIComponent(fullHtml)));

      fetch(`https://api.github.com/repos/${repo}/contents/${path}?ref=main`, {
        headers: { 'Authorization': `token ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        const sha = data.sha;
        return fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
          method: 'PUT',
          headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: 'Update Iceland 2026 Editorial Itinerary via Web',
            content: base64Content,
            sha: sha,
            branch: 'main'
          })
        });
      })
      .then(res => res.json())
      .then(() => alert('🎉 成功！全隊最新行程與照片已全數同步至 GitHub 雲端！隊友開啟網頁即可同步更新！'))
      .catch(err => alert('⚠️ 雲端同步失敗：' + err));
    };
  }
}

function saveItineraryToLocal() {
  const dayList = document.getElementById('dayList');
  if (dayList) {
    localStorage.setItem('iceland_2026_editorial_days', dayList.innerHTML);
  }
}

function loadItineraryFromLocal() {
  const saved = localStorage.getItem('iceland_2026_editorial_days');
  if (saved) {
    const dayList = document.getElementById('dayList');
    if (dayList) {
      dayList.innerHTML = saved;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderDays();
  renderPacking();
  renderToday();
  initMap();
  setupFilters();
  setupMisc();
  loadItineraryFromLocal();

  const dialog = document.getElementById('spotDialog');
  const dialogClose = document.querySelector('#spotDialog .dialog-close');
  if (dialogClose && dialog) {
    dialogClose.onclick = () => dialog.close();
  }
});
