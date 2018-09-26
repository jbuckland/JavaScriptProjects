//https://p5js.org/reference/
//http://molleindustria.github.io/p5.play/docs/index.html

function setup() {
    createCanvas(800, 800);
    frameRate(60);

    let name = "Jeremiah";
    let day = "Tuesday September 25th";
    let favoriteColor = "blue";


    let helloText = "Hello " + name + ". Today is " + day + ". Your favorite color is " + favoriteColor;

    console.log(helloText);

}


function draw() {
    background(200, 200, 255);

    //add stuff here that happens every time the screen redraws


    drawSprites();
}