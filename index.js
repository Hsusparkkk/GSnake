//DOM settings
const gameBox = document.getElementById("gameBox");
const gameBoxCont = gameBox.getContext("2d");
const body = document.querySelector("body");
const gameBoxStyle = window.getComputedStyle(gameBox);
let scoreCont = document.getElementById("score");
const FPSCtrl = document.getElementById("FPSCtrl")
const sizeCtrl = document.getElementById("sizeCtrl")



gameBoxCont.width = gameBox.clientWidth;
gameBoxCont.height = gameBox.clientHeight;
// console.log(gameBoxCont.width,gameBoxCont.height,gameBox.clientWidth,gameBox.clientHeight)
// console.log("1.backgroundColor: "+String(gameBox.backgroundColor))
// console.log("2.backgroundcolor: "+String(gameBox.backgroundcolor))
// console.log("3.style.backgroundColor: "+String(gameBox.style.backgroundColor))
// console.log("4.style.backgroundcolor: "+String(gameBox.style.backgroundcolor))
// console.log("5.style.background: "+gameBox.style.background)
// console.log("6.get propertyvalue: ",gameBoxStyle.getPropertyValue("color"));
console.log("welcome!")

//variable settings
// const snakeSize = gameBox.clientWidth/25
let snakeSize = 15
const snakeColor = "rgb(245, 152, 61)"
let snakeCount = snakeSize
let coinCount = snakeSize //to be honest, it's coinSize
let snakeBody = []
let snakeTailLen = 0
const snakeSpeed = 1
let coins = []
const coinColor = "yellow"
const coinApr = 10000
let FPS = 10;

class Snake{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

class Coin{
    constructor(){
        this.x = Math.floor(Math.random()*(gameBox.width/coinCount))*coinCount;
        this.y = Math.floor(Math.random()*(gameBox.height/coinCount))*coinCount
    }
}

let snakeHeadX = 10;
let snakeHeadY = 10;
let xV = snakeSpeed;
let yV = 0;


FPSCtrl.addEventListener("change",()=>{
    FPS = FPSCtrl.value
    console.log(FPSCtrl.value)
    
})


sizeCtrl.addEventListener("change",()=>{
    snakeSize = sizeCtrl.value
    snakeCount = snakeSize
    coinCount = snakeSize
    console.log(sizeCtrl.value)
    
})

//function definitions
function clearCanvas(){
    gameBoxCont.fillStyle = String(gameBoxStyle.getPropertyValue("background-color")); // here
    gameBoxCont.fillRect(0,0,gameBox.clientWidth,gameBox.clientHeight);
}

function showText(text,maxWidth = 100,color = "black",x = 100,y = 100,font = "20pt Arial"){
    gameBoxCont.font = font;
    gameBoxCont.fillStyle = color;
    gameBoxCont.fillText(text,x,y,maxWidth);
}

function showWin(){
    gameBoxCont.font =" 30pt Arial  ";
    // gameBoxCont.color =" #2c6565 "; 
    gameBoxCont.fillStyle =" #2c6565 "
    gameBoxCont.textAlign =" center ";
    gameBoxCont.fillText("You WIN!",gameBox.width/3,gameBox.height/2,800);
}

function showLose(){
    gameBoxCont.font =" 30pt Arial  ";
    // gameBoxCont.color =" #2c6565 "; 
    gameBoxCont.fillStyle =" #2c6565 "
    gameBoxCont.textAlign =" center ";
    gameBoxCont.fillText("You LOSE!",gameBox.width/3.5,gameBox.height/2,800);
    // console.log("showLose")
}

function playAgain(){
    gameBoxCont.font =" 10pt Arial  ";
    gameBoxCont.fillStyle =" #2c6565 "
    gameBoxCont.textAlign =" center ";
    gameBoxCont.fillText("Press any Key to playAgain.",gameBox.width/2.7,gameBox.height/1.85,800);
    body.addEventListener("keypress",innerPlayAgain)
    
}

function innerPlayAgain(event){
    if(event.keyCode == 67 || event.keyCode == 99){
    clearCanvas();
    trigger()
    
}else{
    clearCanvas();
    // showText("closing...");
    // setTimeout(()=>{
    //     window.close()
        
        
    // }, 1700);
    trigger()
}

// console.log("playAgain")

}


function setSnakePos(){
    snakeHeadX += xV;
    snakeHeadY += yV;
    snakeBody.push(new Snake(snakeHeadX,snakeHeadY));
    if(snakeBody.length > snakeTailLen){
        snakeBody.shift();
    }
}

function isWin(){
    if(score>=100){
        showWin();
        playAgain();
        return true
}
}

function isOver(){
    over = false;

    if(snakeBody[snakeBody.length-1].x*snakeCount > gameBox.clientWidth || snakeBody[snakeBody.length-1].x < 0 || snakeBody[snakeBody.length-1].y*snakeCount > gameBox.clientHeight || snakeBody[snakeBody.length-1].y < 0 )
    {
        
        console.log(snakeBody[snakeBody.length-1].x*snakeCount,snakeBody[snakeBody.length-1].y*snakeCount)

        console.log("touch boundary!")
        over = true
    }

    for(i = 1;i<snakeBody.length;i++)
    {
        if(snakeBody[0].x == snakeBody[i].x && snakeBody[0].y == snakeBody[i].y ){
            over = true
        }
    }
    return over
}

// Math.abs(coins[i].x-snakeBody[0].x) <= coinCount
 


function checkColli(){
    for(i = 0;i<coins.length;i++){
        if(Math.abs(coins[i].x-snakeBody[0].x*snakeCount) < coinCount && Math.abs(coins[i].y-snakeBody[0].y*snakeCount) < coinCount){
            if(i != 1){
            coins.splice(coins.indexOf(coins[i]),1);
            // console.log(coins.indexOf(coins[i]),1)
            }else{
                coins.shift()
            }
            snakeTailLen++;
            // return true;
        }
    }
    
}


function drawSnake(){

    for(i = 0;i<snakeBody.length;i++){
        if(i != snakeBody.length-1){
            gameBoxCont.fillStyle = snakeColor;
        }else{
            gameBoxCont.fillStyle = "rgb(176, 93, 12)";
        }


        gameBoxCont.fillRect(snakeBody[i].x*snakeCount,snakeBody[i].y*snakeCount,snakeSize,snakeSize)
    }
}


function drawCoin(){
    for(i = 0;i<coins.length;i++){
        gameBoxCont.fillStyle = coinColor;
        gameBoxCont.fillRect(coins[i].x,coins[i].y,coinCount,coinCount);
    }
    
}



function snakeDiverse(event){
    switch (event.keyCode){
        case 97:
        case 65:
        {
            xV = -snakeSpeed;
            yV = 0;
            // console.log("A");
            break;
        }
        case 119:
        case 87:
        {
            xV = 0;
            yV = -snakeSpeed;
            // console.log("W");
            break;
        }
        case 100:
        case 68:
        {
            xV = snakeSpeed;
            yV = 0;
            // console.log("D");
            break;
        }
        case 115:
        case 83:
        {
            xV = 0;
            yV = snakeSpeed;
            // console.log("S");
            break;
        }
        default:
        {
            console.log("default")
            break;
        }
    }

}

function main(){

    clearCanvas();
    setSnakePos();
    // isWin()
    
    if(isWin()){
        return 0;
    }

    if(isOver()){
        showLose()
        playAgain()
        return 0;
    }
    
    checkColli()
    score = snakeTailLen
    scoreCont.innerText = "得分: "+score

    body.addEventListener("keydown",snakeDiverse);
    drawCoin();
    drawSnake();
    setTimeout(main,1000/FPS)

}

//trigger
function trigger(){
console.log("trigger")
clearCanvas()
body.removeEventListener("keydown",snakeDiverse);
body.removeEventListener("keypress",innerPlayAgain);
snakeBody = []
snakeTailLen = 0
coins = []
snakeHeadX = 10;
snakeHeadY = 10;

console.log("FPS: "+FPS)
    
snakeBody.push(new Snake(snakeHeadX,snakeHeadY))
snakeTailLen = 1
coins.push(new Coin())
setInterval(() => {
    coins.push(new Coin())
}, Math.random()*coinApr);
main()
}


showText("Gluttonous Snake!",600,"orange",gameBox.width/13,gameBox.height/2,"120px Noto900")//Arial
setTimeout(()=>{
    clearCanvas()
    trigger()
},1200)
