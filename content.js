chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "showBreak") {
    showBreakOverlay();
  }
});

function showBreakOverlay() {
  document.querySelectorAll('#breakOverlay').forEach(el => el.remove());
  console.log("✅ Content script active");

  const visuals = [
    { img: 'panda.png', msg: "Panda says: Blink slowly and relax." },
    { img: 'sloth.png', msg: "Sloth says: Slow down, friend!" },
    { img: 'cat.png', msg: "Cat says: Stretch and look away." },
    { img: 'fox.png', msg: "Fox says: Be clever — rest your eyes!" },
    { img: 'penguin.png', msg: "Penguin says: Chill time!" },
    { img: 'frog.png', msg: "Frog says: Take a leap... into a break." },
    { img: 'koala.png', msg: "Koala says: Hang tight and rest!" },
    { img: 'duck.png', msg: "Duck says: Quack! Break time!" },
    { img: 'turtle.png', msg: "Turtle says: Take it slow, buddy." },
    { img: 'whale.png', msg: "Whale says: Drift into calm." },
    { img: 'bird.png', msg: "Bird says: Fly your eyes away from the screen." },
    { img: 'forest.png', msg: "Forest says: Let your vision breathe." },
    { img: 'lake.png', msg: "Lake says: Reflect with stillness." },
    { img: 'lotus.png', msg: "Lotus says: Float in peaceful focus." },
    { img: 'moon.png', msg: "Moon says: Shine after you rest." },
    { img: 'sakura.png', msg: "Sakura says: Bloom through rest." },
    { img: 'sun.png', msg: "Sun says: Recharge your glow." },
    { img: 'sunflower.png', msg: "Sunflower says: Turn to brightness." },
    { img: 'sunrise.png', msg: "Sunrise says: Start fresh with rest." },
    { img: 'mountain.png', msg: "Mountains say: Stand tall, take pause." },
    { img: 'night.png', msg: "Night says: Let your eyes rest in stillness." },
    { img: 'ocean.png', msg: "Ocean says: Let your eyes float free." }
  ];

  const quotes = [
    "👁️ Eye Break Time — 20 sec",
    "🎯 Want to crush goals? Rested eyes see clearer.",
    "💖 Love yourself — blink and breathe.",
    "🌈 Clarity comes to calm eyes.",
    "😎 Even superheroes take eye breaks.",
    "🧠 Power focus = powered rest.",
    "🥸 No blink? No think.",
    "💡 Shut the screen, open your mind.",
    "📵 Unplug to reload your vision.",
    "🧘‍♀️ Be mindful — eyes need it too."
  ];

  document.querySelectorAll('video').forEach(video => {
    if (!video.paused) {
      video.pause();
      video.setAttribute('data-paused-by-break-buddy', 'true');
    }
  });

  const overlay = document.createElement('div');
  overlay.id = 'breakOverlay';
  Object.assign(overlay.style, {
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: '1.6rem',
    zIndex: 999999,
    animation: 'fadeIn 0.5s ease-in-out'
  });

  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
  `;
  document.head.appendChild(style);

  const showVisual = Math.random() < 0.5;

  if (showVisual) {
    const item = visuals[Math.floor(Math.random() * visuals.length)];

    const img = document.createElement('img');
    img.src = chrome.runtime.getURL(item.img);
    Object.assign(img.style, {
      width: '130px',
      marginBottom: '1rem'
    });

    const msg = document.createElement('div');
    msg.textContent = item.msg;
    Object.assign(msg.style, {
      fontSize: '1rem',
      opacity: 0.9,
      marginTop: '0.5rem'
    });

    overlay.appendChild(img);
    overlay.appendChild(msg);

  } else {
    const quote = document.createElement('div');
    quote.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    Object.assign(quote.style, {
      fontSize: '2rem',
      fontWeight: '600',
      padding: '1rem 2rem',
      marginTop: '-60px',
      maxWidth: '80%',
      lineHeight: '1.4',
    });

    overlay.appendChild(quote);
  }

  const closeBtn = document.createElement('button');
  closeBtn.textContent = "×";
  Object.assign(closeBtn.style, {
    position: 'fixed',
    top: '10px',
    right: '10px',
    fontSize: '1.5rem',
    padding: '4px 10px',
    background: '#fff',
    color: '#000',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    zIndex: 1000000
  });
  closeBtn.onclick = () => overlay.remove();
  overlay.appendChild(closeBtn);

  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.style.animation = 'fadeOut 1s ease-out';
    setTimeout(() => overlay.remove(), 1000);
  }, 20000);
}
