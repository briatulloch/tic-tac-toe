//DOM elements
const statusDiv=document.querySelector('.game-status');
const resetDiv=document.querySelector('.reset');
const cellDivs=document.querySelectorAll('.game-cell');

//game constants 
const xSymbol='✕';
const oSymbol='○';

//game variables
let gameIsLive=true;
let xIsNext=true;
let winner=null;

//functions 
const handleWin=(letter) => {
    gameIsLive=false;
    winner=letter;
    if(winner==='x'||winner==='o'){
        statusDiv.innerHTML=`YAY ${winner.toUpperCase()} WINS!`;
    }
};

//classList[2] tells us whether we have an 'x' or 'o' 
const checkGameStatus = () => {
    const topLeft = cellDivs[0].classList[2];
    const topMiddle = cellDivs[1].classList[2];
    const topRight = cellDivs[2].classList[2];
    const middleLeft = cellDivs[3].classList[2];
    const middleMiddle = cellDivs[4].classList[2];
    const middleRight = cellDivs[5].classList[2];
    const bottomLeft = cellDivs[6].classList[2];
    const bottomMiddle = cellDivs[7].classList[2];
    const bottomRight = cellDivs[8].classList[2];
   
//check winner
//need to first check if there is an 'x' or 'o' in position (not empty/undefined) and then check conditions
if (topLeft && topLeft === topMiddle && topLeft === topRight){
   handleWin(topLeft);
}else if(middleLeft && middleLeft===middleMiddle && middleLeft===middleRight){
    handleWin(middleLeft);
}else if(bottomLeft && bottomLeft===bottomMiddle && bottomLeft===bottomRight){
    handleWin(bottomLeft);
}else if(topLeft && topLeft===middleLeft && topLeft===bottomLeft){
    handleWin(topLeft);
}else if(topMiddle && topMiddle===middleMiddle && topMiddle===bottomMiddle){
    handleWin(topMiddle);
}else if(topRight && topRight===middleRight && topRight===bottomRight){
    handleWin(topRight);
}else if(topLeft && topLeft===middleMiddle && topLeft===bottomRight){
    handleWin(topLeft);
}else if(topRight&&topRight===middleMiddle&&topRight===bottomLeft){
    handleWin(topRight);
}else if(topLeft && topMiddle && topRight &&middleLeft &&middleRight && bottomLeft &&bottomMiddle&&bottomRight){
    gameIsLive=false;
    statusDiv.innerHTML='ITS A TIE<span style="font-size:20px">😲<span>';
}else{
    //to flip the logic-> get o after x
    xIsNext=!xIsNext;
    if(xIsNext){
        statusDiv.innerHTML='X IS NEXT';
    }else{
        statusDiv.innerHTML='O IS NEXT';
    }
}    
};

//event handlers

const resetGame = () => {
    xIsNext=true;
    statusDiv.innerHTML='X IS NEXT';
    for(const cellDiv of cellDivs){
        cellDiv.classList.remove('x');
        cellDiv.classList.remove('o');
        winner=null;
    }
};

const handleCellClick = (e) => {
    const classList = e.target.classList;
    
    //if space already contains an 'x' or 'o', do not want do anything (so it can't be switched) 
    if (classList[1] === 'x' || classList[1] === 'o') {
        return;
    }

    //otherwise
    if (xIsNext) {
       classList.add('x');
       checkGameStatus();     
    } else {
        classList.add('o');
        checkGameStatus();
    }
};

//event listeners

resetDiv.addEventListener('click', resetGame);

//loop through each of elements within cell div 
for (const cellDiv of cellDivs) {
    cellDiv.addEventListener('click', handleCellClick);
}