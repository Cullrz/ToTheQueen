// js/music.js
window.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bgMusic");
  if (!music) return;

  // Resume if user already started music
  const shouldPlay = localStorage.getItem("playMusic") === "1";
  const savedTime = parseFloat(localStorage.getItem("musicTime") || "0");

  if (shouldPlay) {
    // try to continue where it left off
    if (!Number.isNaN(savedTime) && savedTime > 0) {
      music.currentTime = savedTime;
    }

    // Attempt autoplay (may fail until user clicks once on that page)
    music.play().catch(() => {
      // If blocked, show a tiny tap-to-resume banner
      showTapToResume(music);
    });
  }

  // Keep saving time while it plays
  const saveTime = () => localStorage.setItem("musicTime", String(music.currentTime));
  music.addEventListener("timeupdate", saveTime);
  music.addEventListener("pause", saveTime);
  window.addEventListener("beforeunload", saveTime);

  function showTapToResume(musicEl) {
    // avoid duplicates
    if (document.getElementById("resumeMusicBar")) return;

    const bar = document.createElement("div");
    bar.id = "resumeMusicBar";
    bar.style.position = "fixed";
    bar.style.left = "50%";
    bar.style.top = "16px";
    bar.style.transform = "translateX(-50%)";
    bar.style.zIndex = "99999";
    bar.style.padding = "10px 14px";
    bar.style.borderRadius = "999px";
    bar.style.background = "rgba(255,255,255,0.12)";
    bar.style.backdropFilter = "blur(10px)";
    bar.style.boxShadow = "0 0 25px rgba(110,150,255,0.25)";
    bar.style.color = "white";
    bar.style.fontFamily = "Arial, sans-serif";
    bar.style.fontSize = "14px";
    bar.style.cursor = "pointer";
    bar.textContent = "Tap to resume music 💙";

    bar.addEventListener("click", async () => {
      try {
        await musicEl.play();
        bar.remove();
      } catch (e) {
        // still blocked
      }
    });

    document.body.appendChild(bar);
  }
});
