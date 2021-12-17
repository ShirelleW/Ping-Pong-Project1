// Set up vector class to hold x and y position
class Vec{
    constructor(x = 0, y= 0){
        this.x = x;
        this.y = y; 
    }
}
// RECTANGLE
class Rect{
    constructor(w, h){
        this.pos = new Vec;
        this.size = new Vec(w, h); 
    }

    //getters
    get left (){
        //left end of rect
        return this.pos.x - this.size.x / 2; 
    }
    get right (){
        //right end of rect
        return this.pos.x + this.size.x / 2; 
    }
        //top end of rect
    get top(){
        return this.pos.y - this.size.y / 2; 
    }
        //bottom end of rect
    get bottom(){
        return this.pos.y + this.size.y / 2 
    }
}
//Create the ball
class Ball extends Rect{
    constructor(){
        //size of ball
        super(10, 10)
        this.vel = new Vec; 
    }
}

class Pong{
    constructor(canvas){
        this._canvas = canvas;
        this._context = canvas.getContext("2d")

        this.ball = new Ball; 
        this.ball.pos.x = 100;
        this.ball.pos.y = 50; 
        this.ball.vel.x = 100; 
        this.ball.vel.y = 100; 


        //begin to animate the ball, movement of ball is relative to the delta time of the update method
        let lastTime;

        const callback = (millis) => {
            if (lastTime){
                //convert to whole secs
                this.update((millis - lastTime) / 1000); 
            }
            lastTime = millis; 
            requestAnimationFrame(callback); 
        };
        callback();
    }
    update(dt){
        this.ball.pos.x += this.ball.vel.x * dt;
        this.ball.pos.y += this.ball.vel.y * dt; 
    
        //if ball hits canvas borders, reverse velocity
        if (this.ball.left < 0 || this.ball.right > this._canvas.width){
            this.ball.vel.x = -this.ball.vel.x;
        }
        if(this.ball.top < 0 || this.ball.bottom > this._canvas.height){
            this.ball.vel.y = -this.ball.vel.y
        }
    
       this._context.fillStyle = "#17F7F7"
       this._context.fillRect(0, 0, this._canvas.width, this._canvas.height)
    
        //ball 
       this._context.fillStyle = "#0145FB"
       this._context.fillRect(this.ball.pos.x, this.ball.pos.y, this.ball.size.x, this.ball.size.y)
    }
}

const canvas = document.getElementById("pong");
const pong = new Pong(canvas);