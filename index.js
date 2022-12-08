const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const blockWidth = 100
const blockHeight = 20
const boardWidth = 310
const boardHeight = 600
const ballDiameter = 20
let speed
let timerId
let xDirection = -2
let yDirection = 2
let score = 0
let highScore

const userStartPos = [100, 10]
let currentPosition = userStartPos

const ballStart = [250, 40]
let ballCurPos = ballStart

//create block
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

const blocks = [ new Block(105,570)]


//draw my block
function addBlock() {
    for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement('div')
    block.classList.add('block')
    block.style.left = blocks[i].bottomLeft[0] + 'px'
    block.style.bottom = blocks[i].bottomLeft[1] + 'px'
    grid.appendChild(block)
    }
}

addBlock();

//add user
const user = document.createElement('div')
user.classList.add('user')
grid.appendChild(user)
drawUser()



//draw user
function drawUser() {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

function drawBall() {
    ball.style.left = ballCurPos[0] + 'px'
    ball.style.bottom = ballCurPos[1] + 'px'
}

//move user
function moveUser(e) {
    switch(e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
            currentPosition[0] -= 10
            drawUser()
            }
            break;
        case 'ArrowRight':
            if (currentPosition[0] < boardWidth - blockWidth) {
            currentPosition[0] += 10
            drawUser()
            }
            break;
    }
}

document.addEventListener('keydown', moveUser)



//add ball
const ball = document.createElement('div')
ball.classList.add('ball')
grid.appendChild(ball)
drawBall()

//move ball
function moveBall(){
    ballCurPos[0] += xDirection
    ballCurPos[1] += yDirection
    drawBall()
    checkForCollisions()
}

speed = 10
timerId = setInterval(moveBall, speed)

//check for collisions
function checkForCollisions() {
    //check for block collisions
    for (let i = 0; i < blocks.length; i++) {
        if (
            (ballCurPos[0] > blocks[i].bottomLeft[0] && ballCurPos[0] < blocks[i].bottomRight[0]) &&
            ((ballCurPos[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurPos[1] < blocks[i].topLeft[1])
            ) {
                const allBlocks = Array.from(document.querySelectorAll('.block'))
                changeDirection()
                score++
                scoreDisplay.innerHTML = "Score: " + score
            }
    }
    
    
    //check for wall collision
    if (ballCurPos[0] >= (boardWidth - ballDiameter) || 
        ballCurPos[1] >= (boardHeight - ballDiameter) ||
        ballCurPos[0] <= 0){
        changeDirection()
    }
    
    //check for user collisions
    if ( 
        (ballCurPos[0] > currentPosition[0] && ballCurPos[0] < currentPosition[0] + blockWidth) && 
        (ballCurPos[1] > currentPosition[1] && ballCurPos[1] < currentPosition[1] + blockHeight)
    ) {
        changeDirection()
    }

//check for game over
    if (ballCurPos[1] <= 0) {
        clearInterval(timerId)
        scoreDisplay.innerHTML = 'Score: ' + score
        document.removeEventListener('keydown', moveUser)
    }
}

function changeDirection() {
    if (xDirection >= 0 && xDirection <= 2 && yDirection >= 0 && yDirection <= 2) {
        yDirection = -2
        return
    }
    if (xDirection >= 0 && xDirection <= 2 && yDirection <= 0 && yDirection >= -2){
        xDirection = -2
        return
    }
    if (xDirection <= 0 && xDirection >= -2 && yDirection <= 0 && yDirection >= -2){
        yDirection = 2
        return
    }
    if (xDirection >= -2 && xDirection <= 0 && yDirection >= 0 && yDirection <= 2){
        xDirection = 2
        return
    }
    
}