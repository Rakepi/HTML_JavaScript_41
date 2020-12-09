var c = document.querySelector('canvas')
var ctx = c.getContext('2d')
var timer = requestAnimationFrame(main)
var gravity = .3;
 
var asteroids = new Array();
var numAsteroids = 10;
var gameOver = false;
var score = 0;


function randomRange(high, low){
    return Math.random() * (high - low) + low;
}

//asteroid class
function Asteroids(){
    this.radius = randomRange(15,2)
    this.x = randomRange(0 + this.radius, c.width - this.radius);
    this.y = randomRange(0 + this.radius, c.width - this.radius)- c.height;
    this.vx = randomRange(-5,-10);
    this.vy = randomRange(10,5);
    this.color = "white";

    this.draw = function(){
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x,this.y,this.radius, 0, 2*Math.PI, true);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

    }

}

for(var i = 0; i<numAsteroids; i++){
    asteroids[i] = new Asteroids();
}

function Playership(){
    this.x = c.width/2;
    this.y = c.height/2;
    this.w = 20;
    this.h = 20;
    this.vx = 0;
    this.vy = 0;
    this.up = false;
    this.left = false;
    this.right = false;
    this.flamelength = 30;

    this.draw = function(){


        ctx.save();
        ctx.translate(this.x, this.y);
        // draws flames
        if(this.up == true){
            ctx.save();

            if(this.flamelength == 30){
                this.flamelength = 10
            }
            else{
                this.flamelength = 30
            }

            ctx.beginPath();
            ctx.fillStyle = 'yellow';
            ctx.moveTo(0, this.flamelength);
            ctx.lineTo(-5, 5);
            ctx.lineTo(5, -5);
            ctx.lineTo(0, this.flamelength);
            ctx.closePath()
            ctx.fill();
            ctx.restore();
        }

        ctx.beginPath();
        ctx.fillStyle = 'green'
        ctx.moveTo(0,-10);
        ctx.lineTo (10,10);
        ctx.lineTo (-10,10);
        ctx.lineTo (0,-10);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    this.move = function(){
        this.x += this.vx;
        this.y += this.vy;

        if(this.y > c.height - 10){
            this.y = c.height - 10;
            this.vy = 0;
        }
        //right boundry 
        if(this.x > c.width - 10){
            this.x = c.width - 10
            this.vx = 0
        }
        //left boundry
        if(this.x < 0 + 10){
            this.x = 0 + 10
            this.vx = 0
        }

        if(this.y < 0 + 10){
            this.y = 0 + 10
            this.vy = 0;
        }
        

    
    }
     
}

//instance of ship
var ship = new Playership();

// listeners
document.addEventListener("keydown", keypressdown);
document.addEventListener("keyup", keypressup);

//adding key functions
function keypressdown(e){

    if(e.keyCode === 38){
        ship.up = true
    }
    if(e.keyCode === 37){
        ship.left = true
    }
    if(e.keyCode === 39){
        ship.right = true
    }
   
}
function keypressup(e){

    if(e.keyCode === 38){
        ship.up = false
    }

    if(e.keyCode === 37){
        ship.left = false
    }

    if(e.keyCode === 39){
        ship.right = false
    }
    
}


function main(){
    ctx.clearRect(0,0,c.width,c.height);
    //draws score to screen/HUD
    ctx.save();
    ctx.font = "15px Arial";
    ctx.fillStyle ='white';
    ctx.fillText("Score: " + score.toString(), c.width - 150 , 30);
    ctx.restore();
    

    //key presses move ship
    if(ship.up == true){
       ship.vy = -6;
    }

    else{
        ship.vy = 3;
    }
    
    if(ship.left == true){
       ship.vx = -3
    }

   else if(ship.right == true){
        ship.vx = 3
    }
   
    else{
        ship.vx = 0
    }

        //loops asteroids
    for(var i = 0; i<asteroids.length; i++){
        //collition detection
        var dx = ship.x - asteroids[i].x;
        var dy = ship.y - asteroids[i].y;
        var dist = Math.sqrt((dx*dx)+(dy*dy));

        if(detectCollision(dist,(ship.h + asteroids[i].radius))){
            gameOver = true;
            document.removeEventListener("keydown", keypressdown);
            document.removeEventListener("keyup", keypressup);
        }



        //recycling the asteroids
        if(asteroids[i].y > c.height + asteroids[i].radius){
            asteroids[i].y = randomRange(c.height - asteroids[i].radius ,asteroids[i].radius)- c.height;
            asteroids[i].x = randomRange(c.width + asteroids[i].radius ,asteroids[i].radius);

        }

        if(gameOver == false){
            asteroids[i].y += asteroids[i].vy;
        }

       
        asteroids[i].draw();

    }

    ship.draw();
    if(gameOver == false){
    ship.move();
    }

    while(asteroids.length < numAsteroids){
        asteroids.push(new Asteroids());
    }

    timer = requestAnimationFrame(main);
}

function detectCollision(distance, calcDistance){
    return distance < calcDistance;
}

function scoreTimer(){
    if(gameOver == false){
        score++;
        //using modulus divide score by 3, if remainder is 0 add asteroids
        if(score % 5 == 0){
            numAsteroids += 3;
            console.log(numAsteroids);

        }
        //console.log(score);
        setTimeout(scoreTimer, 1000);
    }
}

scoreTimer();