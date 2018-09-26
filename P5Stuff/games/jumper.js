var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 800;

var GRAVITY = 1;
var DRAG = .5;
var MOVE_SPEED = 5;
var JUMP = -15;

var BADDIE_SPEED = -10;
var BADDIE_START_X = CANVAS_WIDTH-25;
var BADDIE_START_Y = CANVAS_HEIGHT-50;

var boxSprite;
var groundSprite;
var baddieSprite;

function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

    boxSprite = createSprite(50, CANVAS_HEIGHT-100, 50, 50);
    boxSprite.onGround = false;
    
    baddieSprite = createSprite(BADDIE_START_X, BADDIE_START_Y, 30, 30);
    baddieSprite.velocity.x = BADDIE_SPEED;
    groundSprite = createSprite(CANVAS_WIDTH/2, CANVAS_HEIGHT-20, CANVAS_WIDTH, 20);
    frameRate(70);
}

function applyGravity(sprite) {
    sprite.velocity.y += GRAVITY;

    if (sprite.collide(groundSprite)) {
        sprite.velocity.y = 0;
        sprite.onGround = true;
    }
}

function gameOver() {
    return boxSprite.collide(baddieSprite);
}

function draw() {
    if(gameOver()) {
        textSize(40);
        textAlign(CENTER);
        text('GAME OVER!!!', CANVAS_WIDTH/2,CANVAS_HEIGHT/4);
        noLoop();
    } else{
        background(200, 200, 255);

        if(baddieSprite.position.x <0){
            baddieSprite.position.x = BADDIE_START_X;
        }

        applyGravity(boxSprite);

        keyboardInput();

        drawSprites();
    }
    
}

function keyboardInput() {
    if (boxSprite.onGround == true) {
        if (keyIsDown(UP_ARROW)) {
            boxSprite.velocity.y = JUMP;
            boxSprite.onGround = false;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            boxSprite.velocity.x = MOVE_SPEED;
        } else if (keyIsDown(LEFT_ARROW)) {
            boxSprite.velocity.x = -MOVE_SPEED;
        }
        else {
            if (boxSprite.velocity.x > 0) {
                boxSprite.velocity.x -= DRAG;
            } else {
                boxSprite.velocity.x += DRAG;
            }
    
            if (Math.abs(boxSprite.velocity.x) <= DRAG) {
                boxSprite.velocity.x = 0;
            }
        }
    }
}