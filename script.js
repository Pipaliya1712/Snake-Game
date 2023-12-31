let direction = {x:0 ,y:0}
const foodsound = new Audio();
const gameOverSong = new Audio();
const moveSound = new Audio();
const musicSound = new Audio();
let lastPaintTime=0;
let speed=5;
let snakeArr =[
    {x:2,y:2}
]
let food = {x:6,y:7};
let score =0;
let inputDir = {x:0,y:0}

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

const isCollide = (sarr) => {
    for (let i = 1; i < sarr.length; i++) {
        if(sarr[i].x===sarr[0].x && sarr[i].y===sarr[0].y){
            return true;
        }
    }
   if(sarr[0].x >=18 || sarr[0].x <=0 || sarr[0].y >=18 || sarr[0].y <=0){
    return true;
   }
   return false;
}


const gameEngine = () => {

    if(isCollide(snakeArr)){
        gameOverSong.play();
        musicSound.pause();
        inputDir = {x:0,y:0};
        alert("Game is over, Press any key to play agian!");
        snakeArr = [{x:13,y:16}];
        score = 0;
        speed=5;
        scoreBox.innerHTML = "Score: " + score;
    }

    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        foodsound.play();
        score+=1;
        scoreBox.innerHTML = "Score: " + score;
        speed+=0.5;
        if(score>hiscoreval){
            hiscoreval = score
            localStorage.setItem('hiscore',JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "Hiscore:" +hiscoreval;
        }
        snakeArr.unshift({x: snakeArr[0].x+inputDir.x , y: snakeArr[0].y+inputDir.y});
        let a=2;
        let b=16;
        food = { x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random()) }
    }

    for (let i = snakeArr.length-2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x +=inputDir.x;
    snakeArr[0].y +=inputDir.y;


    bord.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart =e.y;
        snakeElement.style.gridColumnStart =e.x;
        if(index === 0)
            snakeElement.classList.add('head');
        else
            snakeElement.classList.add('snake');
        bord.appendChild(snakeElement);
    })
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart =food.y;
    foodElement.style.gridColumnStart =food.x;
    foodElement.classList.add('food');
    bord.appendChild(foodElement);

}

let hiscore = localStorage.getItem('hiscore')
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem('hiscore',JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Hiscore:" +hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown' , e => {
    inputDir = {x:0,y:0}
    moveSound.play();
    switch(e.key){
        case "ArrowUp" :
            // console.log("ArroeUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "w" :
            // console.log("ArroeUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "W" :
            // console.log("ArroeUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown" :
            // console.log("ArroeDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "s" :
            // console.log("ArroeDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "S" :
            // console.log("ArroeDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        

        case "ArrowLeft" :
            // console.log("ArroeLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "a" :
            // console.log("ArroeLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "A" :
            // console.log("ArroeLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight" :
            // console.log("ArroeRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        case "d" :
            // console.log("ArroeRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        case "D" :
            // console.log("ArroeRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});