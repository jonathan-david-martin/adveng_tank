/*
When a second player is connected, why can you not see them move, but you can see the bullets that they shoot?
- make a point system
- implement obstacles
- find or create designs for player and bullets

*/

var x = 180 
var y = 375
var upPressed = false
var downPressed = false
var rightPressed = false
var leftPressed = false
var spacePressed = false
var bullet1
var bulletArray =  []
var fired = false
var player 


//this is the bullet object. it teaches the code what a bullet is, but never actually creates one
class bullet {
  constructor(inputA,inputB) {
    this.a = player.x;
    this.b = player.y;
  }
  display(){
  
  	fill("white")
  	ellipse(this.a,this.b,10,10);
  	this.b -= 10
  }
  
  
}
//This is the player object. It teaches the rest of the code how to make the larger white circle
class Player{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  display(){
    
      fill("white")
      ellipse(this.x,this.y,25,25);
    }
}




function setup(){
	createCanvas (400,400);
  
//this creates the new player using the "player" object we crreated earlier
   player = new Player(185,300);
  
//this connects us to our server on glitch
    socket = io.connect("https://noah-and-shachar.glitch.me");

//If the server succesfully connects then this displays "connected" in the console log
  socket.on('connect', function() {
    console.log("Connected");
  });
  
//not sure what this part does
    socket.on('generic_message', function(data) {
         if(Object.keys(data).length>2){
    }})
  
  
//this creates a new bullet using our object
      socket.on('newBullet', function(data) {
        let newBullet2 = new bullet(data.x,data.y);
        bulletArray.push(newBullet2)
        console.log(bulletArray)
      })
      }



function draw() {
background("black");
  
  
  socket.emit("generic_message", {
    x: x,
    y: y
  });
  
//this displays the player we taught the code how to create
player.display()
  
  
//this is the barrier in the middle of the screen
 fill("white")
rect(0,200,400,10)
  
//this loop allows many bullets to be created
for (var i = 0;i < bulletArray.length; i++){
	bulletArray[i].display()
}


//these commands give the arrow keys control over the player.
  if(rightPressed){
    player.x += 5
  }
  if(leftPressed){
    player.x -= 5
  }
  if(downPressed){
  	player.y+=5
  }
  if (upPressed) {
    player.y-=5
  }
//this detects when the spacebar has been pressed and then released, and then creates the new bullet
  if(spacePressed === false && fired === true){
    fired = false;
    
      socket.emit("newBullet", {
        x:x,
        y:y
  });
}

//these lines make sure that if the player moves to the side of the screen then it will be teleported to the other side
  if(player.x<0){
    player.x=400;
    x2 = 400;
  }
  if(player.x>400){
    player.x=0;
    x2 = 0;
  }
  
//these lines create the barrier that you can't pass at the bottom of the screen and at the white line in the middle
  if(player.y<222.5){
      player.y=222.5;
      y2 = 222.5;
  }
  if(player.y>388){
      player.y=388;
  }  
}

//these two blocks of code create the variables that will be used to ontrol the player in the draw statement
function keyPressed() {
    if (keyCode === UP_ARROW) {
        upPressed = true;
    } else if (keyCode === DOWN_ARROW) {
        downPressed = true;
    } else if (keyCode === LEFT_ARROW) {
       leftPressed = true;
    } else if (keyCode === RIGHT_ARROW) {
        rightPressed = true;
    } else if (keyCode === 32){
        spacePressed = true;
        fired = true
    }
}

function keyReleased() {
    if (keyCode == UP_ARROW) {
        upPressed = false;
    } else if (keyCode == DOWN_ARROW) {
        downPressed = false;
    } else if (keyCode == LEFT_ARROW) {
        leftPressed = false;
    } else if (keyCode == RIGHT_ARROW) {
        rightPressed = false;
    } else if (keyCode === 32){
        spacePressed = false;
    }
}