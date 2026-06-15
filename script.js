// ── Sidebar toggle ──
  const hamburger = document.getElementById('hamburgerBtn');
  const overlay   = document.getElementById('overlay');
  const isMobile  = () => window.innerWidth <= 640;

  hamburger.addEventListener('click', () => {
    document.body.classList.toggle('sidebar-hidden');
    if (isMobile()) {
      overlay.classList.toggle('show', !document.body.classList.contains('sidebar-hidden'));
    }
  });

  overlay.addEventListener('click', () => {
    document.body.classList.add('sidebar-hidden');
    overlay.classList.remove('show');
  });

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