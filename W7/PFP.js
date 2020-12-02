window.onload = function(){
var c =document.querySelector('canvas')
var ctx = c.getContext('2d')


var panda = new Image();
var fox = new Image();
var parrot = new Image();
var hpanda = new Image();
var hfox = new Image();
var hparrot = new Image();

panda.src = "images/panda1.jpg";
fox.src = "images/fox1.jpg" ;
parrot.src = "images/parrot1.jpg";

hpanda.src = "images/panda2.jpg";
hfox.src = "images/fox2.jpg";
hparrot.src = "images/parrot2.jpg"

hpanda.onload = function(){
    draw(panda, fox, parrot, panda, fox, parrot);
}

var results = "Pick your fuzzball.";

var rps = [];
rps[0] = "panda";
rps[1] = "fox";
rps[2] = "parrot";

var btn = document.querySelectorAll('a');
btn[0].addEventListener('click', function(e){play(0)})
btn[1].addEventListener('click', function(e){play(1)})
btn[2].addEventListener('click', function(e){play(2)})


function play(playersChoice){
    var cpuChoice = Math.floor(Math.random() * 2.999);
 
    switch(playersChoice){
        case 0:
            if(cpuChoice === 0){
               
                results = "Tie, You bump bellies."
                draw(hpanda,fox,parrot,hpanda,fox,parrot)
            }
            else if(cpuChoice === 1){
                
                results = "Panda crushes fox, You Win!"
                draw(hpanda,fox,parrot,panda,hfox,parrot)
            }
            else{
                
                results = "Parrot Scares Panda, Lose!"
                draw(hpanda,fox,parrot,panda,fox,hparrot)
            }
            break;

        case 1:
            if(cpuChoice === 0){
                
                results = "You Lose, Crushed!"
                draw(panda,hfox,parrot,hpanda,fox,parrot)
            }
            else if(cpuChoice === 1){
                
                results = "It's a Tie, Let the dance beggin."
                draw(panda,hfox,parrot,panda,hfox,parrot)
            }
            else{
              
                results = "You Win, Fox eats parrot!"
                draw(panda,hfox,parrot,panda,fox,hparrot)
            }
            break;

        case 2:
            if(cpuChoice === 0){
               
                results = "You Win, Scary Bird!"
                draw(panda,fox,hparrot,hpanda,fox,parrot)
            }
            else if(cpuChoice === 1){
               
                results = "You Lose, Eaten x.x!"
                draw(panda,fox,hparrot,panda,hfox,parrot)
            }
            else{
               
                results = "Tie, Fly around."
                draw(panda,fox,hparrot,panda,fox,hparrot)
            }
            break;
    }
}



function draw(panda, fox, parrot, cpanda, cfox, cparrot){
    ctx.clearRect(0,0,c.width,c.height);
    ctx.fillRect(0,0,c.width,c.height);

    ctx.save();
    ctx.font = "30px Arial"
    ctx.textAlign = "center"
    ctx.fillStyle = "white"
    ctx.fillText("players choice", c.width/2, 100)
    ctx.drawImage(panda, c.width/2 - 100, 150);
    ctx.drawImage(fox, c.width/2, 150);
    ctx.drawImage(parrot, c.width/2 + 100, 150);

    ctx.fillText("computers choice", c.width/2, 325)
    ctx.drawImage(cpanda, c.width/2 - 100, 375);
    ctx.drawImage(cfox, c.width/2, 375);
    ctx.drawImage(cparrot, c.width/2 + 100, 375);
    
    ctx.fillText(results, c.width/2, 525)

    ctx.restore();

}

}