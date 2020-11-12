var c = document.querySelector('canvas');
var ctx = c.getContext('2d');

var timer =requestAnimationFrame(main);

var someNum = randomRange(10,5)


function main(){
    timer = requestAnimationFrame(main);

   
    ctx.clearRect(0,0, 800, 600);
   
    drawBox();
     
    x++;

    if(x > c.width){
        x = -100;
    }
    
    console.log("animating")}