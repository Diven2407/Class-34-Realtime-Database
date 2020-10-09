var ball;
var database, position;

function setup(){
    createCanvas(500,500);
    database = firebase.database();
    var loc = database.ref("ball/position");
    loc.on("value", readPos, showErr);
    ball = createSprite(50,50,10,10);
    ball.shapeColor = "red";
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-4,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(4,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-4);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+4);
    }
    drawSprites();
}

function writePosition(x,y) {
    database.ref("ball/position").set({
        'x':ball.x+x,
        'y':ball.y+y
    });
}

function readPos(data) {
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}

function showErr() {
    console.log("don't show any error, pls");
}