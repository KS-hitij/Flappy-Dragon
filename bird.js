const dragon=new Image();
dragon.src="dragon.png";
class Bird {
    constructor() {
        this.x = 100;
        this.y = 200;
        this.weight = 0.7;
        this.vy = 0;
        this.originalHeight=680;
        this.originalWidth=939;
        this.height=this.originalHeight/20;
        this.width=this.originalWidth/20;
        this.frameX=0;
    }
    update() {
        if(this.y+this.height > canvas.height)
        {
            this.vy=0;
            this.y=canvas.height-this.height;
        }
        else{
            this.vy += this.weight;
            this.vy *= 0.9;
            this.y +=this.vy;
        }
        if(this.y<=0)
        {
            this.y=0;
        }
        if(spacePressed)
        {
            this.flap();
        }
        else
        this.frameX=0;
    }
    draw()
    {
        ctx.fillStyle="red";
        ctx.beginPath();
        ctx.drawImage(dragon,this.originalWidth*this.frameX,0,this.originalWidth,this.originalHeight,this.x-10,this.y+5,this.width*1.2,this.height*1.4);
        ctx.fill();
    }
    flap()              
    {
        this.vy=0;
        this.y-=4;
        if(this.frameX>3)this.frameX=0;
        else if(frame%15==0)
        this.frameX++;
    }
}
let bird=new Bird();
let spacePressed=false;
window.addEventListener("keydown",(e)=>{
    if(e.code==="Space")
        spacePressed=true;
})
window.addEventListener("keyup",(e)=>{
    if(e.code==="Space")
        spacePressed=false;
})
