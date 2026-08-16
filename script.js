// === WAIT FOR DOM TO LOAD ===
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. SMOOTH SCROLLING FOR NAVIGATION LINKS
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // 2. LEADERBOARD DATA & SORTING FUNCTION
  const leaderboardData = [
    { rank: 1, user: 'AlexTheGreat', score: 2500 },
    { rank: 2, user: 'RiddleQueen', score: 2350 },
    { rank: 3, user: 'LogicLord', score: 2200 },
    { rank: 4, user: 'PuzzlePirate', score: 2100 },
    { rank: 5, user: 'BrainyBella', score: 1950 },
  ];

  function sortLeaderboard(data) {
    // Sort by score descending (just to be safe, even though sample is sorted)
    return data.sort((a, b) => b.score - a.score);
  }

  function renderLeaderboard(data) {
    const tbody = document.getElementById('leaderboard-body');
    if (!tbody) return;
    
    tbody.innerHTML = ''; // Clear existing rows
    
    data.forEach((entry, index) => {
      const row = document.createElement('tr');
      
      // Rank with badge for top 3
      const rankCell = document.createElement('td');
      const rankBadge = document.createElement('span');
      rankBadge.classList.add('rank-badge');
      rankBadge.textContent = entry.rank;
      rankCell.appendChild(rankBadge);
      
      const userCell = document.createElement('td');
      userCell.textContent = entry.user;
      
      const scoreCell = document.createElement('td');
      scoreCell.textContent = entry.score.toLocaleString();
      
      row.appendChild(rankCell);
      row.appendChild(userCell);
      row.appendChild(scoreCell);
      
      tbody.appendChild(row);
    });
  }

  // Initial render with sorted data
  const sortedData = sortLeaderboard([...leaderboardData]);
  renderLeaderboard(sortedData);

  // 3. ADD QUESTION FORM HANDLING
  const showFormBtn = document.getElementById('show-form-btn');
  const formContainer = document.getElementById('add-question');
  const riddleForm = document.getElementById('riddle-form');

  if (showFormBtn && formContainer) {
    showFormBtn.addEventListener('click', () => {
      if (formContainer.style.display === 'none' || formContainer.style.display === '') {
        formContainer.style.display = 'block';
        formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        showFormBtn.textContent = 'Hide Form';
      } else {
        formContainer.style.display = 'none';
        showFormBtn.textContent = 'Create a Riddle';
      }
    });
  }

  if (riddleForm) {
    riddleForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Collect form data
      const formData = new FormData(riddleForm);
      const riddleObject = {
        title: formData.get('questionTitle'),
        optionA: formData.get('optionA'),
        optionB: formData.get('optionB'),
        optionC: formData.get('optionC'),
        optionD: formData.get('optionD'),
        correctAnswer: formData.get('correctAnswer'),
        submittedAt: new Date().toISOString(),
      };
      
      // Mock submission - log to console
      console.log('🎉 New Riddle Submitted:', riddleObject);
      
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.textContent = '✅ Riddle submitted successfully! (Check console for data)';
      successMsg.style.cssText = `
        background-color: #E6F7E6;
        color: #2E7D32;
        padding: 12px 16px;
        border-radius: 12px;
        margin-top: 16px;
        text-align: center;
        font-weight: 500;
        animation: fadeInUp 0.5s;
      `;
      
      // Remove any previous success message
      const previousMsg = riddleForm.querySelector('.success-msg');
      if (previousMsg) previousMsg.remove();
      
      successMsg.classList.add('success-msg');
      riddleForm.appendChild(successMsg);
      
      // Reset form
      riddleForm.reset();
      
      // Hide success message after 4 seconds
      setTimeout(() => {
        if (successMsg.parentNode) {
          successMsg.remove();
        }
      }, 4000);
    });
  }

});
