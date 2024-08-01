const particlesArray=[];
class Particle{
    constructor() {
        this.x=bird.x;
        this.y=bird.y;
        this.size=Math.random()*7+3;
        this.vy=(Math.random()*3)-1.5;
        this.color="hsla("+hue+",100%,50%,0.7)";
    }
    update()
    {
        this.x-=gameSpeed;
        this.y+=this.vy;

    }
    draw()
    {
        ctx.fillStyle=this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size,0, Math.PI*2);
        ctx.fill();
    }
}

function handleParticles()
{
    particlesArray.unshift(new Particle());
    for(let i=0;i<particlesArray.length;i++)
    {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    if(particlesArray.length>200)
    {
        for(let i=0;i<20;i++)
        {
            particlesArray.splice(i,1);
        }
    }
}