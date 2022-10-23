import { select } from "./sortPortfolio.js";
const carouselDiv = document.getElementById('carousel');

export const carousel = (firstName, images) => {
    const articles = document.getElementsByClassName('portfolio__article') 
    for (let i = 0; i < articles.length; i++) {

        articles[i].addEventListener('click', () => {
            carouselDiv.style.display = 'flex';
            carouselDiv.innerHTML = `
                <div class="carousel__wrapper">
                    <i class="fa-solid fa-chevron-left" id="prev"></i>
                    <div class="carousel__show">
                        <div class="carousel__slider" id="carousel__slider">
                        </diV>
                    </div>
                    <i class="fa-solid fa-chevron-right" id="next"></i>
                    <i class="fa-solid fa-xmark" id="close-carousel-btn"></i>
                </div>
            `
            const slider = document.getElementById('carousel__slider');
            for (let v = 0; v < images.length; v++) {
   
                images[v].image ? 
                slider.innerHTML += `
                <div class="carousel__slider--image">
                    <div class="carousel__slider--image-wrapper">
                        <img src="assets/images/${firstName}/${images[v].image}" alt"" />
                    </div>
                    <h2>${images[v].title}</h2>
                </div>
                ` : ''
            }
            const nextBtn = document.getElementById('next')
            const prevBtn = document.getElementById('prev')
            let translateX = 0
            let sliderWidth = -((articles.length - 1) * 1050)
            
                        prevBtn.addEventListener('click', () => {
                if (translateX === 0) {
                    translateX = sliderWidth
                    slider.style.transform = "translateX("+translateX+"px)";
                } else {
                    translateX += 1050
                    slider.style.transform = "translateX("+translateX+"px)";
                } 
          
            })

            nextBtn.addEventListener('click', () => {
                if (translateX === sliderWidth) {
                    translateX = 0
                    slider.style.transform = "translateX(0px)";
                } else {
                    translateX -= 1050
                    slider.style.transform = "translateX("+translateX+"px)";
                } 
          
            })

            const closeBtn = document.getElementById('close-carousel-btn')

            closeBtn.addEventListener('click', () => {
                carouselDiv.style.display = 'none'
            })
        })
    }
}