console.log("Background script loaded");

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
  chrome.alarms.create("eyeBreakAlarm", { delayInMinutes: 1, periodInMinutes: 20 });
  console.log("Alarm created for every 20 minutes");
});

chrome.alarms.onAlarm.addListener((alarm) => {
  console.log("Alarm triggered:", alarm.name);
  if (alarm.name === "eyeBreakAlarm") {
    chrome.idle.queryState(60, (state) => {
      console.log("Idle state:", state);
      if (state === "active") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs.length > 0) {
            const tab = tabs[0];
            if (tab.url?.startsWith("http")) {
              
              chrome.scripting.executeScript(
                {
                  target: { tabId: tab.id },
                  files: ["content.js"],
                },
                () => {
                  console.log("✅ content.js injected");
                  
                  chrome.tabs.sendMessage(tab.id, { action: "showBreak" }, (response) => {
                    if (chrome.runtime.lastError) {
                      console.error("❌ Error sending message:", chrome.runtime.lastError.message);
                    } else {
                      console.log("✅ Message response:", response);
                    }
                  });
                }
              );
            } else {
              console.warn("Tab is not a http/https page.");
            }
          }
        });
      }
    });
  }
});
