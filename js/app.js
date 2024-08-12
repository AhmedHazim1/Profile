const menuCont = document.querySelector(".menu")
const ham = document.querySelector(".menu-close")
const navbar = document.querySelector("nav");
const navLiks = document.querySelectorAll(".menu-content li")

let menuOn = false

ham.addEventListener("click",()=>{
    if(!menuOn){
        ham.classList.add("menu-open")
        menuCont.classList.add("menu-on")
        menuOn = true
    }else{
        ham.classList.remove("menu-open")
        menuCont.classList.remove("menu-on")
        menuOn = false
    }
})
navLiks.forEach(e=>{
    e.addEventListener("click",()=>{
        ham.classList.remove("menu-open")
        menuCont.classList.remove("menu-on")
        menuOn = false
    })
})