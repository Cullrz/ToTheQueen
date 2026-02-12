// Keeps music playing across pages using localStorage time
const music = document.getElementById("music");

window.addEventListener("load", async () => {
  // Only try to autoplay after user already tapped on intro
  const unlocked = localStorage.getItem("musicUnlocked") === "1";
  if (!unlocked) return;

  const savedTime = parseFloat(localStorage.getItem("musicTime") || "0");
  if (!Number.isNaN(savedTime) && savedTime > 0) {
    try { music.currentTime = savedTime; } catch (e) {}
  }

  try { await music.play(); } catch (e) {}
});

// Save time frequently
setInterval(() => {
  if (!music) return;
  localStorage.setItem("musicTime", String(music.currentTime || 0));
}, 700);