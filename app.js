/**
 * app.js - Firebase Auth, Admin Whitelist, and Cloud Synchronization Module
 * Travel Guide: Iceland 2026
 */

// Firebase Configuration (Compat SDK)
const firebaseConfig = {
  apiKey: "AIzaSyALQhQzhnkj-UOmRZGVQKMKqkW0DecwE3s",
  authDomain: "my-travel-book-85243.firebaseapp.com",
  projectId: "my-travel-book-85243",
  storageBucket: "my-travel-book-85243.firebasestorage.app",
  messagingSenderId: "936708966292",
  appId: "1:936708966292:web:d3c7c08e14f60548cf3181"
};

// Super Admin Email
const SUPER_ADMIN_EMAIL = "dreamland11023@gmail.com";

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

// Global App State
window.AppState = {
  currentUser: null,
  userStatus: 'guest', // 'guest', 'pending', 'approved', 'admin'
  isSuperAdmin: false
};

// ── Auth & Whitelist System ──────────────────────────────────────────────────

function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider).catch(err => {
    console.error("Login failed:", err);
    alert("登入失敗：" + err.message);
  });
}

function logoutUser() {
  return auth.signOut().then(() => window.location.reload());
}

// Listen to auth status change
function initAuthListener(onApprovedCallback) {
  auth.onAuthStateChanged(async (user) => {
    if (!user) {
      window.AppState.currentUser = null;
      window.AppState.userStatus = 'guest';
      window.AppState.isSuperAdmin = false;
      renderAuthOverlay('guest');
      updateNavUserUI();
      return;
    }

    window.AppState.currentUser = user;
    const isSuper = (user.email && user.email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase());
    window.AppState.isSuperAdmin = isSuper;

    // Superadmin bypass: always approve admin without failing on db rules
    if (isSuper) {
      window.AppState.userStatus = 'approved';
      removeAuthOverlay();
      updateNavUserUI();
      if (typeof onApprovedCallback === 'function') {
        onApprovedCallback(user);
      }
      return;
    }

    try {
      const userRef = db.collection('iceland_2026_members').doc(user.uid);
      const doc = await userRef.get().catch(err => {
        showNotification('📡 網路或雲端連線不穩定，已切換至本機暫存模式', 'warning');
        return null;
      });

      if (doc && doc.exists) {
        const data = doc.data();
        window.AppState.userStatus = data.status || 'approved';
      } else {
        window.AppState.userStatus = 'approved';
        if (doc) {
          userRef.set({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || user.email.split('@')[0],
            photoURL: user.photoURL || '',
            status: 'approved',
            role: 'member',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          }).catch(() => null);
        }
      }
    } catch (e) {
      window.AppState.userStatus = 'approved';
      showNotification('📡 目前處於離線狀態，顯示離線暫存行程', 'warning');
    }

    if (window.AppState.userStatus === 'pending') {
      renderAuthOverlay('pending');
      updateNavUserUI();
    } else {
      removeAuthOverlay();
      updateNavUserUI();
      if (typeof onApprovedCallback === 'function') {
        onApprovedCallback(user);
      }
    }
  });
}

// ── Non-intrusive Toast Notification System ──────────────────────────────────

function showNotification(message, type = 'info') {
  let container = document.getElementById('toast-notification-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-notification-container';
    container.style.cssText = `
      position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
      z-index: 999999; display: flex; flex-direction: column; gap: 8px;
      pointer-events: none; max-width: 90vw; width: max-content;
    `;
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  const bg = type === 'warning' ? '#c05a10' : (type === 'error' ? '#e03030' : '#1a7a5a');
  toast.style.cssText = `
    background: ${bg}; color: white; padding: 10px 18px; border-radius: 999px;
    font-size: 13px; font-weight: 700; box-shadow: 0 8px 24px rgba(0,0,0,0.3);
    backdrop-filter: blur(8px); opacity: 0; transform: translateY(12px);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); pointer-events: auto;
    display: flex; align-items: center; gap: 8px; font-family: sans-serif;
  `;
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}



// ── UI Overlay for Auth/Pending ──────────────────────────────────────────────

function renderAuthOverlay(status) {
  let overlay = document.getElementById('auth-guard-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'auth-guard-overlay';
    overlay.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(16, 24, 32, 0.96); backdrop-filter: blur(12px);
      z-index: 99999; display: flex; align-items: center; justify-content: center;
      padding: 24px; box-sizing: border-box; color: white; text-align: center;
      font-family: 'Noto Sans TC', 'Inter', sans-serif;
    `;
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
  }

  if (status === 'guest') {
    overlay.innerHTML = `
      <div style="max-width: 420px; width: 100%; background: var(--surface, #18242d); border: 1px solid var(--line, rgba(255,255,255,0.12)); border-radius: 24px; padding: 40px 28px; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
        <div style="font-size: 48px; margin-bottom: 16px;">◒</div>
        <h2 style="font-size: 24px; font-weight: 900; margin: 0 0 8px; color: #fff;">2026 冰島夢幻之旅</h2>
        <p style="font-size: 14px; color: rgba(255,255,255,0.65); margin: 0 0 28px; line-height: 1.6;">本手冊為私人專屬行程。請先使用 Google 帳號登入以進行驗證。</p>
        <button id="auth-overlay-login-btn" style="
          width: 100%; padding: 14px 20px; border-radius: 12px; border: none;
          background: #ff5a36; color: white; font-size: 15px; font-weight: 700;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: transform 0.15s, background 0.15s;
        " onmouseover="this.style.background='#e04826'" onmouseout="this.style.background='#ff5a36'">
          <i class="fa-brands fa-google"></i> 使用 Google 帳號登入
        </button>
      </div>
    `;
    document.getElementById('auth-overlay-login-btn').onclick = loginWithGoogle;
  } else if (status === 'pending') {
    const user = window.AppState.currentUser;
    overlay.innerHTML = `
      <div style="max-width: 440px; width: 100%; background: var(--surface, #18242d); border: 1px solid var(--line, rgba(255,255,255,0.12)); border-radius: 24px; padding: 40px 28px; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
        <div style="font-size: 48px; margin-bottom: 16px;">⏳</div>
        <h2 style="font-size: 22px; font-weight: 900; margin: 0 0 10px; color: #fff;">等待管理者開通權限</h2>
        <p style="font-size: 14px; color: rgba(255,255,255,0.7); margin: 0 0 16px; line-height: 1.6;">
          已收到您的訪問申請！<br>
          <strong style="color: #ff5a36;">${user ? user.email : ''}</strong>
        </p>
        <div style="background: rgba(255,255,255,0.05); padding: 14px; border-radius: 12px; font-size: 13px; color: rgba(255,255,255,0.6); margin-bottom: 24px;">
          請告知管理者開通權限。授權成功後重新整理此頁面即可進入手冊。
        </div>
        <div style="display: flex; gap: 10px;">
          <button onclick="window.location.reload()" style="flex: 1; padding: 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.2); background: transparent; color: white; font-size: 13px; font-weight: 700; cursor: pointer;">重新整理</button>
          <button id="auth-overlay-logout-btn" style="flex: 1; padding: 12px; border-radius: 10px; border: none; background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.8); font-size: 13px; font-weight: 700; cursor: pointer;">切換帳號</button>
        </div>
      </div>
    `;
    document.getElementById('auth-overlay-logout-btn').onclick = logoutUser;
  }
}

function removeAuthOverlay() {
  const overlay = document.getElementById('auth-guard-overlay');
  if (overlay) {
    overlay.remove();
    document.body.style.overflow = '';
  }
}

// ── Update Nav Topbar User UI ────────────────────────────────────────────────

function updateNavUserUI() {
  const user = window.AppState.currentUser;
  const isSuper = window.AppState.isSuperAdmin;

  // Insert or update topbar user section
  const topbarActions = document.querySelector('.topbar-actions');
  if (!topbarActions) return;

  let userBox = document.getElementById('topbar-user-box');
  if (!userBox) {
    userBox = document.createElement('div');
    userBox.id = 'topbar-user-box';
    userBox.style.cssText = 'display: flex; align-items: center; gap: 8px; margin-left: 4px;';
    topbarActions.insertBefore(userBox, topbarActions.firstChild);
  }

  if (!user) {
    userBox.innerHTML = `
      <button id="nav-login-btn" class="btn primary" style="font-size: 12px; padding: 6px 14px; border-radius: 999px;">
        <i class="fa-brands fa-google"></i> 登入
      </button>
    `;
    document.getElementById('nav-login-btn').onclick = loginWithGoogle;
  } else {
    const avatar = user.photoURL ? `<img src="${user.photoURL}" style="width:26px;height:26px;border-radius:50%;object-fit:cover;">` : `<i class="fa-solid fa-user-check" style="color:var(--accent);"></i>`;
    userBox.innerHTML = `
      <div style="display:flex;align-items:center;gap:6px;background:var(--surface,#18242d);padding:4px 10px;border-radius:999px;border:1px solid var(--line,rgba(255,255,255,0.15));font-size:12px;">
        ${avatar}
        <span style="max-width:80px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:700;">${user.displayName || user.email.split('@')[0]}</span>
        ${isSuper ? '<span style="background:#ff5a36;color:white;font-size:10px;padding:1px 6px;border-radius:999px;font-weight:800;">管理者</span>' : ''}
        <button id="nav-logout-btn" title="登出" style="background:none;border:none;color:var(--muted);cursor:pointer;padding:2px 4px;font-size:12px;"><i class="fa-solid fa-right-from-bracket"></i></button>
      </div>
      ${isSuper ? `<button id="nav-admin-panel-btn" class="btn secondary" style="font-size:12px;padding:5px 12px;border-radius:999px;" title="開啟成員審核面板"><i class="fa-solid fa-users-gear"></i> 成員審核</button>` : ''}
    `;
    document.getElementById('nav-logout-btn').onclick = logoutUser;
    if (isSuper && document.getElementById('nav-admin-panel-btn')) {
      document.getElementById('nav-admin-panel-btn').onclick = openAdminPanelModal;
    }
  }

  // Update Mode A UI Restrictions (Only admin sees '✏️ 編輯模式' button)
  const editBtns = document.querySelectorAll('.edit-mode-btn');
  editBtns.forEach(btn => {
    if (!isSuper) {
      btn.style.display = 'none';
    } else {
      btn.style.display = '';
    }
  });
}

// ── Admin Approval Modal ─────────────────────────────────────────────────────

function openAdminPanelModal() {
  let modal = document.getElementById('admin-approval-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'admin-approval-modal';
    modal.className = 'modal-overlay';
    modal.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(0,0,0,0.7); backdrop-filter: blur(8px);
      z-index: 99990; display: flex; align-items: center; justify-content: center;
      padding: 20px; box-sizing: border-box;
    `;
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div style="background: var(--surface, #18242d); border: 1px solid var(--line, rgba(255,255,255,0.15)); border-radius: 20px; max-width: 540px; width: 100%; padding: 24px; color: white; box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
        <h3 style="margin:0; font-size:18px; font-weight:800;"><i class="fa-solid fa-users-gear" style="color:var(--accent);"></i> 旅伴帳號審核管理</h3>
        <button id="close-admin-modal" style="background:none; border:none; color:var(--muted); font-size:20px; cursor:pointer;">✕</button>
      </div>
      <p style="font-size:13px; color:var(--muted); margin:0 0 16px;">已登入的成員需經由您審核通過後，方能查看旅遊手冊。</p>
      <div id="admin-member-list" style="max-height:360px; overflow-y:auto; display:flex; flex-direction:column; gap:10px;">
        <div style="text-align:center; padding:20px; color:var(--muted);">載入成員名單中…</div>
      </div>
    </div>
  `;

  document.getElementById('close-admin-modal').onclick = () => modal.remove();
  loadAdminMemberList();
}

async function loadAdminMemberList() {
  const container = document.getElementById('admin-member-list');
  if (!container) return;

  try {
    let members = [];
    const snapshot = await db.collection('iceland_2026_members').get().catch(() => null);

    if (snapshot && !snapshot.empty) {
      snapshot.forEach(doc => members.push(doc.data()));
    }

    // Local fallback: ensure superadmin is always displayed
    if (!members.some(m => m.email && m.email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase())) {
      const curUser = window.AppState.currentUser;
      members.unshift({
        uid: curUser ? curUser.uid : 'admin_uid',
        email: SUPER_ADMIN_EMAIL,
        displayName: '管理者 (您)',
        photoURL: curUser ? curUser.photoURL : '',
        status: 'approved',
        role: 'admin'
      });
    }

    container.innerHTML = '';
    members.forEach(data => {
      const isApproved = (data.status === 'approved');
      const isSuper = (data.email && data.email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase());

      const row = document.createElement('div');
      row.style.cssText = `
        display: flex; align-items: center; justify-content: space-between;
        padding: 12px 14px; background: var(--bg, #101820); border-radius: 12px;
        border: 1px solid var(--line, rgba(255,255,255,0.08)); gap: 12px;
      `;
      row.innerHTML = `
        <div style="display:flex; align-items:center; gap:10px; overflow:hidden;">
          ${data.photoURL ? `<img src="${data.photoURL}" style="width:32px;height:32px;border-radius:50%;">` : `<i class="fa-solid fa-user-circle" style="font-size:28px;color:var(--muted);"></i>`}
          <div style="overflow:hidden;">
            <div style="font-size:13px; font-weight:700; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${data.displayName || data.email}</div>
            <div style="font-size:11px; color:var(--muted);">${data.email}</div>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:8px; flex-shrink:0;">
          ${isSuper ? '<span style="font-size:11px; font-weight:800; color:#ff5a36; background:rgba(255,90,54,0.15); padding:2px 8px; border-radius:999px;">最高管理者</span>' : `
            <button class="approve-btn" style="
              padding: 6px 12px; border-radius: 8px; border: none; font-size: 12px; font-weight: 700; cursor: pointer;
              background: ${isApproved ? '#2fae84' : 'rgba(255,255,255,0.1)'};
              color: ${isApproved ? 'white' : 'var(--muted)'};
            ">
              ${isApproved ? '✓ 已開通' : '同意開通'}
            </button>
            <button class="reject-btn" style="background:none; border:none; color:#e03030; cursor:pointer; font-size:14px; padding:4px;" title="移除權限">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          `}
        </div>
      `;

      if (!isSuper) {
        const approveBtn = row.querySelector('.approve-btn');
        approveBtn.onclick = async () => {
          const nextStatus = isApproved ? 'pending' : 'approved';
          await db.collection('iceland_2026_members').doc(data.uid).update({ status: nextStatus }).catch(() => null);
          loadAdminMemberList();
        };

        const rejectBtn = row.querySelector('.reject-btn');
        rejectBtn.onclick = async () => {
          if (confirm(`確定要移除 ${data.email} 的存取權限嗎？`)) {
            await db.collection('iceland_2026_members').doc(data.uid).delete().catch(() => null);
            loadAdminMemberList();
          }
        };
      }

      container.appendChild(row);
    });
  } catch (e) {
    container.innerHTML = `<div style="text-align:center; padding:16px; color:var(--muted);">目前使用離線管理者模式，連線恢復後將自動載入完整列表。</div>`;
  }
}

