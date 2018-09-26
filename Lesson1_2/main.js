//https://p5js.org/reference/
//http://molleindustria.github.io/p5.play/docs/index.html

function setup() {
    createCanvas(800, 800);
    frameRate(60);
    //add stuff here that happens when the game is first run stuff here


}


function draw() {
    background(200, 200, 255);

    
    fill("pink")
    rect(200, 200, 50, 50)
    rect(500, 200, 50, 50)
    rect(0, 500, 800, 50)
    ellipse(400, 400, 100)
    fill("purple")
    ellipse(360,400,20)

    drawSprites();
}