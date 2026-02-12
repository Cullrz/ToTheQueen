window.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const btn = document.getElementById("startMusicBtn");

  btn.addEventListener("click", async () => {
    const ok = await window.__playMusic?.();

    // burn regardless, but music should work now because it's user-clicked
    intro.classList.add("burn");

    setTimeout(() => {
      // go to first question page
      window.location.href = "q2.html"; // change if your first question page is different
    }, 2100);
  });
});
