//JAvaScript goes here

var c = document.querySelector('canvas');
var ctx = c.getContext('2d');
var Kirby = new Image();
Kirby.src = 'images/Kirby.png';

var timer =requestAnimationFrame(main);

var someNum = randomRange(10,5)


function main(){
    timer = requestAnimationFrame(main);

    //clear canvas
    ctx.clearRect(0,0, 800, 600);
    //draw box
    drawBox();
    //update x
    x++;

    if(x > c.width){
        x = -100;
    }
    
    console.log("animating")

    







    /*
        //example of line
    ctx.moveTo(0,0);
    ctx.lineTo(800,600);
    ctx.stroke();
    ctx.moveTo(800,0);
    ctx.lineTo(0,600);
    ctx.stroke()

    //this draws a box
    ctx.fillStyle = 'purple'
    ctx.fillRect(c.width/2-100,c.height/2-100,200,200);


    //Example draw a circle

    ctx.fillStyle = 'orange'
    ctx.strokeStyle = 'blue'
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(c.width/2, c.height/2, 50, 0, 2*Math.PI,false);
    ctx.fill();
    ctx.stroke()

    //Example text drawing
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black'
    ctx.font = "50px Arial"
    ctx.fillStyle = 'blue'
    ctx.fillText("Week 4 Lab", c.width/2-140, 50)
    ctx.strokeText("Week 4 Lab", c.width/2-140, 50)

    //draw img to canvas
    ctx.drawImage(Kirby,0 ,0);
    */
}

function drawBox(){

    ctx.fillStyle = 'blue'
    ctx.fillRect(x, c.height/2, 100, 50);
}

//main();