const btn = document.getElementById("startBtn");
const intro = document.getElementById("intro");
const music = document.getElementById("music");

btn.onclick = async () => {
  try {
    await music.play();
    localStorage.setItem("musicUnlocked", "1");
  } catch (e) {
    alert("Music didn’t start. Check assets/take-you-there.mp3");
    return;
  }

  intro.classList.add("burn");

  setTimeout(() => {
    intro.style.display = "none";
  }, 2100);
};

function next(){
  window.location.href = "q2.html";
}