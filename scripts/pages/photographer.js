import { photographerFactory } from '../factories/photographer.js'
import { mediaFactory } from '../factories/medias.js'
import { modalContact } from '../utils/contactForm.js'

// Récupération de l'id du photographe
const id = new URL(document.location.href).searchParams.get('id')

const header = document.getElementById('photograph-header')
const portfolioDiv = document.getElementById('portfolio')
let mediasDisplayed = document.getElementsByClassName('portfolio__article')
const select = document.getElementById('filter-select')

// Récupération des informations du photographe
const data = await fetch('../../data/photographers.json')
	.then((res) => res.json())
	.then((arrays) =>
		arrays.photographers.find((photographer) => photographer.id == id)
	)

// Récupération des médias du photographe
let mediasData = await fetch('../../data/photographers.json')
	.then((res) => res.json())
	.then((arrays) => arrays.media.filter((media) => media.photographerId == id))

const media = mediaFactory(mediasData, data.name)
media.sortMedias(select.value)
// Affichage du header
const photographer = photographerFactory(data, mediasData)
const infosPhotographer = photographer.getInfosPhotographer()

// Affichage du bloc rouge
const displayRedBox = photographer.createRedBox()
header.appendChild(infosPhotographer)

// Affichage du portfolio
mediasData.forEach((media) => {
	const medias = mediaFactory(media, data.name)
	const displayMedias = medias.getPortfolio()
	portfolioDiv.appendChild(displayMedias)
})

// Modification du tri des médias
select.addEventListener('change', () => {
	// Tri des médias
	let sortedMedias = media.sortMedias(select.value)

	// Remise à zero du portfolio
	portfolioDiv.textContent = ''

	// Affichage des médias
	sortedMedias.forEach((media) => {
		const medias = mediaFactory(media, data.name)
		const displayMedias = medias.getPortfolio()
		portfolioDiv.appendChild(displayMedias)
	})

	media.openCarousel(mediasDisplayed)
	// Fermeture du carousel
	media.closeCarousel(select.value)
})

// Affichage du carousel
media.openCarousel(mediasDisplayed)
media.prevMedia()
media.nextMedia()

// Fermeture du carousel
media.closeCarousel(select.value)

// MODAL DE CONTACT
const modal = modalContact(data.name)

// Affichage du modal
modal.getModal()

// Ouverture du modal
modal.openModal()

// Fermeture du modal
modal.closeModal()
