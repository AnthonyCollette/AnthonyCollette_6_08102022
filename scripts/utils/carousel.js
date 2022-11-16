const carouselDiv = document.getElementById('carousel')
const select = document.getElementById('filter-select')

export const carousel = (firstName, images) => {
    let articles = document.getElementsByClassName('portfolio__article');
    for (let i = 0; i < articles.length; i++) {
            articles[i].addEventListener('click', () => {
                const backUpImages = [];
                for (let image of images) {
                    backUpImages.push(image)
                }
                // Tri des images
                const sortArray = (array, index) => {
                    for (let v = 0; v < index; v++) {
                        let firstImage = array.shift()
                        array.push(firstImage)
                    }
                    return array
                }
                sortArray(images, i)

                carouselDiv.style.display = 'flex'
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
                const slider = document.getElementById('carousel__slider')

                // Affichage des images
                for (const image of images) {
                    if (image.image) {
                        slider.innerHTML += `
                <div class="carousel__slider--image">
                    <div class="carousel__slider--image-wrapper">
                        <img src="assets/images/${firstName}/${image.image}" alt"" />
                    </div>
                    <h2>${image.title}</h2>
                </div>
                `}
                    if (image.video) {
                        slider.innerHTML += `
                    <div class="carousel__slider--video">
                        <div class="carousel__slider--video-wrapper">
                            <video controls>
                            <source src="assets/images/${firstName}/${image.video}" alt="${image.title}" class="img-portfolio"/>
                            </video>
                        </div>
                        <h2>${image.title}</h2>
                    </div>
                `
                    }
                }

                const nextBtn = document.getElementById('next')
                const prevBtn = document.getElementById('prev')
                let translateX = 0
                let sliderWidth = -((articles.length - 1) * 1050)

                prevBtn.addEventListener('click', () => {
                    if (translateX === 0) {
                        translateX = sliderWidth
                        slider.style.transform = 'translateX(' + translateX + 'px)'
                    } else {
                        translateX += 1050
                        slider.style.transform = 'translateX(' + translateX + 'px)'
                    }
                })

                nextBtn.addEventListener('click', () => {
                    if (translateX === sliderWidth) {
                        translateX = 0
                        slider.style.transform = 'translateX(0px)'
                    } else {
                        translateX -= 1050
                        slider.style.transform = 'translateX(' + translateX + 'px)'
                    }
                })

                const closeBtn = document.getElementById('close-carousel-btn')

                closeBtn.addEventListener('click', () => {
                    carouselDiv.style.display = 'none'
                    images = backUpImages
                })
            })
        }
}
