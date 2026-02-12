window.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const btn = document.getElementById("startMusicBtn");
  const status = document.getElementById("introStatus");
  const music = document.getElementById("bgMusic");

  if (!intro || !btn || !music) return;

  btn.addEventListener("click", async () => {
    try {
      btn.disabled = true;
      status.textContent = "Starting…";

      // play audio (user gesture ✅)
      await music.play();

      status.textContent = "💙";

      // burn transition (your existing CSS handles this)
      intro.classList.add("burn");

      // after burn, go to Q1
      setTimeout(() => {
        window.location.href = "q1.html"; // <-- CHANGE THIS to your first question page file
      }, 2100);

    } catch (e) {
      // if browser blocks, show message + re-enable
      console.log("Audio play blocked:", e);
      status.textContent = "Tap again (browser blocked it) 🙏🏽";
      btn.disabled = false;
    }
  });
});

