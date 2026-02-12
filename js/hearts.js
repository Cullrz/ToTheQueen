const heartLayer = document.getElementById("hearts");

function spawnHeart() {
  const h = document.createElement("div");
  h.className = "heart";

  const left = Math.random() * 100;
  const size = 12 + Math.random() * 22; // 12-34px
  const dur = 4 + Math.random() * 5;    // 4-9s
  const drift = (Math.random() * 80) - 40; // -40px..+40px

  h.style.left = left + "vw";
  h.style.fontSize = size + "px";
  h.style.animationDuration = dur + "s";
  h.style.setProperty("--drift", drift + "px");

  heartLayer.appendChild(h);
  setTimeout(() => h.remove(), dur * 1000);
}

// starter burst
for (let i = 0; i < 14; i++) spawnHeart();

// continuous hearts
setInterval(spawnHeart, 220);