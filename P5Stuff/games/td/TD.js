//https://p5js.org/reference/
//http://molleindustria.github.io/p5.play/docs/index.html

//TODOs: 
//game over screen
//more than one wave
//'start next wave' button
//sound: background music, turret shoot, baddie hit, baddie die, baddie escape
//images for sprites
//level creation mode: add/delete/move waypoints, show numbers on build points, add/delete/move build points


let game;




function preload() {
    game = {};
    game.backgroundPath = loadImage("games/TD Path.png");
    game.wayPoints = [];
    game.turretGroup = new Group();
    game.buildPointGroup = new Group();
    game.bulletGroup = new Group();
    game.baddieGroup = new Group();

    game.lastSpawnTime = Date.now();
    game.currentWaveSpawnCount = 0;
    game.money = 15;
    game.lives = 5;


    game.BADDIE_SPEED = 2;
    game.BULLET_SPEED = 10;
    game.TURRET_RANGE = 200;
    game.TURRET_COOLDOWN = 500;
    game.TURRET_COST = 5;
    game.SPAWN_TIME = 1000;
    game.SPAWNS_PER_WAVE = 10;
    game.TYPE_TURRET = "turret";
    game.TYPE_BULLET = "bullet";
    game.TYPE_BADDIE = "baddie";
}


function setup() {
    createCanvas(800, 800);
    frameRate(60);

    createWaypoint(87, 92);
    createWaypoint(274, 100);
    createWaypoint(580, 91);
    createWaypoint(688, 132);
    createWaypoint(686, 163);
    createWaypoint(638, 192);
    createWaypoint(708, 304);
    createWaypoint(715, 363);
    createWaypoint(695, 390);
    createWaypoint(646, 410);
    createWaypoint(590, 411);
    createWaypoint(497, 342);
    createWaypoint(419, 305);
    createWaypoint(386, 310);
    createWaypoint(332, 342);
    createWaypoint(290, 357);
    createWaypoint(168, 296);
    createWaypoint(125, 292);
    createWaypoint(100, 314);
    createWaypoint(49, 448);
    createWaypoint(36, 490);
    createWaypoint(45, 524);
    createWaypoint(68, 557);
    createWaypoint(110, 575);
    createWaypoint(147, 569);
    createWaypoint(244, 536);
    createWaypoint(293, 534);
    createWaypoint(328, 546);
    createWaypoint(352, 564);
    createWaypoint(371, 585);
    createWaypoint(481, 600);
    createWaypoint(582, 589);
    createWaypoint(662, 572);
    createWaypoint(762, 565);

    createBuildPoint(626, 330);
    createBuildPoint(425, 388);
    createBuildPoint(540, 166);
    createBuildPoint(154, 161);
    createBuildPoint(160, 376);
    createBuildPoint(123, 496);
    createBuildPoint(265, 615);
    createBuildPoint(430, 524);
    createBuildPoint(669, 647);
    createBuildPoint(652, 484);
    createBuildPoint(738, 200);

    createBaddie();
}


function createWaypoint(x, y) {
    let wp = createSprite(x, y, 5, 5);
    wp.visible = false;
    game.wayPoints.push(wp);
}

function createBuildPoint(x, y) {
    let buildPoint = createSprite(x, y, 20, 20);
    buildPoint.shapeColor = color(200, 200, 200);
    buildPoint.isOpen = true;

    buildPoint.onMouseOver = function () {
        if (buildPoint.isOpen == true) {
            buildPoint.shapeColor = color(200, 0, 0);
        }
    };
    buildPoint.onMouseOut = function () {
        buildPoint.shapeColor = color(200, 200, 200);
    };
    buildPoint.onMouseReleased = function () {
        buildTurret(buildPoint);
    };

    game.buildPointGroup.add(buildPoint);
}

function buildTurret(buildPoint) {
    if (game.money >= game.TURRET_COST && buildPoint.isOpen == true) {
        buildPoint.isOpen = false;
        game.money -= game.TURRET_COST;
        createTurret(buildPoint.position.x, buildPoint.position.y);
    }
}

function createTurret(x, y) {
    let turret = createSprite(x, y, 10, 10);
    turret.lastFire = Date.now();
    turret.shapeColor = color(0, 0, 255);
    turret.spriteType = game.TYPE_TURRET;

    game.turretGroup.add(turret);
}


function createBaddie() {
    let baddie = createSprite(0, 0, 30, 30);
    baddie.nextWPId = 0;
    baddie.position.x = game.wayPoints[baddie.nextWPId].position.x;
    baddie.position.y = game.wayPoints[baddie.nextWPId].position.y;
    baddie.spriteType = game.TYPE_BADDIE;
    baddie.health = 10;
    baddie.strength = 1;
    baddie.worth = 2;

    game.baddieGroup.add(baddie);

    game.lastSpawnTime = Date.now();
    game.currentWaveSpawnCount++;

}


function draw() {
    background(200, 200, 255);
    image(game.backgroundPath, 0, 0);

    updateSpawn();
    updateTurrets(game.turretGroup, game.baddieGroup);
    updateBullets(game.bulletGroup);
    updateBaddies(game.baddieGroup);
    drawUI();

    drawSprites();
}

function drawUI() {
    textSize(30);
    text("Lives: " + game.lives, 667, 36);
    text("Money: $" + game.money, 100, 36);
}


function updateSpawn() {
    let lastSpawnTime = Date.now() - game.lastSpawnTime;
    if (lastSpawnTime >= game.SPAWN_TIME && game.currentWaveSpawnCount < game.SPAWNS_PER_WAVE)
        createBaddie();
}

function updateBaddies(baddieList) {
    for (let i = 0; i < baddieList.length; i++) {
        let baddie = baddieList[i];
        let nextWP = game.wayPoints[baddie.nextWPId];
        baddie.attractionPoint(game.BADDIE_SPEED, nextWP.position.x, nextWP.position.y);
        baddie.limitSpeed(game.BADDIE_SPEED);

        if (baddie.overlap(nextWP)) {
            baddie.nextWPId++;
            if (baddie.nextWPId == game.wayPoints.length) {
                baddieEscaped(baddie);
            }
        }
    }
}

function baddieHit(baddie, bullet) {
    baddie.health -= bullet.damage;
    if (baddie.health <= 0) {
        baddie.remove();
        game.money += baddie.worth;
    }
    bullet.remove();
}


function baddieEscaped(baddie) {
    game.lives -= baddie.strength;
    baddie.remove();    
}


function updateTurrets(turretList, baddieList) {
    for (let i = 0; i < turretList.length; i++) {
        let turret = turretList[i];
        let timeSinceLastFire = Date.now() - turret.lastFire;
        if (timeSinceLastFire >= game.TURRET_COOLDOWN) {

            if (baddieList.length > 0) {
                let closestBaddie = findClosestSprite(turret, baddieList);

                if (distToSprite(turret, closestBaddie) <= game.TURRET_RANGE) {
                    shootBullet(turret, closestBaddie);
                }
            }
        }
    }
}

function updateBullets(bulletGroup) {
    for (let i = 0; i < bulletGroup.length; i++) {
        let bullet = bulletGroup[i];
        let target = bullet.target;
        if (distToSprite(bullet, bullet.owner) >= game.TURRET_RANGE) {
            bullet.remove();
        } else {
            bullet.setVelocity(0, 0);
            bullet.attractionPoint(game.BULLET_SPEED, target.position.x, target.position.y);
        }
        if (bullet.overlap(target)) {
            baddieHit(target, bullet);
        }

    }
}

function shootBullet(turret, target) {
    turret.lastFire = Date.now();

    let bullet = createSprite(turret.position.x, turret.position.y, 5, 5);
    bullet.shapeColor = color(222, 222, 222);
    bullet.owner = turret;
    bullet.target = target;
    bullet.damage = 1;

    game.bulletGroup.add(bullet);
}


function findClosestSprite(sourceSprite, destSpriteList) {
    let closestSprite = null;
    let closestDist = 99999999999999999;
    for (let i = 0; i < destSpriteList.length; i++) {
        let dist = distToSprite(sourceSprite, destSpriteList[i]);
        if (dist < closestDist) {
            closestDist = dist;
            closestSprite = destSpriteList[i];
        }
    }
    return closestSprite;
}


function distToSprite(spriteA, spriteB) {
    return dist(spriteA.position.x, spriteA.position.y, spriteB.position.x, spriteB.position.y);
}


function mouseClicked() {
    logMouseXY();
}


function logMouseXY() {
    console.log("mouse xy: " + mouseX + "," + mouseY);
}
