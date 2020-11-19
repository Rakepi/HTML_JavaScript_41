window.onload = function(){
var c =document.querySelector('canvas')
var ctx = c.getContext('2d')

var rock = new Image();
var paper = new Image();
var scissor = new Image();
var hrock = new Image();
var hpaper = new Image();
var hscissor = new Image();

rock.src = "images/rock.jpg";
paper.src = "images/paper.jpg";
scissor.src = "images/scissors.jpg";

hrock.src = "images/rock2.jpg";
hpaper.src = "images/paper2.jpg";
hscissor.src = "images/scissors2.jpg";

hscissor.onload = function(){
    draw(rock, paper, scissor, rock, paper, scissor);
}

var results = "Pick an option from the buttons above.";





//above this is todays work week 7 lab
var rps = [];
rps[0] = "rock";
rps[1] = "paper";
rps[2] = "scissors";

//array of buttons
var btn = document.querySelectorAll('a');
//assign event listeners to buttons
btn[0].addEventListener('click', function(e){play(0)})
btn[1].addEventListener('click', function(e){play(1)})
btn[2].addEventListener('click', function(e){play(2)})


function play(playersChoice){
    var cpuChoice = Math.floor(Math.random() * 2.999);
    //ctx.fillText(  "Player Choice: " + rps[playersChoice]+ "Compter Choice: " + rps[cpuChoice]);
 
    switch(playersChoice){
        case 0:
            if(cpuChoice === 0){
                //ctx.fillText("It's a tie!");
                results = "It's a Tie"
                draw(hrock,paper,scissor,hrock,paper,scissor)
            }
            else if(cpuChoice === 1){
                //ctx.fillText("You Lose!")
                results = "You Lose"
                draw(hrock,paper,scissor,rock,hpaper,scissor)
            }
            else{
                //ctx.fillText("You Win!")
                results = "You Win!"
                draw(hrock,paper,scissor,rock,paper,hscissor)
            }
            break;

        case 1:
            if(cpuChoice === 0){
                //ctx.fillText("You win!");
                results = "You Win!"
                draw(rock,hpaper,scissor,hrock,paper,scissor)
            }
            else if(cpuChoice === 1){
                //ctx.fillText("Tie!")
                results = "It's a Tie"
                draw(rock,hpaper,scissor,rock,hpaper,scissor)
            }
            else{
               // ctx.fillText("You Lose!")
                results = "You Lose"
                draw(rock,hpaper,scissor,rock,paper,hscissor)
            }
            break;

        case 2:
            if(cpuChoice === 0){
               // ctx.fillText("You Lose!");
                results = "You Lose"
                draw(rock,paper,hscissor,hrock,paper,scissor)
            }
            else if(cpuChoice === 1){
                //ctx.fillText("You Win!")
                results = "You Win!"
                draw(rock,paper,hscissor,rock,hpaper,scissor)
            }
            else{
               // ctx.fillText("Tie!")
                results = "It's a Tie"
                draw(rock,paper,hscissor,rock,paper,hscissor)
            }
            break;
    }
}

//draw images

function draw(rock, paper, scissor, crock, cpaper, cscissor){
    ctx.clearRect(0,0,c.width,c.height);
    ctx.fillRect(0,0,c.width,c.height);

    ctx.save();
    ctx.font = "30px Arial"
    ctx.textAlign = "center"
    ctx.fillStyle = "white"
    ctx.fillText("players choice", c.width/2, 100)
    ctx.drawImage(rock, c.width/2 - 100, 150);
    ctx.drawImage(paper, c.width/2, 150);
    ctx.drawImage(scissor, c.width/2 + 100, 150);

    ctx.fillText("computers choice", c.width/2, 325)
    ctx.drawImage(crock, c.width/2 - 100, 375);
    ctx.drawImage(cpaper, c.width/2, 375);
    ctx.drawImage(cscissor, c.width/2 + 100, 375);
    //displays results
    ctx.fillText(results, c.width/2, 525)

    ctx.restore();

}

}