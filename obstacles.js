let obstaclesArray = [];
let consecutiveTopCount = 0;
let consecutiveBottomCount = 0;

class Obstacle {
    constructor() {
        this.height = (Math.random() * canvas.height / 4) + 170;
        this.x = canvas.width;
        this.color = "hsla(" + hue + ",100%,50%,1)";

        if (consecutiveTopCount > 2) {
            this.top = false; 
            consecutiveTopCount = 0;
            consecutiveBottomCount++;
        } else if (consecutiveBottomCount > 2) {
            this.top = true; 
            consecutiveBottomCount = 0;
            consecutiveTopCount++;
        } else {
            this.top = Math.random() > 0.5; 
            if (this.top) {
                consecutiveTopCount++;
                consecutiveBottomCount = 0;
            } else {
                consecutiveBottomCount++;
                consecutiveTopCount = 0;
            }
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        if (this.top) {
            ctx.fillRect(this.x, 0, 35, this.height); 
        } else {
            ctx.fillRect(this.x, canvas.height - this.height, 35, this.height); 
        }
    }

    update() {
        this.x -= gameSpeed;
        this.draw();
    }
}
function handleObstacles() {
    if (frame % 50 === 0)
        obstaclesArray.unshift(new Obstacle());
    for (let i = 0; i < obstaclesArray.length; i++) {
        obstaclesArray[i].update();
    }
    if (obstaclesArray.length > 20)
        obstaclesArray.pop(obstaclesArray[0]);
}

function handleCollisions() {
    if(bird.y==0 || bird.y+bird.height==canvas.height)
        return true;
    for (let i = 0; i < obstaclesArray.length; i++) {
        let obstacle = obstaclesArray[i];
        if (obstacle.top) {
            if (
                bird.x < obstacle.x + 35 &&
                bird.x + bird.width > obstacle.x &&
                bird.y < obstacle.height
            ) {
                return true;
            }
        } else {
            if (
                bird.x < obstacle.x + 35 &&
                bird.x + bird.width > obstacle.x &&
                bird.y + bird.height > canvas.height - obstacle.height
            ) {
                return true;
            }
        }
    }
    return false;
}
  