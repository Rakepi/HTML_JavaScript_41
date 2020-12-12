var c = document.querySelector('canvas')
var ctx = c.getContext('2d')
var timer = requestAnimationFrame(main)
var gravity = .3;
//remember to play with gravity 
var asteroids = new Array();
var numAsteroids = 10;
var gameOver = true;
var score = 0;
var highScore = 0;
var bgMain = new Image();
var astSprite = new Image();
var Sprite = new Image();

bgMain.src = "images/Rocks.jpg";
astSprite.src = "images/astSprite.png";
astSprite.src = "images/Sprite.png";

//event listener to triger main when img is loaded
bgMain.onload = function(){
    main();
}
astSprite.onload = function(){
    main();
}

var gameStates = [];
var currentState = 0;
var ship;

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

    this.draw = function(){
        ctx.save();
        ctx.drawImage(astSprite, this.x - this.radius, this.y - this.radius, this.radius*2, this.radius*2)
        ctx.restore();
    }

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
//bountries
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
    //this makes an instance of ship
    ship = new Playership();
}

//event listeners
document.addEventListener("keydown", keypressdown);
document.addEventListener("keyup", keypressup);

//adding key functions
function keypressup(e){
    //console.log("key pressed " + e.keyCode)

    if(gameOver == false){
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
    
}

function keypressdown(e){//console.log("key pressed " + e.keyCode)
   
    if(gameOver == false){
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

//gameStates state mech
gameStates[0] = function(){
ctx.drawImage(bgMain ,0,0, c.width, c.height);
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
        
    //draws score HUD
    ctx.save();
    ctx.font = "15px Arial";
    ctx.fillStyle ='white';
    ctx.fillText("Score: " + score.toString(), c.width - 150 , 30);
    ctx.restore();
    //ship.vy += gravity;

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
        //collition math
        var dx = ship.x - asteroids[i].x;
        var dy = ship.y - asteroids[i].y;
        var dist = Math.sqrt((dx*dx)+(dy*dy));

        if(detectCollision(dist,(ship.h + asteroids[i].radius))){
           // console.log("colliding with asteroid " + i);
            gameOver = true;
            currentState = 2;
        }

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
    
}

gameStates[2] = function(){
    if(score > highScore){
        highScore = score;
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

function main(){
    ctx.clearRect(0,0,c.width,c.height);
    // Game code was here
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
        //using modulus divide score by 5. if remainder is 0 add asteroids
        if(score % 5 == 0){
            numAsteroids += 3;
            console.log(numAsteroids);

        }
        //console.log(score);
        setTimeout(scoreTimer, 1000);
    }
}
