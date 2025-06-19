

//Funcionalidad para el slider//

const slider = document.querySelectorAll ('.slider');
const slides = document.querySelectorAll('.slider img');
const totalSlides = slides.length;
let currentSlide = 0;
let intevalId;

function startSlider () {
    intevalId = setInterval(()=> {
        currentSlide = (currentSlide + 1) % totalSlides
        window.location.hash = `#slide-${currentSlide + 1}`;
    }, 4000);
}

function stopSlider () {
    clearInterval(intevalId);
}

//inicia el slider automatico
startSlider ();

//pausa con hover
slider.addEventListener('mouseenter', stopSlider);
slider.addEventListener('mouseleave', startSlider);