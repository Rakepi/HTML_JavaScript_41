window.onload = function(){
var c = document.querySelector('canvas')
var ctx = c.getContext('2d')


function square(){
    ctx.fillStyle = 'purple'
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 5
    ctx.fillRect()
    ctx.strokeRect()

}
function draw(){
    square();
}

}