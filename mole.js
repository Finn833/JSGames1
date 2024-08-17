let currMoleTile;
let currPlantTile;
let score = 0;
let newGame = true;
let gameOver = false;
let intTime = 1000;
let clickedMole = false;

window.onload = function() {
    setGame();
    newGame = false;
}

function setGame() {
    if (gameOver == false && newGame == false) {
        return;
    }
    gameOver = false;
    //set up the grid for the html game board
    for (let i =0; i < 9; i++) { // i goes from 0-8 and stops at 9
        //<div id="0-8"></div> used for location of mole and plant as well as player clicks
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }

    setInterval(setMole, intTime); //call setMole(); by intTime. Starting at 1.5 seconds, moves to 1 second.
    setInterval(setPlant, intTime); //call setPlant(); by intTime. Starting at 1.5 seconds, moves to 1 second.
}

function start() {
    intTime = 1000;
    gameOver = false;
    score = 0;
    document.getElementById("score").innerText = "Score: " + score.toString(); //reset score
}

function getRandomTile() {
    // random number from 0-1 (eg. 0.6). * 9 --> round down int (0-8) return num in string.
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if(gameOver) {
        return;
    }

    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }

    let mole = document.createElement("img");
    mole.src = "./mole.png";

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) {
        //return;
        let num = getRandomTile();
        setMole();
        return;
    }
    clickedMole = false;
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);

    if (score >= 200) {
        intTime = 500;
    }
}

function setPlant() {
    if (gameOver) {
        return;
    }

    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }

    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) {
        //return;
        let num = getRandomTile();
        setPlant();
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) {
        return;
    }

    if (this == currMoleTile && clickedMole == false) {
        score += 10;
        document.getElementById("score").innerText = "Score: " + score.toString(); //update score
        clickedMole = true;
    }
    else if (this == currPlantTile) {
        document.getElementById("score").innerText = "Game Over! Score: " + score.toString(); 
        gameOver = true;
    }
}