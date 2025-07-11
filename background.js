
function sendBreakReminder() {
  console.log("🔔 Sending break reminder...");
  chrome.storage.sync.get(['breakEnabled'], ({ breakEnabled }) => {
    if (!breakEnabled) {
      console.log("❌ Breaks disabled");
      return;
    }

    chrome.tabs.query({}, (tabs) => {
      for (const tab of tabs) {
        chrome.tabs.sendMessage(tab.id, { action: "showBreak" }, () => {
          if (chrome.runtime.lastError) {
            console.warn(`⚠️ Could not send to tab ${tab.id}:`, chrome.runtime.lastError.message);
          } else {
            console.log("✅ Sent break message to tab:", tab.id);
          }
        });
      }
    });
  });
}

chrome.alarms.create("breakReminder", { periodInMinutes: 20 }); // for testing
console.log("⏰ Alarm created (every 6 seconds)");


chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "breakReminder") {
    console.log("🔁 Alarm triggered");
    chrome.idle.queryState(60, (state) => {
      console.log("🧠 User state:", state);
      if (state === 'active') {
        sendBreakReminder();
      } else {
        console.log("💤 User idle, skipping reminder");
      }
    });
  }
});
