var c = document.querySelector('canvas')
var ctx = c.getContext('2d')

var timer = requestAnimationFrame(main)

var cars =[]
var numCars = 3


var currentState = 0
var states = []

var winner
var choice = 1;


function GameObject(){
    this.x = 50
    this.y = 50
    this.w = 50
    this.h = 50
    this.color = 'purple'
    this.speed = 1
    this.fuel = 100

    this.draw = function(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }

    this.move = function(){
        this.x += this.speed
    }
}

for(var i = 0; i < numCars; i++){
    cars[i] = new GameObject(0)
    cars[i].x = 15
    cars[i].speed = randomRange(10,1)
    
}

 

var finishLine = new GameObject()
finishLine.x = 700
finishLine.y = 100
finishLine.w = 10
finishLine.h = 400
finishLine.color = 'grey'

var startLine = new GameObject()
startLine.x = 100
startLine.y = 100
startLine.w = 10
startLine.h = 400
startLine.color = 'purple'

cars[0].y = 150
cars[1].y = 250
cars[2].y = 350


cars[0].w = 75
cars[1].w = 75
cars[2].w = 75


cars[0].color = 'violet'
cars[1].color = 'teal'
cars[2].color = 'black'


states[0] = function(){
   
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0,0,c.width,c.height);
   
    ctx.fillStyle = "white"
    ctx.font = "60px Arial"
    ctx.textAlign = "center"
    ctx.fillText("choose the winner!", c.width/2, c.height/2 - 100)
    ctx.fillText("use keys 1, 2, or 3", c.width/2, c.height/2 + 100)
}

states[1] = function(){
    
    for(var i = 0; i < cars.length; i++){
        cars[i].move()
        if(cars[i].x > finishLine.x){
            console.log("The winner is" + (cars[i].color))
            winner = cars.indexOf(cars[i])
            currentState = 2;
        }
    }  
}

states[2] = function(){
   
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0,0,c.width,c.height);

    ctx.fillStyle = "white"
    ctx.font = "60px Arial"
    ctx.textAlign = "center"
    if(winner === choice){
        ctx.fillText("The Winner is" + (winner + 1).toString(), c.width/2, c.height/2 - 100)
        ctx.fillText("Winner! Space to try again.", c.width/2, c.height/2 + 100)
    }

    else{
        ctx.fillText("The Winner is" + (winner + 1).toString(), c.width/2, c.height/2 - 100)
        ctx.fillText("NOPE! Space to try again.", c.width/2, c.height/2 + 100)
    
    }

}


document.addEventListener("keydown", chooseWinner)
function chooseWinner(e){

if(currentState == 0){
    if(e.keyCode === 49){
        choice = 0;
        currentState = 1
    }
    if(e.keyCode === 50){
        choice = 1;
        currentState = 1
    }
    if(e.keyCode === 51){
        choice = 2;
        currentState = 1
        }
    }

    if(currentState == 2){
        if(e.keyCode === 32){
            location.reload()
        }
    }

}
               
function main(){
    ctx.clearRect(0,0,c.width,c.height)
    startLine.draw()
    finishLine.draw()
    for(var i = 0; i < cars.length; i++){
        cars[i].draw()

        
        
    }
    states[currentState]();
    timer = requestAnimationFrame(main)
}

function randomRange(high, low){
    return Math.round(Math.random()*(high - low) + low)}