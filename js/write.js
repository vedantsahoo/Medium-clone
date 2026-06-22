const publishBtn = document.getElementById('publishBtn');
const storyTitle = document.getElementById('storyTitle');
const storyBody = document.getElementById('storyBody');

if (publishBtn) {
  publishBtn.addEventListener('click', () => {
    const title = storyTitle ? storyTitle.textContent : '';
    const bodyText = storyBody ? storyBody.textContent : '';

    if (!title && !bodyText) {
      alert('Please write something before publishing!');
      return;
    }

    // Generate an excerpt (e.g., first 150 characters)
    let excerpt = bodyText;
    if (excerpt.length > 150) {
      excerpt = excerpt.substring(0, 150) + '...';
    }

    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const newStory = {
      title: title || 'Untitled Story',
      excerpt: excerpt || 'No description provided.',
      date: date
    };

    // Save to localStorage
    const stories = JSON.parse(localStorage.getItem('medium_stories') || '[]');
    stories.unshift(newStory);
    localStorage.setItem('medium_stories', JSON.stringify(stories));

    // Redirect to index.html
    window.location.href = './index.html';
  });
}

// ── Tooltip formatting buttons ──
document.querySelectorAll('.tool-btn[data-command]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const command = btn.getAttribute('data-command');
    const value = btn.getAttribute('data-value') || null;

    if (command === 'createLink') {
      const url = prompt('Enter the link URL:');
      if (url) document.execCommand(command, false, url);
    } else {
      document.execCommand(command, false, value);
    }
  });
});
