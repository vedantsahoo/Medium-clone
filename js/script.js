// ── Load Stories from localStorage on index.html load ──
const feedTabs = document.querySelector('.feed-tabs');
if (feedTabs) {
  const stories = JSON.parse(localStorage.getItem('medium_stories') || '[]');
  // Insert newer stories at the top
  for (let i = stories.length - 1; i >= 0; i--) {
    const story = stories[i];
    const articleHTML = `
      <article class="article-card">
        <div class="article-meta">
          <div class="pub-icon ux" style="background: #10b981;">New</div>
          In <a href="#">Your Publication</a>
          <span class="meta-dot">·</span>
          by <a href="#">You ✦</a>
          <span class="meta-dot">·</span>
          ${story.date}
        </div>
        <div class="article-body">
          <div class="article-text">
            <h2 class="article-title">${story.title}</h2>
            <p class="article-excerpt">${story.excerpt}</p>
          </div>
          <div class="thumb-placeholder">✨</div>
        </div>
        <div class="article-actions">
          <button class="action-item" onclick="toggleLike(this)">
            <span class="star-icon">★</span> <span class="count">0</span>
          </button>
          <button class="action-item">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            0
          </button>
          <div class="actions-right">
            <button class="action-item" title="Not interested">
              <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </button>
            <button class="action-item" title="Save">
              <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
            <button class="action-item" title="More">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="5" cy="12" r="1.5" />
                <circle cx="12" cy="12" r="1.5" />
                <circle cx="19" cy="12" r="1.5" />
              </svg>
            </button>
          </div>
        </div>
      </article>
    `;
    feedTabs.insertAdjacentHTML('afterend', articleHTML);
  }
}

// ── Sidebar toggle ──
const hamburger = document.getElementById('hamburgerBtn');
const overlay   = document.getElementById('overlay');
const isMobile  = () => window.innerWidth <= 640;

if (hamburger) {
  hamburger.addEventListener('click', () => {
    document.body.classList.toggle('sidebar-hidden');
    if (isMobile() && overlay) {
      overlay.classList.toggle('show', !document.body.classList.contains('sidebar-hidden'));
    }
  });
}

if (overlay) {
  overlay.addEventListener('click', () => {
    document.body.classList.add('sidebar-hidden');
    overlay.classList.remove('show');
  });
}

// ── Tab switching ──
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

// ── Like toggle ──
function toggleLike(btn) {
  const countEl = btn.querySelector('.count');
  const liked = btn.classList.toggle('liked');
  const n = parseInt(countEl.textContent);
  countEl.textContent = liked ? n + 1 : n - 1;
}

// ── Nav link active state ──
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// ── Save button toggle ──
document.querySelectorAll('[title="Save"]').forEach(btn => {
  btn.addEventListener('click', () => {
    const isSaved = btn.dataset.saved === 'true';
    btn.dataset.saved = !isSaved;
    btn.style.color = !isSaved ? 'var(--accent)' : '';
  });
});

// ── Redirect on Write button click ──
const writeBtn = document.getElementById('writeBtn');
if (writeBtn) {
  writeBtn.addEventListener('click', () => {
    window.location.href = './write.html';
  });
}