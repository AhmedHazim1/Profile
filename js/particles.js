const canvas = document.querySelector("#mainCanvas")
const ctx = canvas.getContext("2d")

///////////////////
//resizing canvas
//////////////////
const sections = document.querySelectorAll("main section")

function getScrollbarWidth() {
    // Creating invisible container
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(outer);
  
    // Creating inner element and placing it in the container
    const inner = document.createElement('div');
    outer.appendChild(inner);
  
    // Calculating difference between container's full width and the child width
    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
  
    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);
  
    return scrollbarWidth;  
}

function resizeCan(){
    canvas.width = innerWidth - getScrollbarWidth() 
    canvas.height = document.querySelector("main").clientHeight
    sections.forEach(section=>{
        section.style.wdith = `calc(100vh -  ${getScrollbarWidth()})`
    })
}
addEventListener("resize",()=>{
    resizeCan()
})
resizeCan()


///////////////////
//get mouse oosition
//////////////////

let mouse={
    x : undefined,
    y : undefined,
}
addEventListener("mousemove",(e)=>{
    mouse.x = e.pageX
    mouse.y = e.pageY
})
addEventListener("click",(e)=>{
    mouse.x = e.pageX
    mouse.y = e.pageY
})

let mouseOn = false;
let clickElement = document.querySelectorAll(".mouseBiger")
clickElement.forEach(e=>{
    e.addEventListener("mouseover",a=>{
        mouseOn = true
    })
    e.addEventListener("mouseleave",a=>{
        mouseOn = false
    })
})
///////////////////
//particles
//////////////////

class particle{
    constructor(x, y, raduis, color){
        this.raduis = raduis
        this.color = color
        this.x = x
        this.y = y
        this.dx = Math.random() * 3 - 1.5;
        this.dy = Math.random() * 3 - 1.5;
    }
    draw(){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.raduis, 
                0, Math.PI * 2)
        ctx.strokeStyle = this.color
        ctx.stroke()
    }
    update(){
        this.x += this.dx
        this.y += this.dy
        this.raduis -=.3
        this.draw()
    }
}
function random(a, b){
    return Math.floor(Math.random() * (a - b) + b)
}

let hue = 0;
let particles = []
function createParticles(){
    for(let i=0; i < 1; i++){
        let x = mouse.x
        let y = mouse.y
        let raduis = 13

        if(random(1, -1) < 0)
            color = `#24c4c6`
        else
        color = "#dc2f02"
        
        let part = new particle(x, y, raduis, color)
        if(mouseOn)
            part.raduis += 10
        particles.push(part)
    }
}

function animate(){
    myReq = requestAnimationFrame(animate)
    ctx.clearRect(0,0,canvas.width,canvas.height)
    if(innerWidth >= 1000)
        createParticles(ctx)
    
    particles.forEach((par, index)=>{
        if(par.raduis <= .3){
            particles.slice(index, 1)
        }else
            par.update()
    })
}

animate()