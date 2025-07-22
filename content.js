const mascots = [
  "bird", "cat", "duck", "flame", "forest", "fox", "frog", "koala", "lake",
  "lotus", "moon", "mountain", "night", "ocean", "panda", "penguin",
  "sakura", "sloth", "sun", "sunflower", "sunrise", "turtle", "whale"
];

const puns = [
  "Your eyes called... they need a vacation 🏖️",
  "Step away from the glow, hero of the screen ⚔️",
  "Blink like nobody’s watching 👀",
  "Screens will wait. Your eyes won’t.",
  "Look 20 feet away... trust me, it’s worth it.",
  "Close your eyes, not your tabs 💤",
  "The grind can wait. Your eyes can't. 💡",
  "DND: Eyes recovering from overexposure ☠️",
  "Pause the hustle, protect the muscle (eye muscle, duh)",
  "Breathe in. Blink out. 💨",
  "Even digital warriors need eye breaks 🧙‍♂️",
  "Just 20 seconds. For the love of corneas!",
  "Don’t fry your eyes, you spicy pixel goblin 🌶️",
  "You’re doing amazing. Now stop staring. 😎",
  "Legends take breaks. So should you.",
  "Get up, stretch, and blink like a boss.",
  "Your retinas will throw a party for this break 🎉",
  "Respect the vision, not just the mission.",
  "Be kind to your future eyes 👁️",
  "Your screen is NOT your soulmate. Take a break 🫣"
];

chrome.runtime.onMessage.addListener((req) => {
  if (req.action === "showBreak") {
    
    if (document.getElementById("eye-break-overlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "eye-break-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
    overlay.style.zIndex = 999999;
    overlay.style.display = "flex";
    overlay.style.flexDirection = "column";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.color = "#fff";
    overlay.style.fontFamily = "Arial, sans-serif";

    const mascot = mascots[Math.floor(Math.random() * mascots.length)];
    const text = puns[Math.floor(Math.random() * puns.length)];

    const img = document.createElement("img");
    img.src = chrome.runtime.getURL(`assets/Images/${mascot}.png`);
    img.alt = mascot;
    img.style.width = "160px";
    img.style.marginBottom = "20px";

    const quote = document.createElement("p");
    quote.textContent = `Eye Break Buddy says: ${text}`;
    quote.style.fontSize = "18px";
    quote.style.textAlign = "center";
    quote.style.marginBottom = "20px";
    quote.style.padding = "0 20px";

    const closeBtn = document.createElement("div");
    closeBtn.textContent = "✖";
    closeBtn.title = "Close break";
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "15px";
    closeBtn.style.right = "20px";
    closeBtn.style.fontSize = "24px";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.color = "#ccc";

    overlay.appendChild(closeBtn);
    overlay.appendChild(img);
    overlay.appendChild(quote);
    document.body.appendChild(overlay);

  
    const mediaEls = document.querySelectorAll("video, audio");
    mediaEls.forEach(el => el.pause());

    const removeOverlay = () => {
      overlay.remove();
      mediaEls.forEach(el => el.play());

      const chime = new Audio(chrome.runtime.getURL("assets/audio/chime.mp3"));
      chime.play();

      chrome.storage.sync.get(["streak", "totalBreaks"], ({ streak = 0, totalBreaks = 0 }) => {
        chrome.storage.sync.set({
          streak: streak + 1,
          totalBreaks: totalBreaks + 1
        });
      });
    };

    const timeoutId = setTimeout(removeOverlay, 20000);

    closeBtn.onclick = () => {
      clearTimeout(timeoutId);
      removeOverlay();
    };
  }
});
