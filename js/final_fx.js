const yesBtn = document.getElementById("yesBtn");
const noBtn  = document.getElementById("noBtn");
const msg    = document.getElementById("finalMsg");
const stage  = document.getElementById("flowerStage");

const fxCanvas = document.getElementById("fxCanvas");
const ctx = fxCanvas.getContext("2d");

function resize() {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  fxCanvas.width  = Math.floor(window.innerWidth * dpr);
  fxCanvas.height = Math.floor(window.innerHeight * dpr);
  fxCanvas.style.width = "100vw";
  fxCanvas.style.height = "100vh";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener("resize", resize);
resize();

/* NO runs away */
function moveNo() {
  const pad = 18;
  const w = Math.max(10, window.innerWidth - noBtn.offsetWidth - pad);
  const h = Math.max(10, window.innerHeight - noBtn.offsetHeight - pad);
  noBtn.style.position = "fixed";
  noBtn.style.left = (pad + Math.random() * w) + "px";
  noBtn.style.top  = (pad + Math.random() * h) + "px";
  noBtn.style.zIndex = "9999";
}
noBtn.addEventListener("mouseenter", moveNo);
noBtn.addEventListener("touchstart", (e) => { e.preventDefault(); moveNo(); }, { passive:false });
noBtn.addEventListener("click", (e) => { e.preventDefault(); moveNo(); });

/* Shimmer + dim */
function shimmer() {
  const s = document.createElement("div");
  s.className = "shimmer";
  document.body.appendChild(s);
  setTimeout(() => s.remove(), 1300);
}
function dimBackground() {
  const d = document.createElement("div");
  d.className = "dimBack";
  document.body.appendChild(d);
}

/* Particles */
const particles = [];
const rand = (a,b) => a + Math.random()*(b-a);

function spawn(type, count) {
  const cx = window.innerWidth * 0.5;
  const cy = window.innerHeight * 0.52;

  for (let i=0;i<count;i++){
    const ang = Math.random() * Math.PI * 2;
    const speed = type === "petal" ? rand(1.2, 3.6) : rand(2.2, 6.0);

    particles.push({
      type,
      x: cx, y: cy,
      vx: Math.cos(ang) * speed,
      vy: Math.sin(ang) * speed - (type === "petal" ? rand(0.6, 2.0) : rand(1.6, 3.2)),
      r: type === "petal" ? rand(8, 14) : rand(2, 6),
      life: 0,
      max: type === "petal" ? rand(120, 175) : rand(60, 95),
      rot: rand(0, Math.PI*2),
      vr: rand(-0.12, 0.12),
      hue: type === "petal" ? rand(210, 240) : rand(200, 235),
      glow: type === "petal" ? 0.35 : 0.55,
      drift: type === "petal" ? rand(-0.18, 0.18) : 0
    });
  }
}

function drawHeart(x,y,s,rot,a){
  ctx.save();
  ctx.translate(x,y);
  ctx.rotate(rot);
  ctx.scale(s,s);
  ctx.globalAlpha = a;
  ctx.beginPath();
  ctx.moveTo(0, -0.6);
  ctx.bezierCurveTo(0.65, -1.2, 1.6, -0.35, 0, 1.2);
  ctx.bezierCurveTo(-1.6, -0.35, -0.65, -1.2, 0, -0.6);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawPetal(x,y,w,h,rot,a){
  ctx.save();
  ctx.translate(x,y);
  ctx.rotate(rot);
  ctx.globalAlpha = a;

  const g = ctx.createRadialGradient(-w*0.1, -h*0.2, 2, 0, 0, Math.max(w,h));
  g.addColorStop(0, "rgba(220,235,255,0.95)");
  g.addColorStop(0.45, "rgba(110,155,255,0.85)");
  g.addColorStop(1, "rgba(170,140,255,0.55)");

  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.ellipse(0,0,w,h,0,0,Math.PI*2);
  ctx.fill();
  ctx.restore();
}

function loop(){
  ctx.clearRect(0,0,window.innerWidth, window.innerHeight);

  for (let i = particles.length-1; i>=0; i--){
    const p = particles[i];
    p.life++;

    p.vy += (p.type === "petal") ? 0.012 : 0.03;
    p.vx += p.drift;
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;

    const t = p.life / p.max;
    const a = Math.max(0, 1 - t);

    ctx.save();
    ctx.shadowBlur = (p.type === "petal") ? 18 : 14;
    ctx.shadowColor = `rgba(140,170,255,${p.glow})`;

    if (p.type === "spark") {
      ctx.fillStyle = `hsla(${p.hue}, 100%, 78%, ${a})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
    } else if (p.type === "heart") {
      ctx.fillStyle = `hsla(${p.hue}, 100%, 80%, ${a})`;
      drawHeart(p.x, p.y, p.r/8, p.rot, a);
    } else {
      drawPetal(p.x, p.y, p.r*0.9, p.r*1.35, p.rot, a);
    }

    ctx.restore();

    if (p.life >= p.max || p.y > window.innerHeight + 140) {
      particles.splice(i,1);
    }
  }

  requestAnimationFrame(loop);
}
loop();

/* 3D BIG HEART (kept name buildFlower so we don’t change anything else) */
function buildFlower(){
  stage.classList.remove("hidden");

  const canvas = document.getElementById("threeCanvas");
  const renderer = new THREE.WebGLRenderer({ canvas, alpha:true, antialias:true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth/window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 5);

  scene.add(new THREE.AmbientLight(0x4d6fa8, 0.75));
  const key = new THREE.PointLight(0x9fc2ff, 1.4); key.position.set(2.5,2.5,3); scene.add(key);
  const rim = new THREE.PointLight(0xb39bff, 1.1); rim.position.set(-2.5,1.5,2.5); scene.add(rim);

  const heartShape = new THREE.Shape();
  heartShape.moveTo(0, 0.5);
  heartShape.bezierCurveTo(0, 0.5, -0.5, 0, -1.2, 0);
  heartShape.bezierCurveTo(-2.2, 0, -2.2, 1.3, -2.2, 1.3);
  heartShape.bezierCurveTo(-2.2, 2.2, -1.2, 3, 0, 3.8);
  heartShape.bezierCurveTo(1.2, 3, 2.2, 2.2, 2.2, 1.3);
  heartShape.bezierCurveTo(2.2, 1.3, 2.2, 0, 1.2, 0);
  heartShape.bezierCurveTo(0.5, 0, 0, 0.5, 0, 0.5);

  const geo = new THREE.ExtrudeGeometry(heartShape, {
    depth: 0.9,
    bevelEnabled: true,
    bevelSegments: 8,
    steps: 2,
    bevelSize: 0.25,
    bevelThickness: 0.25
  });
  geo.center();

  const mat = new THREE.MeshStandardMaterial({
    color: 0x7aa7ff,
    roughness: 0.25,
    metalness: 0.15,
    emissive: 0x3a5eff,
    emissiveIntensity: 0.35
  });

  const heart = new THREE.Mesh(geo, mat);
  heart.scale.set(0.01,0.01,0.01);
  heart.rotation.z = Math.PI;
  scene.add(heart);

  const glowMat = new THREE.MeshBasicMaterial({ color: 0x9fbaff, transparent:true, opacity:0.14 });
  const glow = new THREE.Mesh(geo.clone(), glowMat);
  glow.scale.set(1.15,1.15,1.15);
  glow.rotation.z = Math.PI;
  scene.add(glow);

  let t = 0;
  function anim(){
    t += 0.02;

    const grow = Math.min(1, t/1.2);
    const ease = 1 - Math.pow(1-grow, 3);
    const base = 0.01 + ease * 0.9;

    const beat = 1 + Math.sin(t*2.4) * 0.06;
    const s = base * beat;

    heart.scale.set(s,s,s);
    glow.scale.set(s*1.15,s*1.15,s*1.15);

    heart.rotation.y += 0.01;
    heart.rotation.x = Math.sin(t*0.7) * 0.12;
    heart.position.y = Math.sin(t*1.1) * 0.12;

    glow.position.copy(heart.position);
    glow.rotation.copy(heart.rotation);

    renderer.render(scene, camera);
    requestAnimationFrame(anim);
  }
  anim();

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
  });
}

/* YES flow */
yesBtn.addEventListener("click", () => {
  yesBtn.classList.add("yesLocked");
  yesBtn.disabled = true;
  noBtn.disabled = true;

  msg.textContent = "I knew it 💙";
  msg.classList.add("show");

  shimmer();

  spawn("spark", 130);
  setTimeout(() => spawn("heart", 70), 120);
  setTimeout(() => spawn("spark", 90), 240);

  setTimeout(() => {
    spawn("petal", 55);
    setTimeout(() => spawn("petal", 55), 220);
    setTimeout(() => spawn("petal", 55), 440);
  }, 520);

  setTimeout(() => dimBackground(), 1200);
  setTimeout(() => buildFlower(), 1550);
});