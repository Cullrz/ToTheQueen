// /js/music.js
window.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("music"); // must exist on every page
  if (!music) return;

  // Make sure we have a resume button (in case autoplay gets blocked)
  let resumeWrap = document.getElementById("musicResumeWrap");
  if (!resumeWrap) {
    resumeWrap = document.createElement("div");
    resumeWrap.id = "musicResumeWrap";
    resumeWrap.style.position = "fixed";
    resumeWrap.style.left = "50%";
    resumeWrap.style.bottom = "18px";
    resumeWrap.style.transform = "translateX(-50%)";
    resumeWrap.style.zIndex = "9999";
    resumeWrap.style.display = "none";

    const btn = document.createElement("button");
    btn.id = "musicResumeBtn";
    btn.textContent = "Tap to resume music 💙";
    btn.style.padding = "12px 16px";
    btn.style.border = "none";
    btn.style.borderRadius = "999px";
    btn.style.cursor = "pointer";
    btn.style.background = "rgba(92,124,255,0.95)";
    btn.style.color = "white";
    btn.style.fontSize = "16px";
    btn.style.boxShadow = "0 0 25px rgba(92,124,255,.35)";

    resumeWrap.appendChild(btn);
    document.body.appendChild(resumeWrap);

    btn.addEventListener("click", async () => {
      try {
        // restore time again (some browsers reset it when blocked)
        const t = parseFloat(localStorage.getItem("musicTime") || "0");
        if (!Number.isNaN(t)) music.currentTime = t;

        await music.play();
        resumeWrap.style.display = "none";
      } catch (e) {
        // still blocked, leave button there
        resumeWrap.style.display = "block";
      }
    });
  }

  const shouldPlay = localStorage.getItem("playMusic") === "1";

  // Restore time FIRST
  const saved = parseFloat(localStorage.getItem("musicTime") || "0");
  if (!Number.isNaN(saved) && saved > 0 && saved < 999999) {
    try { music.currentTime = saved; } catch {}
  }

  // Try to continue playing if user said yes on intro
  async function tryPlay() {
    if (!shouldPlay) return;

    try {
      await music.play();
      resumeWrap.style.display = "none";
    } catch (e) {
      // Autoplay got blocked on this page load
      resumeWrap.style.display = "block";
    }
  }

  tryPlay();

  // Save time while playing (throttled)
  let lastSave = 0;
  music.addEventListener("timeupdate", () => {
    const now = Date.now();
    if (now - lastSave > 500) {
      localStorage.setItem("musicTime", String(music.currentTime || 0));
      lastSave = now;
    }
  });

  // Save time right before leaving page
  window.addEventListener("beforeunload", () => {
    localStorage.setItem("musicTime", String(music.currentTime || 0));
  });

  // ALSO expose a helper for your page buttons to save right before redirect
  window.__saveMusicTime = () => {
    try {
      localStorage.setItem("musicTime", String(music.currentTime || 0));
    } catch {}
  };
});
