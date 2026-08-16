// ==========================================================================
// Brain Biscuit — script.js
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initSmoothScroll();
  initRiddleForm();
  initLeaderboard();
  initIqTestButton();
});

/* --------------------------------------------------------------------------
   Mobile navigation toggle
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu after selecting a link
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* --------------------------------------------------------------------------
   Smooth scrolling for in-page anchor links
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* --------------------------------------------------------------------------
   "Add Your Own Question" form — mock submission
   -------------------------------------------------------------------------- */
function initRiddleForm() {
  const form = document.getElementById('riddleForm');
  const message = document.getElementById('formMessage');
  if (!form || !message) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const riddle = {
      title: formData.get('qTitle')?.toString().trim(),
      options: {
        A: formData.get('optA')?.toString().trim(),
        B: formData.get('optB')?.toString().trim(),
        C: formData.get('optC')?.toString().trim(),
        D: formData.get('optD')?.toString().trim(),
      },
      correctAnswer: formData.get('correctAnswer'),
      submittedAt: new Date().toISOString(),
    };

    // Basic validation
    const hasEmptyField = !riddle.title || !riddle.correctAnswer ||
      Object.values(riddle.options).some((v) => !v);

    if (hasEmptyField) {
      message.textContent = 'Please fill in every field before submitting.';
      message.classList.remove('success');
      return;
    }

    // Mock submission — in a real app this would POST to a backend/API
    console.log('New riddle submitted:', riddle);

    message.textContent = `"${riddle.title}" was added. Thanks for feeding the brain!`;
    message.classList.add('success');
    form.reset();
  });
}

/* --------------------------------------------------------------------------
   Leaderboard — sample data, sorted by score, rendered into the table
   -------------------------------------------------------------------------- */
function initLeaderboard() {
  const tbody = document.getElementById('leaderboardBody');
  if (!tbody) return;

  const sampleScores = [
    { user: 'Nova Chen', score: 2840 },
    { user: 'Milo Reyes', score: 3120 },
    { user: 'Aisha Patel', score: 2695 },
    { user: 'Théo Laurent', score: 2990 },
    { user: 'Zara Okafor', score: 3260 },
  ];

  const sorted = sortLeaderboardByScore(sampleScores);
  renderLeaderboard(tbody, sorted);
}

/**
 * Sorts an array of { user, score } objects by score, descending.
 * Does not mutate the original array.
 */
function sortLeaderboardByScore(entries) {
  return [...entries].sort((a, b) => b.score - a.score);
}

function renderLeaderboard(tbody, entries) {
  const rankStyles = ['gold', 'silver', 'bronze'];
  const avatarColors = ['#E2703A', '#4CC9F0', '#6C63FF', '#C99A5B', '#2A7A45'];

  tbody.innerHTML = entries
    .map((entry, index) => {
      const rank = index + 1;
      const badgeClass = rankStyles[index] || '';
      const initials = entry.user
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();
      const avatarColor = avatarColors[index % avatarColors.length];

      return `
        <tr>
          <td class="rank-cell">
            <span class="rank-badge ${badgeClass}">${rank}</span>
          </td>
          <td>
            <div class="user-cell">
              <span class="avatar" style="background:${avatarColor}">${initials}</span>
              <span>${escapeHtml(entry.user)}</span>
            </div>
          </td>
          <td class="score-cell">${entry.score.toLocaleString()}</td>
        </tr>
      `;
    })
    .join('');
}

/** Minimal HTML escaping for user-generated strings. */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* --------------------------------------------------------------------------
   IQ Test button — placeholder interaction
   -------------------------------------------------------------------------- */
function initIqTestButton() {
  const btn = document.getElementById('startIqTest');
  if (!btn) return;

  btn.addEventListener('click', () => {
    btn.textContent = 'Test starting…';
    btn.disabled = true;
    setTimeout(() => {
      alert('IQ Test would launch here — hook this up to your quiz engine.');
      btn.textContent = 'Begin IQ Test';
      btn.disabled = false;
    }, 500);
  });
}
