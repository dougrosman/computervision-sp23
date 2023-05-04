let links = document.getElementsByClassName('work-link');


links.forEach((link) => {

    console.log(link.getBoundingClientRect());
})

window.addEventListener("resize", function(){
    links.forEach((link) => {

        // console.log(link.getBoundingClientRect());
    })

    // console.log('\n');
})

window.addEventListener("mousemove", (e) => {

    const mousePos = { x: e.clientX, y: e.clientY };
    // console.log(mousePos)

    links.forEach((link) => {

        // console.log(link.getBoundingClientRect());

        const linkBox = link.getBoundingClientRect();
        
        
        if(mousePos.x > linkBox.x &&
           mousePos.x < linkBox.x + linkBox.width &&
           mousePos.y > linkBox.y &&
           mousePos.y < linkBox.y + linkBox.height
        ) {
            console.log(link.innerHTML);
            link.style.border = '4px solid rgb(0, 255, 0)';
        } else {
            link.style.border = 'none';
        }

        // check if mouse position is in bounding box
        // if(mousePos.x)

    })

})