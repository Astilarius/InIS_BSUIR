const divs = document.querySelectorAll('.target');

let isFocus = false;


divs.forEach(div => {

    let isDragging = false;

    let initialX;
    let initialY;

    let initialDivX;
    let initialDivY;

    //mouse
    {
        div.addEventListener('mousedown', e => {
            div.style.background = "yellow"
            isDragging = true;

            initialX = e.clientX;
            initialY = e.clientY;

            initialDivX = parseInt(div.style.left) || 0;
            initialDivY = parseInt(div.style.top) || 0;
        });

        div.addEventListener('dblclick', e => {
            isDragging = true;
            div.style.background = "yellow"
        });

        div.addEventListener('mousemove', e => {

            if (isDragging) {
                //смещение

                const dx = e.clientX - initialX;
                const dy = e.clientY - initialY;

                //положение блока до + смещение
                div.style.left = `${initialDivX + dx}px`;
                div.style.top = `${initialDivY + dy}px`;
            }
        });

        div.addEventListener('mouseup', e => {
            div.style.background = "red"
            isDragging = false;
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && isDragging) {
                isDragging = false;
                div.style.background = "red"

                div.style.left = `${initialDivX}px`;
                div.style.top = `${initialDivY}px`;
            }
        });

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

    div.addEventListener('touchstart', e => {
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

    div.addEventListener('touchmove', e => {
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

    div.addEventListener('touchend', e => {
        isDragging = false;

        if (!isFocus) {
            div.style.background = "red"
        }
        
    });
});