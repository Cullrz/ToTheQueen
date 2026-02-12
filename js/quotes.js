const QUOTES = [
  // sweet
  "You’re my favorite place to be.",
  "If I’m doing life, I’m doing it with you.",
  "Loving you feels like peace.",
  "You + me = my best decision.",
  "I prayed, and God answered… with you.",
  "You’re the soft part of my day.",

  // Bible (your combined pool)
  "“Love is patient, love is kind.” — 1 Corinthians 13:4",
  "“Let all that you do be done in love.” — 1 Corinthians 16:14",
  "“We love because He first loved us.” — 1 John 4:19",
  "“Two are better than one.” — Ecclesiastes 4:9",
  "“Above all, love each other deeply.” — 1 Peter 4:8",
  "“I have found the one whom my soul loves.” — Song of Solomon 3:4",
  "“Many waters cannot quench love.” — Song of Solomon 8:7",
  "“Place me like a seal over your heart.” — Song of Solomon 8:6",
  "“Where you go, I will go.” — Ruth 1:16",
  "“A cord of three strands is not quickly broken.” — Ecclesiastes 4:12",
  "“He who finds a wife finds a good thing.” — Proverbs 18:22"
];

function addQuotes(count = 6) {
  const layer = document.createElement("div");
  layer.id = "quotes";
  document.body.appendChild(layer);

  const used = new Set();
  for (let i = 0; i < count; i++) {
    let idx = Math.floor(Math.random() * QUOTES.length);
    while (used.has(idx)) idx = Math.floor(Math.random() * QUOTES.length);
    used.add(idx);

    const q = document.createElement("div");
    q.className = "quote";
    q.textContent = QUOTES[idx];

    // random placement around edges (keeps center clean)
    const side = Math.random();
    const top = 8 + Math.random() * 84;

    if (side < 0.5) {
      q.style.left = (2 + Math.random() * 12) + "vw";
      q.style.textAlign = "left";
    } else {
      q.style.right = (2 + Math.random() * 12) + "vw";
      q.style.textAlign = "right";
    }

    q.style.top = top + "vh";
    q.style.transform = `rotate(${(-10 + Math.random()*20).toFixed(1)}deg)`;
    layer.appendChild(q);
  }
}

window.addEventListener("load", () => addQuotes(6));