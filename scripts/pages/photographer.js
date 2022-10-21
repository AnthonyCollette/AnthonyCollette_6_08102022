// Mettre le code JavaScript lié à la page photographer.html
const id = new URL(document.location.href).searchParams.get('id');
const desc = document.getElementById('photographer-desc');
const img = document.getElementById('photographer-img');
const portfolio = document.getElementById('portfolio');
const select = document.getElementById('filter-select');
const selectWrapper = document.getElementById('select-wrapper');
const redBox = document.getElementById('redbox');
const imgLink = document.getElementsByClassName('img-portfolio');
const divFullImg = document.getElementById('img-fullpage');
let photographer = '';
const images = [];
let firstName = '';

// Recherche du photographe correspondant à l'id de l'URL
const getPhotographer = async (id) => {
	await fetch('../../data/photographers.json').then((res) => res.json())
		.then((data) => {
			// Récupération des informations du photographe
			photographer = data.photographers.filter(profil => profil.id == id)[0]
			// Récupération du prénom du photographe
			firstName = photographer.name.substring(0, photographer.name.indexOf(' '));
			firstName.includes('-') ? firstName = firstName.replace('-', ' ') : '';
			// Récupération des photos du photographe
			data.media.forEach(picture => {
				if (picture.photographerId == id) {
					images.push(picture)
				}
			})
			images.sort((a, b) => {
				if (a.likes < b.likes) {
					return 1
				}
				if (a.likes > b.likes) {
					return -1
				}
				return 0
				
			})
			desc.innerHTML += `
				<h1>${photographer.name}</h1>
				<h3>${photographer.city}, ${photographer.country}</h3>
				<p class="tagline">${photographer.tagline}</p>
			`
			img.innerHTML += `
				<img src="assets/photographers/${photographer.portrait}" alt="Photo de ${photographer.name}" />
			` 
			let totalOfLikes = 0;
			images.forEach(picture => {
				if (picture.image) {
					portfolio.innerHTML += `
					<div class="portfolio__article">
						<div class="portfolio__article--img-wrapper">
							<img src="assets/images/${firstName}/${picture.image}" alt="${picture.title}" class="img-portfolio" />
						</div>
						<div class="portfolio__article--text">
							<h5>${picture.title}</h5>
							<div class="likes">
								<p>${picture.likes} <i class="fa-solid fa-heart"></i></p> 
							</div>
						</div>
					</div>`;
					totalOfLikes += picture.likes;
				}
			})
			
			redBox.innerHTML += `
				<p>${totalOfLikes} <i class="fa-solid fa-heart"></i></p>
				<p>${photographer.price}€ / jour</p>
			`

			for (let i = 0; i < imgLink.length; i++) {
				imgLink[i].addEventListener('click', (e) => {
					divFullImg.style.display = 'flex';
					divFullImg.innerHTML = `
					<div class="img-wrapper">
						<img src="assets/icons/close.svg" alt="Bouton de fermeture de la fenêtre" class="close-btn" id="close-btn-full-img"/>
						<i class="fa-solid fa-chevron-up chevron-left" id="chevron-left"></i>
						<i class="fa-solid fa-chevron-up chevron-right" id="chevron-right"></i>
						<div class="img-border">
							<img src="${e.target.src}" alt="${e.target.alt}" />
						</div>
						<h2>${e.target.alt}</h2>
					</div>
					`
					const closeBtnImg = document.getElementById('close-btn-full-img');
					const chevronLeft = document.getElementById('chevron-left');
					const chevronRight = document.getElementById('chevron-right');
					closeBtnImg.addEventListener('click', () => {
						divFullImg.style.display = 'none';
					})
					let nextImg = '';
					if (i >= 0 && i < imgLink.length - 1) {
						nextImg = imgLink[i + 1]
					}
					chevronRight.addEventListener('click', () => {
						divFullImg.innerHTML = `
						<div class="img-wrapper">
							<img src="assets/icons/close.svg" alt="Bouton de fermeture de la fenêtre" class="close-btn" id="close-btn-full-img"/>
							<i class="fa-solid fa-chevron-up chevron-left" id="chevron-left"></i>
							<i class="fa-solid fa-chevron-up chevron-right" id="chevron-right"></i>
							<div class="img-border">
								<img src="${nextImg.src}" alt="${nextImg.alt}" />
							</div>
							<h2>${nextImg.alt}</h2>
						</div>
						`;
						i++;
					})
				})

			}

		})

}

// Rotation du chevron du select
select.addEventListener('click', () => {
	selectWrapper.classList.contains('open') ? selectWrapper.classList.remove('open') : selectWrapper.classList.add('open');
})

// Tris
select.addEventListener('change', (event) => {
	const value = event.target.value;

	switch (value) {
		// Tri par popularité
		case 'popularity':
			images.sort((a, b) => {
				if (a.likes < b.likes) {
					return 1
				}
				if (a.likes > b.likes) {
					return -1
				}
				return 0
				
			})
			portfolio.innerHTML = ''
			images.forEach(picture => {
				picture.image ?
					portfolio.innerHTML += `
					<div class="portfolio__article">
						<div class="portfolio__article--img-wrapper">
							<img src="assets/images/${firstName}/${picture.image}" alt="${picture.title}" class="img-portfolio" />
						</div>
						<div class="portfolio__article--text">
							<h5>${picture.title}</h5>
							<div class="likes">
								<p>${picture.likes} <i class="fa-solid fa-heart"></i></p> 
							</div>
						</div>
					</div>
				` : ''
			})
			break;
		// Tri par date
		case 'date':
			images.sort((a, b) => {
				if (a.date < b.date) {
					return -1;
				}
				if (a.date > b.date) {
					return 1;
				}
				return 0;
			})
			portfolio.innerHTML = ''
			images.forEach(picture => {
				picture.image ?
					portfolio.innerHTML += `
					<div class="portfolio__article">
						<div class="portfolio__article--img-wrapper">
							<img src="assets/images/${firstName}/${picture.image}" alt="${picture.title}" class="img-portfolio" />
						</div>
						<div class="portfolio__article--text">
							<h5>${picture.title}</h5>
							<div class="likes">
								<p>${picture.likes} <i class="fa-solid fa-heart"></i></p> 
							</div>
						</div>
					</div>
				` : ''
			})
			break;
		// Tri par ordre alphabétique
		case 'title':
			images.sort((a, b) => {
				if (a.title < b.title) {
					return -1;
				}
				if (a.title > b.title) {
					return 1;
				}
				return 0;
			})
			portfolio.innerHTML = ''
			images.forEach(picture => {
				picture.image ?
					portfolio.innerHTML += `
					<div class="portfolio__article">
						<div class="portfolio__article--img-wrapper">
							<img src="assets/images/${firstName}/${picture.image}" alt="${picture.title}" class="img-portfolio" />
						</div>
						<div class="portfolio__article--text">
							<h5>${picture.title}</h5>
							<div class="likes">
								<p>${picture.likes} <i class="fa-solid fa-heart"></i></p> 
							</div>
						</div>
					</div>
				` : ''
			})
			break;
		default:
			images.sort((a, b) => {
				if (a.likes < b.likes) {
					return 1
				}
				if (a.likes > b.likes) {
					return -1
				}
				return 0
				
			})
			portfolio.innerHTML = ''
			images.forEach(picture => {
				picture.image ?
					portfolio.innerHTML += `
					<div class="portfolio__article">
						<div class="portfolio__article--img-wrapper">
							<img src="assets/images/${firstName}/${picture.image}" alt="${picture.title}" class="img-portfolio" />
						</div>
						<div class="portfolio__article--text">
							<h5>${picture.title}</h5>
							<div class="likes">
								<p>${picture.likes} <i class="fa-solid fa-heart"></i></p> 
							</div>
						</div>
					</div>
				` : ''
			})
			break;
	}	

})


getPhotographer(id)
