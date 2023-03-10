export function photographerFactory(data, mediasData) {
	const { id, portrait, city, country, tagline, price } = data

	const picture = `assets/photographers/${portrait}`
	const url = `photographer.html?id=${id}`
	function name() {
		return data.name
	}

	function getUserCardDOM() {
		const article = document.createElement('article')
		const img = document.createElement('img')
		const h2 = document.createElement('h2')
		const taglinePar = document.createElement('p')
		const link = document.createElement('a')
		const texts = document.createElement('div')
		const pricePar = document.createElement('p')
		const locationPar = document.createElement('p')

		img.setAttribute('src', picture)
		img.setAttribute('alt', name())
		h2.textContent = name()
		locationPar.textContent = city + ', ' + country
		taglinePar.textContent = tagline
		locationPar.classList.add('location')
		link.setAttribute('href', url)
		link.setAttribute('title', name())
		pricePar.textContent = price + '€/jour'

		article.appendChild(link)
		article.appendChild(texts)

		link.appendChild(img)
		link.appendChild(h2)
		texts.appendChild(locationPar)
		texts.appendChild(taglinePar)
		texts.appendChild(pricePar)

		return article
	}

	function getInfosPhotographer() {
		const h1 = document.createElement('h1')
		const img = document.createElement('img')
		const h2 = document.createElement('h2')
		const paragraphDesc = document.createElement('p')

		h1.textContent = name()
		img.setAttribute('src', picture)
		img.setAttribute('alt', name())
		h2.textContent = city + ', ' + country
		paragraphDesc.textContent = tagline

		const descDiv = document.getElementById('photographer-desc')
		descDiv.appendChild(h1)
		descDiv.appendChild(h2)
		descDiv.appendChild(paragraphDesc)

		const imgDiv = document.getElementById('photographer-img')
		imgDiv.appendChild(img)

		return descDiv, imgDiv
	}

	function createRedBox() {
		const redBox = document.getElementById('redbox')
		let totalOfLikes = 0

		const likesDiv = document.createElement('p')
		const tarif = document.createElement('p')

		// Addition des likes totaux
		mediasData.forEach((media) => {
			totalOfLikes += media.likes
		})

		likesDiv.innerHTML = totalOfLikes + ' <i class="fa-solid fa-heart"></i>'
		tarif.textContent = data.price + '€/jour'

		redBox.appendChild(likesDiv)
		redBox.appendChild(tarif)

		return redBox
	}

	function sendForm() {
		let sendBtn = document.getElementById('send-form')
		let firstName = document.getElementById('firstname')
		let lastName = document.getElementById('lastname')
		let email = document.getElementById('email')
		let message = document.getElementById('message')
		
		sendBtn.addEventListener('click', (e) => {
			e.preventDefault()
			console.log('Prénom : ' + firstName.value + ', nom : '+ lastName.value + ', email : ' + email.value + ', message : ' + message.value)
		})
	}

	return { name, getUserCardDOM, getInfosPhotographer, createRedBox, sendForm }
}
