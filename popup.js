const toggle = document.getElementById('toggleBreak');
const currentStreak = document.getElementById('currentStreak');
const highestStreak = document.getElementById('highestStreak');
const totalBreaks = document.getElementById('totalBreaks');

chrome.storage.sync.get(['breakEnabled', 'currentStreak', 'highestStreak', 'totalBreaks'], (data) => {
  toggle.checked = data.breakEnabled !== false;

  currentStreak.textContent = data.currentStreak || 0;
  highestStreak.textContent = data.highestStreak || 0;
  totalBreaks.textContent = data.totalBreaks || 0;
});


toggle.addEventListener('change', () => {
  chrome.storage.sync.set({ breakEnabled: toggle.checked });
});
