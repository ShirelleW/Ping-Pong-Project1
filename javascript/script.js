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
}
//Create the ball
class Ball extends Rect{
    constructor(){
        //size of ball
        super(10, 10)
        this.vel = new Vec; 
    }
}

const canvas = document.getElementById("pong")
const context = canvas.getContext("2d")

const ball = new Ball; 
ball.pos.x = 100;
ball.pos.y = 50; 
// console.log(ball); 

context.fillStyle = "#17F7F7"
context.fillRect(0, 0, canvas.width, canvas.height)

context.fillStyle = "#fff"
context.fillRect(ball.pos.x, ball.pos.y, ball.size.x, ball.size.y)