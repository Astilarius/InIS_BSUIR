const bird = document.querySelector('.bird');
const obstacles = document.querySelector('.obstacles');

const birdStats = {height:0,acceleration:0,rect:{}}
const screenHeight = window.innerHeight;

document.onkeydown = (e) => {
    birdStats.height -= 100
    birdStats.acceleration = -8
}
const addObstacle =()=>{
    const obstacle = document.createElement('div')
    obstacle.className = 'obstacle'
    obstacle.style.left = `${1600}px`
    const lowerObst = document.createElement('img')
    const higherObst = document.createElement('img')
    const height = getRandomIntInclusive(10, 45)
    higherObst.style.height = `${height}%`
    higherObst.src = './pipe.png'
    lowerObst.style.height = `${55-height}%`
    lowerObst.src = './pipe-upside-down.png'
    obstacle.appendChild(lowerObst)
    obstacle.appendChild(higherObst)
    obstacles.appendChild(obstacle)
    setTimeout(addObstacle,2000)
}
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function collides(a, b) {
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();
  
    return !(
      (aRect.bottom < bRect.top) ||
      (aRect.top > bRect.bottom) ||
      (aRect.right < bRect.left) ||
      (aRect.left > bRect.right)
    );
}
let isOk = true
const cycle=()=>{
    birdStats.height+=birdStats.acceleration
    birdStats.acceleration+=0.2
    bird.style.top = `${birdStats.height}px`
    birdStats.rect = bird.getBoundingClientRect();
    obstacles.childNodes.forEach((obstacle)=>{
        if(collides(bird,obstacle.childNodes[0]) || collides(bird,obstacle.childNodes[1])){
            isOk = false
            console.log('Bird has touched obstacle');
        }
        obstacle.style.left = `${parseInt(obstacle.style.left) - 3}px`
    })
    if (birdStats.rect.top < 0 || birdStats.rect.bottom >= screenHeight) {
        isOk = false
        console.log('Bird has touched top or bottom of screen');
    } else {
        
    }
    if(isOk){
        setTimeout(cycle,10)
    } else {
        const loseMsg = document.createElement('h1')
        loseMsg.textContent = 'Вы проиграли'
        loseMsg.className = 'loseMsg'
        document.body.appendChild(loseMsg)
        const restartButton = document.createElement('button')
        restartButton.onclick = ()=>{
            window.location.reload();
        }
        restartButton.innerText = 'Начать заново'
        restartButton.className = 'restartButton'
        document.body.appendChild(restartButton)
    }
}

cycle()
addObstacle()