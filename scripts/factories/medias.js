export function mediaFactory(data, name) {
	const { image, video, likes, title } = data
	let firstName = name ? name.substring(0, name.indexOf(' ')) : ''
	firstName.includes('-') ? (firstName = firstName.replace('-', ' ')) : ''
	const imageSrc = `assets/images/${firstName}/${image}`
	const videoSrc = `assets/images/${firstName}/${video}`
	const slider = document.getElementById('carousel__slider')
	let translateX = 0
	let sliderWidth = -((data.length - 1) * 1050)

	function getPortfolio(index) {
		// Création des éléments
		const mediaArticle = document.createElement('div')
		const imgWrapper = document.createElement('div')
		const imgPortfolio = document.createElement('img')
		const videoPortfolio = document.createElement('video')
		const videoFile = document.createElement('source')
		const descDiv = document.createElement('div')
		const h5 = document.createElement('h5')
		const p = document.createElement('p')

		// Modification des éléments
		h5.textContent = title
		p.innerHTML = likes + '<i class="fa-solid fa-heart like-btn"></i>'

		// Ajout des classes
		mediaArticle.classList.add('portfolio__article')
		imgWrapper.classList.add('portfolio__article--img-wrapper')
		descDiv.classList.add('portfolio__article--text')
		p.classList.add('likes')

		// Modification des attributs
		videoPortfolio.setAttribute('controls', true)
		mediaArticle.setAttribute('tabindex', index)

		// Ajout des éléments
		mediaArticle.appendChild(imgWrapper)
		mediaArticle.appendChild(descDiv)
		descDiv.appendChild(h5)
		descDiv.appendChild(p)
		videoPortfolio.appendChild(videoFile)

		// Affichage des images
		if (image) {
			imgPortfolio.setAttribute('src', imageSrc)
			imgWrapper.appendChild(imgPortfolio)
		}
		// Affichage des vidéos
		if (video) {
			videoFile.setAttribute('src', videoSrc)
			imgWrapper.appendChild(videoPortfolio)
		}

		return mediaArticle
	}

	function sortMedias(sortBy) {
		switch (sortBy) {
			// Tri par popularité
			case 'popularity':
				data.sort((a, b) => {
					if (a.likes < b.likes) {
						return 1
					}
					if (a.likes > b.likes) {
						return -1
					}
					return 0
				})
				break

			// Tri par date
			case 'date':
				data.sort((a, b) => {
					if (a.date < b.date) {
						return -1
					}
					if (a.date > b.date) {
						return 1
					}
					return 0
				})
				break

			// Tri par ordre alphabétique
			case 'title':
				data.sort((a, b) => {
					if (a.title < b.title) {
						return -1
					}
					if (a.title > b.title) {
						return 1
					}
					return 0
				})
				break
			default:
				data.sort((a, b) => {
					if (a.likes < b.likes) {
						return 1
					}
					if (a.likes > b.likes) {
						return -1
					}
					return 0
				})
				break
		}
		return data
	}

	function openCarousel(mediasDisplayed) {
		const carousel = document.getElementById('carousel')
		const carouselSlider = document.getElementById('carousel__slider')

		for (let i = 0; i < mediasDisplayed.length; i++) {
			mediasDisplayed[i].addEventListener('click', (e) => {
				// Tri des médias
				const sortArray = (array, index) => {
					for (let v = 0; v < index; v++) {
						let firstImage = array.shift()
						array.push(firstImage)
					}
					return array
				}
				sortArray(data, i)

				// Apparition du carousel
				carousel.style.display = 'flex'

				for (const media of data) {
					const imageCarouselSrc = `assets/images/${firstName}/${media.image}`
					const videoCarouselSrc = `assets/images/${firstName}/${media.video}`

					// Création des éléments
					const sliderImage = document.createElement('div')
					const sliderImageWrapper = document.createElement('div')
					const video = document.createElement('video')
					const videoFile = document.createElement('source')
					const img = document.createElement('img')
					const h2 = document.createElement('h2')

					// Attribution des classes
					sliderImage.classList.add('carousel__slider--image')
					sliderImageWrapper.classList.add('carousel__slider--image-wrapper')

					carouselSlider.appendChild(sliderImage)
					sliderImage.appendChild(sliderImageWrapper)

					h2.textContent = media.title
					sliderImage.appendChild(h2)

					if (media.image) {
						img.setAttribute('src', imageCarouselSrc)
						img.setAttribute('alt', media.title)
						sliderImageWrapper.appendChild(img)
					}

					if (media.video) {
						videoFile.setAttribute('src', videoCarouselSrc)
						video.setAttribute('controls', true)
						video.appendChild(videoFile)

						sliderImageWrapper.appendChild(video)
					}
				}
			})
		}

		return carousel
	}

	function prevMedia() {
		const prevBtn = document.getElementById('prev')
		prevBtn.addEventListener('click', () => {
			if (translateX === 0) {
				translateX = sliderWidth
				slider.style.transform = 'translateX(' + translateX + 'px)'
			} else {
				translateX += 1050
				slider.style.transform = 'translateX(' + translateX + 'px)'
			}
		})
	}

	function nextMedia() {
		const nextBtn = document.getElementById('next')
		nextBtn.addEventListener('click', () => {
			if (translateX === sliderWidth) {
				translateX = 0
				slider.style.transform = 'translateX(0px)'
			} else {
				translateX -= 1050
				slider.style.transform = 'translateX(' + translateX + 'px)'
			}
		})
	}

	function closeCarousel(value) {
		const carouselClostBtn = document.getElementById('close-carousel-btn')
		const carousel = document.getElementById('carousel')
		carouselClostBtn.addEventListener('click', () => {
			translateX = 0
			carousel.style.display = 'none'
			slider.textContent = ''
			slider.style.transform = 'translateX(' + translateX + 'px)'
			sortMedias(value)
		})

		return { data, carousel }
	}

	function like() {
		let likeButtons = document.getElementsByClassName('like-btn')
		for (let i = 0; i < likeButtons.length; i++) {
			likeButtons[i].addEventListener('click', (e) => {
				let title = e.target.parentNode.previousElementSibling.innerHTML
			})
		}
	}

	return {
		getPortfolio,
		sortMedias,
		openCarousel,
		prevMedia,
		nextMedia,
		closeCarousel,
		like,
	}
}
