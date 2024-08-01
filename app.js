const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.height = 600;
canvas.width = 800;
ctx.fillStyle="yellow";
ctx.font = "italic bold 60px serif";
ctx.fillText("Flappy Dragon", 210, 250);

const background = new Image();
background.src = "BG.png";
const BG = {
  x1: 0,
  x2: canvas.width,
  y: 0,
  width: canvas.width,
  height: canvas.height
};

function handleBG() {
  if(BG.x1<=-canvas.width +gameSpeed)
    BG.x1=BG.width-gameSpeed;
  else
    BG.x1-=gameSpeed;
    if(BG.x2<=-canvas.width +gameSpeed)
      BG.x2=BG.width-gameSpeed;
    else
      BG.x2-=gameSpeed;

  ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
  ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleBG();
  handleObstacles();
  handleParticles();
  bird.update();
  bird.draw();
  if (handleCollisions()) {
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Your Score Is " + score, (canvas.width / 2) - 85, canvas.height / 2 -30);
    endGame();
    return;
  }
  hue++;
  frame++;
  score++;
  requestAnimationFrame(animate);
}
function startGame() {
  BG.x1=0;
  BG.x2=canvas.width-gameSpeed;
  document.querySelector("audio").loop=true;
  document.querySelector("audio").play();
  gameSpeed = 4;
  hue = 0;
  frame = 0;
  score = 0;
  animate();
}
function endGame()
{
    document.querySelector("audio").pause();
    document.querySelector("audio").currentTime=0;
    gameSpeed=4;
    hue=0;
    score=0;
    frame=0;
    play.innerText="Play Again";
    play.style.display="inline-block";
    return;
}
let play = document.querySelector(".play");
play.addEventListener("click", () => {
  canvas.style.background="none";
  particlesArray.length=0;
  obstaclesArray.length=0;
  bird= new Bird();
  play.style.display = "none";
  document.querySelector(".help").style.display="none";
  document.querySelector(".frame-1").style.display="none";
  document.querySelector(".frame-2").style.display="none";
  startGame();
})

let back=document.createElement("button");
back.innerText="Back";
let help=document.querySelector(".help");
help.addEventListener("click",()=>{
  play.style.display="none";
  help.style.display="none";
  let helpText=document.querySelector(".help_text");
  helpText.style.display="inline-block";
  let back=document.createElement("button");
  back.innerText="Back";
  back.style.position="absolute";
  back.style.top="480px";
  back.style.left="890px";
  document.body.appendChild(back);
  back.addEventListener("click",()=>{
    document.body.removeChild(back);
    helpText.style.display="none";
    play.style.display="inline-block";
    help.style.display="inline-block";
  })
})

let gameSpeed = 4;
let hue = 0;
let frame = 0;
let score = 0;




