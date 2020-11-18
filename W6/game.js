var c = document.querySelector('canvas');
var ctx = c.getContext('2d')

var rps = [];
rps [0] = "rock";
rps [1] = "paper";
rps [2] = "scissors";



var btn = document.querySelectorAll('a')

btn[0].addEventListener('click', function(e){play(0)});
btn[1].addEventListener('click', function(e){play(1)});
btn[2].addEventListener('click', function(e){play(2)});

function play(playersChoice){
    var cpuChoice = Math.floor(Math.random() * 2.999);
    ctx.clearRect(0,0, c.width, c.height)
    ctx.font ="20px Arial"
    ctx.textAlign = "center"
    ctx.fillStyle = "purple"
    ctx.fillText(  " Player Choice: " + rps[playersChoice]+ " | Compter Choice: " + rps[cpuChoice], c.width/2, c.height/2 + 100);
 
    switch(playersChoice){
        case 0:
            if(cpuChoice === 0){
                ctx.fillText("It's a tie!", c.width/2, c.height/2 + 50);
            }
            else if(cpuChoice === 1){
                ctx.fillText("You Lose!", c.width/2, c.height/2 + 50)
            }
            else{
                ctx.fillText("You Win!", c.width/2, c.height/2 + 50)
            }

            break;

        case 1:
            if(cpuChoice === 0){
                ctx.fillText("You win!", c.width/2, c.height/2 + 50);
            }
            else if(cpuChoice === 1){
                ctx.fillText("Tie!", c.width/2, c.height/2 + 50)
            }
            else{
                ctx.fillText("You Lose!", c.width/2, c.height/2 + 50)
            }
            
            break;

        case 2:
            if(cpuChoice === 0){
                ctx.fillText("You Lose!", c.width/2, c.height/2 + 50);
            }
            else if(cpuChoice === 1){
                ctx.fillText("You Win!", c.width/2, c.height/2 + 50)
            }
            else{
                ctx.fillText("Tie!", c.width/2, c.height/2 + 50)
            }
            break;
    }
}

