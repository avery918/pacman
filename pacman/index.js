const width = 28;
const grid = document.querySelector('.grid');
const playerScore = document.querySelector('#player-score');
let squares  = [];
let score = 0;


//28 * 28 = 784
  // 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty

const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
];

// create board
function createBoard(){
    for(let i = 0; i < layout.length; i++){
        // create a square
        const square = document.createElement('div');

        // put square in grid
        grid.appendChild(square);

        //put square in square array
        squares.push(square);
        
        //add the necessary styling for each square
        if(layout[i] === 0){
            squares[i].classList.add('pac-dot');
        }
        else if(layout[i] === 1){
            squares[i].classList.add('wall'); 
        }
        else if(layout[i] === 2){
            squares[i].classList.add('ghost-lair')
;        }
        else if(layout[i] === 3){
            squares[i].classList.add('power-pellet'); 
        }
    }
}
createBoard(); 

// starting position for pacman
let pacmanCurrentIndex = 490;
squares[pacmanCurrentIndex].classList.add('pacman');

function control(event){

    squares[pacmanCurrentIndex].classList.remove('pacman');
    /*  key codes:
        39 is right arrow
        38 is for the up arrow
        37 is for the left arrow
        40 is for the down arrow*/

        switch(event.key){
        case 'ArrowDown':
            if(
                !squares[pacmanCurrentIndex+width].classList.contains('wall') &&
                !squares[pacmanCurrentIndex+width].classList.contains('ghost-lair') &&
                pacmanCurrentIndex + width < (width * width)
                ){
                pacmanCurrentIndex += width;
            }
            break;

        case 'ArrowRight':
            if(
                !squares[pacmanCurrentIndex+1].classList.contains('wall') &&
                !squares[pacmanCurrentIndex+1].classList.contains('ghost-lair') &&
                pacmanCurrentIndex % width < width-1
                ){
                pacmanCurrentIndex++;
                if(pacmanCurrentIndex === 391){
                    pacmanCurrentIndex = 364;
                }
            }
            break;

        case 'ArrowUp':
            if(
                !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
                !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair') &&
                pacmanCurrentIndex - width >= 0
                ){
                pacmanCurrentIndex -= width;
            }
            break;

        case 'ArrowLeft':
            if(
                !squares[pacmanCurrentIndex-1].classList.contains('wall') &&
                !squares[pacmanCurrentIndex-1].classList.contains('ghost-lair') &&
                pacmanCurrentIndex % width !== 0
                ){
                pacmanCurrentIndex--;
                if(pacmanCurrentIndex === 364){
                    pacmanCurrentIndex = 391;
                }
            }
            break;
    }
    squares[pacmanCurrentIndex].classList.add('pacman');
    pacDotEaten();
    powerPelletEaten();
    checkForWin();
    checkForGameOver();
}

document.addEventListener('keyup', control);

// add to score and remove pacdots
function pacDotEaten(){
    if(squares[pacmanCurrentIndex].classList.contains('pac-dot')){
        score += 10;
        playerScore.textContent = score; 
        squares[pacmanCurrentIndex].classList.remove('pac-dot');
    }
}

function powerPelletEaten(){
    // if square pacman is in contains a power pellet
    if(squares[pacmanCurrentIndex].classList.contains('power-pellet')){
        // remove power pellet
        squares[pacmanCurrentIndex].classList.remove('power-pellet');

        //add a score of 100
        score+=100;

        //change each of the four ghost  isScared to true
        ghosts.forEach(ghost => ghost.isScared = true);

        // use setTimeout to unscare ghosts after 10 seconds 
        setTimeout(unscaredGhost, 10000);
    }
    
}

function unscaredGhost(){
    ghosts.forEach(ghost => ghost.isScared = false);
    
}

class Ghost{
    constructor(className, startIndex, speed){
        this.className = className;
        this.startIndex = startIndex;
        this.speed = speed;
        this.currentIndex = startIndex;
        this.isScared = false;
        this.timerId = NaN
    }
}

const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
]; 

// draw ghost onto grid
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.startIndex].classList.add('ghost'); // class 'ghost' is an invisible class- no styling
});






ghosts.forEach(ghost => moveGhost(ghost));

function moveGhost(ghost){
    const directions = [-1, 1, -width, width];
    let direction = directions[Math.floor(Math.random() * directions.length)];

     ghost.timerId = setInterval(function (){
       // if next square does not contain a wall or a ghost
       if(
           !squares[ghost.currentIndex + direction].classList.contains('wall')&&
           !squares[ghost.currentIndex + direction].classList.contains('ghost')
        )  {
                // remove any ghost 
                squares[ghost.currentIndex].classList.remove(ghost.className);
                squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost');

                // add direction to each ghost current index
                ghost.currentIndex += direction;

                // add ghost class
                squares[ghost.currentIndex].classList.add(ghost.className);
                squares[ghost.currentIndex].classList.add('ghost');
        }
        else{
            direction = directions[Math.floor(Math.random() * directions.length)]
        }   
        
        // if the ghost is currently scared
        if(ghost.isScared){
            squares[ghost.currentIndex].classList.add('scared-ghost');
        }

        //if the ghost is current scared AND pacman is on it
        if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')){
            //remove classnames - ghost.className, 'ghost', 'scared-ghost'
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
        
            // change ghosts currentIndex back to its startIndex
            ghost.currentIndex = ghost.startIndex;

            //add a score of 150
            score+= 150;
            //re-add classnames of ghost.className and 'ghost' to the ghosts new postion
            squares[ghost.currentIndex].classList.add('ghost', ghost.className);
        }
        checkForGameOver();
     },ghost.speed);

     
}


//check for game over
function checkForGameOver(){
    //if the square pacman is in contains a ghost AND ghost is not scared
    if(
        squares[pacmanCurrentIndex].classList.contains('ghost') && 
        !squares[pacmanCurrentIndex].classList.contains('scared-ghost') 
    ){
        //for each ghost - we need to stop it moving
        ghosts.forEach(ghost => clearInterval(ghost.timerId ));

        //remove eventlistener from our control function
        document.removeEventListener('keyup', control);
        
        //tell user the game is over
        playerScore.innerHTML = `${score}  GAME OVER!`;
    }
    
    
}

// check for win

function checkForWin(){
    if(score === 1500){
         //for each ghost - we need to stop it moving
         ghosts.forEach(ghost => clearInterval(ghost.timerId ));

         //remove eventlistener from our control function
         document.removeEventListener('keyup', control);

         //tell user they have won
         playerScore.innerHTML = `${score}  YOU WIN!`;
    }
}