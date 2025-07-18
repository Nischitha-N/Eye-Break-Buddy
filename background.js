console.log("Background script loaded");

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
  chrome.alarms.create("eyeBreakAlarm", { delayInMinutes: 1, periodInMinutes: 20 });
  console.log("Alarm created for every 20 minutes");
});

chrome.alarms.onAlarm.addListener((alarm) => {
  console.log("Alarm triggered:", alarm.name);
  if (alarm.name === "eyeBreakAlarm") {
    if (chrome.idle && chrome.idle.queryState) {
      console.log("chrome.idle is available");

      chrome.idle.queryState(60, (state) => {
        console.log("Idle state:", state);
        if (state === "active") {
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            console.log("Active tab query result:", tabs);
            if (tabs.length > 0) {
              const tab = tabs[0];
              if (tab.url?.startsWith("http")) {
                console.log("Sending message to content script...");
                chrome.tabs.sendMessage(tab.id, { action: "showBreak" }, (response) => {
                  if (chrome.runtime.lastError) {
                    console.error("❌ Error sending message:", chrome.runtime.lastError.message);
                  } else {
                    console.log("✅ Message response:", response);
                  }
                });
              } else {
                console.warn("⚠️ Skipping tab - Not a valid web page:", tab.url);
              }
            } else {
              console.warn("⚠️ No active tab found");
            }
          });
        } else {
          console.log("User not active. Skipping break prompt.");
        }
      });
    } else {
      console.warn("chrome.idle or chrome.idle.queryState is undefined!");
    }
  }
});
