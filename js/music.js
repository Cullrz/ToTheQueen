// js/music.js
window.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bgMusic");
  if (!music) return;

  // If user already allowed music on intro, keep playing
  const shouldPlay = localStorage.getItem("playMusic") === "1";

  // Restore the last saved time (if any)
  const saved = parseFloat(localStorage.getItem("musicTime") || "0");
  if (!Number.isNaN(saved) && saved > 0) {
    try { music.currentTime = saved; } catch (e) {}
  }

  // Keep saving time as it plays
  music.addEventListener("timeupdate", () => {
    localStorage.setItem("musicTime", String(music.currentTime || 0));
  });

  // Also save right before leaving the page
  window.addEventListener("beforeunload", () => {
    localStorage.setItem("musicTime", String(music.currentTime || 0));
  });

  // Try to autoplay if we already got permission on intro
  if (shouldPlay) {
    const p = music.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => {
        // Some browsers block autoplay on page load.
        // It will still keep the saved time and resume as soon as the user clicks anything.
      });
    }
  }
});
