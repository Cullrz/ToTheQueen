// /js/intro.js
// Intro overlay: starts music by user click, triggers burn, then goes to q1.html
// Also saves a flag so music can continue on the next pages via /js/music.js

window.addEventListener("DOMContentLoaded", () => {
  const intro  = document.getElementById("intro");
  const btn    = document.getElementById("startMusicBtn");
  const status = document.getElementById("introStatus");
  const music  = document.getElementById("bgMusic");

  // If any of these are missing, do nothing (prevents errors)
  if (!intro || !btn || !music) return;

  // Helpful defaults
  if (status) status.textContent = "";

  btn.addEventListener("click", async () => {
    try {
      btn.disabled = true;
      if (status) status.textContent = "Starting…";

      // Tell other pages to keep playing
      localStorage.setItem("playMusic", "1");

      // Only reset time the FIRST time ever
      if (!localStorage.getItem("musicStarted")) {
        localStorage.setItem("musicTime", "0");
        localStorage.setItem("musicStarted", "1");
      }

      // Start music (must be user-gesture)
      await music.play();

      if (status) status.textContent = "💙";

      // Burn transition (CSS handles the visuals)
      intro.classList.add("burn");

      // Give burn time to finish before changing page
      setTimeout(() => {
        window.location.href = "q1.html"; // <-- make sure your first question file is q1.html
      }, 2600);

    } catch (e) {
      console.log("Audio play blocked:", e);
      if (status) status.textContent = "Tap again (browser blocked it) 🙏";
      btn.disabled = false;
    }
  });
});
