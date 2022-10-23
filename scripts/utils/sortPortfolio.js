export const select = document.getElementById('filter-select');


export const sortPortfolio = (images, firstName) => {
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
}