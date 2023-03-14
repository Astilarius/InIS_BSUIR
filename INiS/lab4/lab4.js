const title = document.getElementById('title')
const picture = document.getElementById('picture')
const desc = document.getElementById('desc')
const colorButtons = document.getElementById('colorButtons')
const front = document.getElementById('front')
const back = document.getElementById('back')

console.log(localStorage)
const shirt = JSON.parse(localStorage.getItem('shirt'))

desc.textContent = shirt.description
title.textContent = shirt.name
picture.src = Object.values(shirt.colors)[0].front 
let currentColor = shirt.colors.white
Object.entries(shirt.colors).forEach(color=>{
    const colorButton = document.createElement('button')
    colorButton.style = `background-color: ${color[0]}`
    colorButton.textContent = color[0]
    colorButton.onclick = ()=>{
        picture.src = color[1].front
        console.log(currentColor)
        currentColor = color[1]
    }
    colorButtons.appendChild(colorButton)
})
front.onclick = ()=>{
    picture.src = currentColor.front
}
back.onclick = ()=>{
    picture.src = currentColor.back
}