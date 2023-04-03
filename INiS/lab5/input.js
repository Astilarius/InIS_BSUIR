// console.log('log')

const targets = document.getElementsByClassName('target')

console.log(targets)

// [].forEach.call(list, function(el) {
//     console.log(el.id);
// });

for (const el of targets){
    el.onmousedown = (e) => {

        var rect = el.getBoundingClientRect();

        const TrueStartPosX = rect.left
        const TrueStartPosY = rect.top
        document.onkeydown = (e2) => {
            if (e2.key = 'Escape'){
                document.onmousemove = null;
                el.style.top = `${TrueStartPosY}px`;
                el.style.left = `${TrueStartPosX}px`;

            }
        }
        let startPosY = e.clientY
        let startPosX = e.clientX
        document.onmousemove = (e2) => {
            // calculate the new cursor position:
            pos1 = startPosX - e2.clientX;
            pos2 = startPosY - e2.clientY;
            startPosX = e2.clientX;
            startPosY = e2.clientY;
            // set the element's new position:
            el.style.top = (el.offsetTop - pos2) + "px";
            el.style.left = (el.offsetLeft - pos1) + "px";
        }
        document.onmouseup = ()=>{
            document.onmouseup = null;
            document.onmousemove = null;
            document.onkeydown = null;
        }
    }
    el.ondblclick = (e) => {
        let startPosY = e.clientY
        let startPosX = e.clientX

        var rect = el.getBoundingClientRect();

        const TrueStartPosX = rect.left
        const TrueStartPosY = rect.top
        document.onkeydown = (e2) => {
            if (e2.key = 'Escape'){
                document.onmousemove = null;
                el.style.top = `${TrueStartPosY}px`;
                el.style.left = `${TrueStartPosX}px`;

            }
        }
        document.onmousemove = (e2) => {
            // calculate the new cursor position:
            pos1 = startPosX - e2.clientX;
            pos2 = startPosY - e2.clientY;
            startPosX = e2.clientX;
            startPosY = e2.clientY;
            // set the element's new position:
            el.style.top = (el.offsetTop - pos2) + "px";
            el.style.left = (el.offsetLeft - pos1) + "px";
        }
        document.onclick = ()=>{
            document.onmousemove = null;
            document.onkeydown = null;
        }
    }
}