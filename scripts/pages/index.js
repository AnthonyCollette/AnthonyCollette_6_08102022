async function getPhotographers() {
	const photographers = []
	class Photographer {
		constructor(name, id, city, country, tagline, price, portrait) {
			this.name = name
			this.id = id
			this.city = city
			this.country = country
			this.tagline = tagline
			this.price = price
			this.portrait = portrait
		}
	}
	// Penser à remplacer par les données récupérées dans le json
	const getPhotographers = await fetch('../../data/photographers.json').then(
		(res) =>
			res.json().then((data) => {
				data.photographers.forEach((photographer) => {
					photographers.push(
						new Photographer(
							photographer.name,
							photographer.id,
							photographer.city,
							photographer.country,
							photographer.tagline,
							photographer.price,
							photographer.portrait
						)
					)
				})
			})
	)

	// const photographers = [
	// 	{
	// 		name: 'Ma data test',
	// 		id: 1,
	// 		city: 'Paris',
	// 		country: 'France',
	// 		tagline: 'Ceci est ma data test',
	// 		price: 400,
	// 		portrait: 'account.png',
	// 	},
	// 	{
	// 		name: 'Autre data test',
	// 		id: 2,
	// 		city: 'Londres',
	// 		country: 'UK',
	// 		tagline: 'Ceci est ma data test 2',
	// 		price: 500,
	// 		portrait: 'account.png',
	// 	},
	// ]

	// et bien retourner le tableau photographers seulement une fois
	return {
		photographers: [...photographers],
	}
}

async function displayData(photographers) {
	const photographersSection = document.querySelector('.photographer_section')

	photographers.forEach((photographer) => {
		const photographerModel = photographerFactory(photographer)
		const userCardDOM = photographerModel.getUserCardDOM()
		photographersSection.appendChild(userCardDOM)
	})
}

async function init() {
	// Récupère les datas des photographes
	const { photographers } = await getPhotographers()
	displayData(photographers)
}

// const select = document.getElementById('filter-select');

// select.addEventListener('click', () => {
// 	selectWrapper.classList.contains('open') ? selectWrapper.classList.remove('open') : selectWrapper.classList.add('open');
// })

init()
