var c = document.querySelector('canvas')
var ctx = c.getContext('2d')
var timer = requestAnimationFrame(main)

var gravity = .35;
var asteroids = new Array();
var numAsteroids = 10;

var gameOver = true;
var score = 0;
var highScore = 0;

var BG = new Image();
var astSprite = new Image();
var ShipSprite = new Image();
var Table = new Image();
BG.src = "images/BG$.jpg";
astSprite.src = "images/asteroid sprite.png";
ShipSprite.src = "images/Ship.png";
Table.src = "images/Table.jpg"


BG.onload = function(){
    main();
}
astSprite.onload = function(){
    main();
}
ShipSprite.onload = function(){
    main();
}

var gameStates = [];
var currentState = 0;
var ship;

function randomRange(high, low){
    return Math.random() * (high - low) + low;
}

function Asteroids(){
    this.radius = randomRange(15,2)
    this.x = randomRange(0 + this.radius, c.height - this.radius) + c.width;
    this.y = randomRange(0 + this.radius, c.width - this.radius);//- c.height;
    this.vx = randomRange(-5,-10);
    this.vy = randomRange(-10,-5);

    this.draw = function(){
        ctx.save();
        ctx.drawImage(astSprite, this.x - this.radius, this.y - this.radius, this.radius*2, this.radius*2)
        ctx.restore();
    }

}
//Ship class ---------------------------------------------------------
function Playership(){
    this.x = c.width/2;
    this.y = c.height/2;
    this.w = 50;
    this.h = 50;
    this.vx = 0;
    this.vy = 0;
    this.up = false;
    this.left = false;
    this.right = false;
    this.flamelength = 30;

    this.draw = function(){
        ctx.save();
        ctx.translate(this.x, this.y);
        //flames for bottom of ship-----------------------------------
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
            //Ship--------------------------------------------------------
            ctx.beginPath();
            ctx.fillStyle = 'green'
            ctx.fill();
            ctx.drawImage(ShipSprite, -this.w/2,-this.h/2,this.w,this.h);
            ctx.restore();
    }
//bountries----------------------------------------------------------
    this.move = function(){
        this.x += this.vx;
        this.y += this.vy;

        if(this.y > c.height - 10){
            this.y = c.height - 10;
            this.vy = 0;
        }
        
        if(this.x > c.width - 10){
            this.x = c.width - 10
            this.vx = 0
        }

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

function gameStart(){
    for(var i = 0; i<numAsteroids; i++){
        asteroids[i] = new Asteroids();
    }
    ship = new Playership();
}

document.addEventListener("keydown", keypressdown);
document.addEventListener("keyup", keypressup);

function keypressup(e){
    if(gameOver == false){
        if(e.keyCode === 38){
            ship.up = false
        }
        if(e.keyCode === 40){
            ship.down = false
        }
        if(e.keyCode === 39){
            ship.right = false
        }
    }
}

function keypressdown(e){
    if(gameOver == false){
        if(e.keyCode === 38){
            ship.up = true
        }
        if(e.keyCode === 40){
            ship.down = true
        }
        if(e.keyCode === 39){
            ship.right = true
        }
    }
    if(gameOver == true){
        if(e.keyCode === 13){

            if(currentState == 2){
                currentState = 0;
                score = 0;
                numAsteroids = 10;
                asteroids = [];
                main();
                gameStart();
            }
            else{
                gameStart();
                gameOver = false;
                currentState = 1;
                main();
                scoreTimer();
            }
            
        }
    }
}

//gameStates--------------------------------------------------------
gameStates[0] = function(){
ctx.drawImage(BG ,0,0, c.width, c.height);
ctx.save();
ctx.font = "30px Arial";
ctx.fillStyle = "white";
ctx.textAlign = "center";
ctx.fillText("Astroid Avoidance", c.width/2, c.height/2 - 30);
ctx.font = "15px Arial";
ctx.fillText("Press Enter to start", c.width/2, c.height/2 + 20);
ctx.restore();
}

gameStates[1] = function(){
    //Score HUD-------------------------------------------------------
    ctx.save();
    ctx.font = "15px Arial";
    ctx.fillStyle ='white';
    ctx.fillText("Score: " + score.toString(), c.width - 150 , 30);
    ctx.restore();
    //key presses move ship-------------------------------------------
    if(ship.right == true){
       ship.vx = 6;
    }
    else{
        ship.vx = -3;
    }
    if(ship.up == true){
       ship.vy = -3
    }
   else if(ship.down == true){
        ship.vy = 3
    }
    else{
        ship.vy = 0
    }
        //for loop-- asteroids
    for(var i = 0; i<asteroids.length; i++){
        //collition-------------------------------------------
        var dx = ship.x - asteroids[i].x;
        var dy = ship.y - asteroids[i].y;
        var dist = Math.sqrt((dx*dx)+(dy*dy));

        if(detectCollision(dist,(ship.h/2 + asteroids[i].radius))){
            gameOver = true;
            currentState = 2;
        }

        if(asteroids[i].x < 0 - asteroids[i].radius){
            asteroids[i].y = randomRange(c.height - asteroids[i].radius ,asteroids[i].radius);//- c.height;
            asteroids[i].x = randomRange(c.width + asteroids[i].radius ,asteroids[i].radius)+ c.width;
        }

        if(gameOver == false){
            asteroids[i].x += asteroids[i].vx;
        }

       
        asteroids[i].draw();

    }
    // ship draw---------------------------------------------------
    ship.draw();

    if(gameOver == false){
    ship.move();
    }

    while(asteroids.length < numAsteroids){
        asteroids.push(new Asteroids());
    }
    
}

gameStates[2] = function(){
    if(score > highScore){
        highScore = score;
        ctx.drawImage(Table ,0,0, c.width, c.height);
        ctx.save();
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Game Over, Your score was: " + score.toString(), c.width/2, c.height/2 - 60);
        ctx.fillText("Your New High Score is: " + highScore.toString(), c.width/2, c.height/2 - 30);
        ctx.fillText( " New Record", c.width/2, c.height/2);
        ctx.font = "15px Arial";
        ctx.fillText("Press Enter to start", c.width/2, c.height/2 + 20);
        ctx.restore();
    }
    else{
        ctx.save();
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Game Over, Your score was: " + score.toString(), c.width/2, c.height/2 - 60);
        ctx.fillText("Your high score is: " + highScore.toString(), c.width/2, c.height/2 - 30);
        ctx.font = "15px Arial";
        ctx.fillText("Press Enter to start", c.width/2, c.height/2 + 20);
        ctx.restore();
        
    }

}    
//Main Functions------------------------------------------------------
function main(){
    ctx.clearRect(0,0,c.width,c.height);
    if(gameOver == false){
    timer = requestAnimationFrame(main);
    } 
    gameStates[currentState]();
}

function detectCollision(distance, calcDistance){
    return distance < calcDistance;
}

function scoreTimer(){
    if(gameOver == false){
        score++;
        //modulus
        if(score % 5 == 0){
            numAsteroids += 3;
            console.log(numAsteroids);

        }

        setTimeout(scoreTimer, 1000);
    }
}