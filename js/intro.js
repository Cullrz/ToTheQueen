window.addEventListener("DOMContentLoaded", () => {
  const intro  = document.getElementById("intro");
  const btn    = document.getElementById("startMusicBtn");
  const status = document.getElementById("introStatus");
  const music  = document.getElementById("bgMusic");

  if (!intro || !btn || !music) return;

  // Get the correct base folder for GitHub Pages project sites
  function getBasePath() {
    // If opened as a local file, just use relative links
    if (location.protocol === "file:") return "";

    const parts = location.pathname.split("/").filter(Boolean);

    // Example:
    // /ToTheQueen/           -> ["ToTheQueen"]
    // /ToTheQueen/index.html -> ["ToTheQueen","index.html"]
    // /ToTheQueen/q2.html    -> ["ToTheQueen","q2.html"]
    if (parts.length === 1 && !parts[0].includes(".")) {
      return "/" + parts[0] + "/";
    }

    // Otherwise, base is everything up to the last segment
    return "/" + parts.slice(0, -1).join("/") + "/";
  }

  const BASE = getBasePath();

  // Optional: force trailing slash when they open the repo URL without it
  if (location.protocol !== "file:") {
    const parts = location.pathname.split("/").filter(Boolean);
    if (parts.length === 1 && !location.pathname.endsWith("/")) {
      location.replace(location.pathname + "/");
      return;
    }
  }

  // Don’t show “Loading…” on top of the intro
  const loading = document.querySelector(".page h2");
  if (loading && loading.textContent.toLowerCase().includes("loading")) {
    loading.parentElement.style.display = "none";
  }

  btn.addEventListener("click", async () => {
    try {
      btn.disabled = true;
      if (status) status.textContent = "Starting...";

      // Tell next pages to keep trying to play
      localStorage.setItem("playMusic", "1");

      // Only reset time the first time ever (so it can continue later)
      if (!localStorage.getItem("musicStarted")) {
        localStorage.setItem("musicTime", "0");
        localStorage.setItem("musicStarted", "1");
      }

      // Start audio (must be a click)
      await music.play();

      if (status) status.textContent = "💙";

      // Burn transition
      intro.classList.add("burn");

      // Go to your FIRST question page
      setTimeout(() => {
        const next = "q2.html"; // <-- change ONLY this if your first page is different
        window.location.href = (BASE ? BASE + next : next);
      }, 2100);

    } catch (e) {
      console.log("Audio play blocked:", e);
      if (status) status.textContent = "Tap again (browser blocked it) 🙏";
      btn.disabled = false;
    }
  });
});

