// Set up vector class to hold x and y position
class Vec{
    constructor(x = 0, y= 0){
        this.x = x;
        this.y = y; 
    }
    get len(){
        //hypotenuses of triangle
        return Math.sqrt(this.x * this.x + this.y * this.y )
    }
    set len(value){
        const fact = value / this.len; 
        this.x *= fact; 
        this.y *= fact; 
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

// draw the paddles
class Player extends Rect {
    constructor(){
        super(20, 100)
        this.score = 0 ;
    }
}

class Pong{
    constructor(canvas){
        this._canvas = canvas;
        this._context = canvas.getContext("2d")
       

        this.ball = new Ball;  

        
        //creating two players
        this.players = [
            new Player,
            new Player
        ]
        //positioning the two players
        this.players[0].pos.x = 40; 
        this.players[1].pos.x = this._canvas.width - 40; 
        this.players.forEach(player => {
            player.pos.y = this._canvas.height/2; 
        })

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

        // score graphics
        this.CHAR_PIXEL = 10; 
        this.CHARS = 
        [
            "111101101101111", "010010010010010", "111001111100111", "111001111001111", "101101111001001", "111100111001111",
            "111100111101111", "111001001001001", "111101111101111",
            "111101111001111"
        ].map(str => {
            const canvas = document.createElement("canvas"); 
            canvas.height = this.CHAR_PIXEL * 5
            canvas.width = this.CHAR_PIXEL * 3
            const context = canvas.getContext("2d")
            context.fillStyle = "#FB1C29"
            str.split("").forEach((fill, i) => {
                if(fill === "1"){
                    context.fillRect(
                        (i % 3) * this.CHAR_PIXEL, 
                        (i / 3 | 0) * this.CHAR_PIXEL, 
                        this.CHAR_PIXEL,
                        this.CHAR_PIXEL); 
                }
        })
        return canvas;
    })
        this.reset();
    }  
    //collison detection
    collide(player, ball){
        if(player.left< ball.right && player.right > ball.left && player.top < ball.bottom && player.bottom > ball.top){
            const len = ball.vel.len;
            //negate ball velocity
            ball.vel.x = -ball.vel.x
            ball.vel.y += 300 * (Math.random () - .5)
            //increase ball speed by 5% everytime it hits the ball paddles
            ball.vel.len = len * 1.05  
        }
    }
    draw(){
       this._context.fillStyle = "#17F7F7"
       this._context.fillRect(0, 0, this._canvas.width, this._canvas.height)
       
       this.drawRect(this.ball)
       this.players.forEach(player => this.drawRect(player))

       this.drawScore(); 
    }

    drawRect(rect){
        
        this._context.fillStyle = "#0145FB"
        this._context.fillRect(rect.left, rect.top, rect.size.x, rect.size.y)
    }

    //to string then back to integer
    drawScore(){
        const align = this._canvas.width / 3 
        const CHAR_W = this.CHAR_PIXEL * 4 
        this.players.forEach((player, index) => {
            const chars = player.score.toString().split("");
            const offset = align * (index + 1) - (CHAR_W * chars.length / 2) + 
            this.CHAR_PIXEL /2; 

            chars.forEach((char, pos) => {
                this._context.drawImage(this.CHARS[char|0],
                        offset + pos * CHAR_W, 20)
            })
        })
    }

    reset(){
        this.ball.pos.x = this._canvas.width /2;
        this.ball.pos.y = this._canvas.height / 2; 

        this.ball.vel.x = 0; 
        this.ball.vel.y = 0;
    }

    start(){
        if(this.ball.vel.x === 0 && this.ball.vel.y === 0){
        // tenerary op, if what is returned by math rand is > 5 , mult x valvue with 1 but if less tha n 5 , -1 vel
        this.ball.vel.x = 300 * (Math.random() > .5 ? 1 : -1) 
        this.ball.vel.y = 300 * (Math.random() * 2 - 1)
        this.ball.vel.len = 200; 
        }
    }

    restart(){
        console.log("test")
        this.players[0].score === 0; 
        this.players[1].score === 0; 

        document.getElementById("modal").style.display="none"
        this.reset(); 
    }
    update(dt){
        this.ball.pos.x += this.ball.vel.x * dt;
        this.ball.pos.y += this.ball.vel.y * dt; 
    
        
        //Keeping track of score
        if (this.ball.left < 0 || this.ball.right > this._canvas.width){
            const playerId = this.ball.vel.x < 0 | 0; 
            this.players[playerId].score++;

            if(this.players[playerId].score === 5){
                document.getElementById("modal").style.display="flex";  
            }

            this.reset();
        }

        //if ball hits canvas borders, reverse velocity
        if(this.ball.top < 0 || this.ball.bottom > this._canvas.height){
            this.ball.vel.y = -this.ball.vel.y
        }

        //this makes computer follow ball; given a max speed for fair play 
        const speed = 1.17;
        this.players[1].pos.y = this.ball.pos.y * speed; 

        this.players.forEach(player => this.collide(player, this.ball))
        this.draw()
    }
}

const canvas = document.getElementById("pong");
const pong = new Pong(canvas);

// allow player 1 movement by mouse
canvas.addEventListener("mousemove", event => pong.players[0].pos.y = event.offsetY)

canvas.addEventListener("click", event => {
    pong.start();
}); 

document.getElementById("pa").addEventListener("click", () => {
    console.log("test")
    console.log(pong.players[1].score)
        pong.players[0].score = 0; 
        pong.players[1].score = 0; 
        console.log(pong.players[1].score)

    document.getElementById("modal").style.display="none"
    pong.reset(); 
})