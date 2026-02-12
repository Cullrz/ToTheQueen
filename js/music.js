window.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bgMusic");

  // helpful for debugging
  audio.addEventListener("error", () => {
    console.log("Audio error. Check file path + name:", audio.src);
  });

  window.__playMusic = async () => {
    try {
      audio.volume = 0.85;
      await audio.play();
      console.log("Music playing ✅");
      return true;
    } catch (e) {
      console.log("Music play blocked ❌", e);
      return false;
    }
  };
});
