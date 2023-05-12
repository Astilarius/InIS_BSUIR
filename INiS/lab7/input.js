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
    const lowerObst = document.createElement('div')
    const higherObst = document.createElement('div')
    const height = getRandomIntInclusive(10, 45)
    higherObst.style.height = `${height}%`
    lowerObst.style.height = `${55-height}%`
    obstacle.appendChild(lowerObst)
    obstacle.appendChild(higherObst)
    obstacles.appendChild(obstacle)
    setTimeout(addObstacle,1500)
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
    }
}

cycle()
addObstacle()