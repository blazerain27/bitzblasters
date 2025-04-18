const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

let player = {
  x: 400,
  y: 300,
  speed: 4,
  color: "#00ffff",
  size: 20
};

let paintBlobs = [];

let keys = {};
window.addEventListener("keydown", e => keys[e.key] = true);
window.addEventListener("keyup", e => keys[e.key] = false);

window.addEventListener("click", () => {
  paintBlobs.push({
    x: player.x,
    y: player.y,
    dx: Math.cos(angleToMouse),
    dy: Math.sin(angleToMouse),
    size: 10,
    color: "#ff00ff"
  });
});

let mouseX = 0, mouseY = 0, angleToMouse = 0;
canvas.addEventListener("mousemove", (e) => {
  mouseX = e.offsetX;
  mouseY = e.offsetY;
  angleToMouse = Math.atan2(mouseY - player.y, mouseX - player.x);
});

function update() {
  if (keys["w"]) player.y -= player.speed;
  if (keys["s"]) player.y += player.speed;
  if (keys["a"]) player.x -= player.speed;
  if (keys["d"]) player.x += player.speed;

  for (let blob of paintBlobs) {
    blob.x += blob.dx * 6;
    blob.y += blob.dy * 6;
  }
}

function draw() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = player.color;
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
  ctx.fill();

  for (let blob of paintBlobs) {
    ctx.fillStyle = blob.color;
    ctx.beginPath();
    ctx.arc(blob.x, blob.y, blob.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
