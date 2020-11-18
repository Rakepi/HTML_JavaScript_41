var rps = [];
rps [0] = "rock";
rps [1] = "paper";
rps [2] = "scissors";

var btn = document.querySelectorAll('a');

btn[0].addEventListener('click', function(e){play(0)});
btn[1].addEventListener('click', function(e){play(1)});
btn[2].addEventListener('click', function(e){play(2)});

function play(playersChoice){
    var cpuChoice = Math.floor(Math.random() * 2.999);
    alert(  "Player Choice: " + rps[playersChoice]+ "Compter Choice: " + rps[cpuChoice]);
 
    switch(playersChoice){
        case 0:
            if(cpuChoice === 0){
                alert("It's a tie!");
            }
            else if(cpuChoice === 1){
                alert("You Lose!")
            }
            else{
                alert("You Win!")
            }

        case 1:
            if(cpuChoice === 0){
                alert("You win!");
            }
            else if(cpuChoice === 1){
                alert("Tie!")
            }
            else{
                alert("You Lose!")
            }
            

        case 2:
            if(cpuChoice === 0){
                alert("You Lose!");
            }
            else if(cpuChoice === 1){
                alert("You Win!")
            }
            else{
                alert("Tie!")
            }
    }
}


//function newGameObject(){
    //this.draw = 