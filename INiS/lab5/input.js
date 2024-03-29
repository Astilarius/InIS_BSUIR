const targets = document.getElementsByClassName('target')

console.log(targets)

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

    //touch
    let lastTouchTime = 0;

    function documentTouchStart(e) {
        isDragging = true;

        console.log("touchstart");

        const touch = e.touches[0];
        initialX = touch.clientX;
        initialY = touch.clientY;

        initialDivX = parseInt(div.style.left) || 0;
        initialDivY = parseInt(div.style.top) || 0;

        const now = (new Date()).getTime();
        lastTouchTime = now;
    }
    function documentTouchMove(e) {
        if (isDragging) {
            const touch = e.touches[0];
            const dx = touch.clientX - initialX;
            const dy = touch.clientY - initialY;


            //положение блока до + смещение
            div.style.left = `${initialDivX + dx}px`;
            div.style.top = `${initialDivY + dy}px`;
        }
    }
    function documentTouchEnd(e) {
        isDragging = false;

        const now = (new Date()).getTime();
        console.log("document touchend " + (now - lastTouchTime))
        if (now - lastTouchTime <= 100) {
            isFocus = false;
            div.style.background = "red"

            document.removeEventListener('touchstart', documentTouchStart)
            document.removeEventListener('touchmove', documentTouchMove);
            document.removeEventListener('touchend', documentTouchEnd);
        }
    }

    el.addEventListener('touchstart', e => {
        const now = (new Date()).getTime();
        if (now - lastTouchTime <= 200) {
            isDragging = true;
            isFocus = true;

            div.style.background = "yellow"

            document.addEventListener('touchstart', documentTouchStart)
            document.addEventListener('touchmove', documentTouchMove);
            document.addEventListener('touchend', documentTouchEnd)
        } else {
            if (!isFocus) {
                isDragging = true;

                div.style.background = "yellow"

                const touch = e.touches[0];

                initialX = touch.clientX;
                initialY = touch.clientY;

                
               
                if (e.touches[1] == undefined) {
                    initialDivX = parseInt(div.style.left) || 0;
                    initialDivY = parseInt(div.style.top) || 0;
                }

                document.addEventListener('touchstart', e => {
                    if (e.touches[1] != undefined) {
                        console.log(1234)

                        div.style.background = "red"
                        isDragging = false;

                        div.style.left = `${initialDivX}px`;
                        div.style.top = `${initialDivY}px`;
                    }
                    
                })
            }
        }
        lastTouchTime = now;
    });

    el.addEventListener('touchmove', e => {
        if (isDragging && !isFocus) {
  
            //смещение
            const touch = e.touches[0];
            const dx = touch.clientX - initialX;
            const dy = touch.clientY - initialY;

            //положение блока до + смещение
            div.style.left = `${initialDivX + dx}px`;
            div.style.top = `${initialDivY + dy}px`;
        }
    });

    el.addEventListener('touchend', e => {
        isDragging = false;

        if (!isFocus) {
            div.style.background = "red"
        }
        
    });
}