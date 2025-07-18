document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggleBreaks");
  const streak = document.getElementById("streakCount");
  const total = document.getElementById("totalBreaks");

  chrome.storage.sync.get(["breakEnabled", "streak", "totalBreaks"], (data) => {
    toggle.checked = data.breakEnabled ?? true;
    streak.textContent = data.streak ?? 0;
    total.textContent = data.totalBreaks ?? 0;
  });

  toggle.addEventListener("change", () => {
    chrome.storage.sync.set({ breakEnabled: toggle.checked });
  });
});
