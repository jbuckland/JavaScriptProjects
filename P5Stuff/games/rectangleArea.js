//https://p5js.org/reference/
//http://molleindustria.github.io/p5.play/docs/index.html

var rectX1 = -1;
var rectY1 = -1;

var rectX2 = -1;
var rectY2 = -1;


function setup() {
    createCanvas(800, 800);

    frameRate(60);

    //add stuff here that happens when the game is first run
}


function draw() {
    background(200, 200, 255);

    textSize(16);
    let mouseText = 'mouse X,Y: (' + mouseX + "," + mouseY + ")";
    text(mouseText, 40, 40);


    if (rectX1 >= 0 && rectX2 >= 0) {
        let width = rectX2 - rectX1;
        let height = rectY2 - rectY1;

        rect(rectX1, rectY1, width, height);

        let area = width * height;
        let areaText = "area of rectangle is: " + Math.abs(area);
        text(areaText, rectX1, rectY1);
    }


    drawSprites();
}


function mouseClicked() {
    if (rectX1 < 0 && rectY1 < 0) {
        rectX1 = mouseX;
        rectY1 = mouseY;
    }
    else if (rectX2 < 0 && rectY2 < 0) {
        rectX2 = mouseX;
        rectY2 = mouseY;
    }


}
