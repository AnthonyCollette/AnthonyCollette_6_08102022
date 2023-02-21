import { photographerFactory } from '../factories/photographer.js'
import { mediaFactory } from '../factories/medias.js'
import { modalContact } from '../utils/contactForm.js'

// Récupération de l'id du photographe
const id = new URL(document.location.href).searchParams.get('id')

const header = document.getElementById('photograph-header')
const portfolioDiv = document.getElementById('portfolio')
let mediasDisplayed = document.getElementsByClassName(
	'portfolio__article--img-wrapper'
)
const select = document.getElementById('filter-select')

// Récupération des informations du photographe
const data = await fetch('https://anthonycollette.github.io/AnthonyCollette_6_08102022/data/photographers.json')
	.then((res) => res.json())
	.then((arrays) =>
		arrays.photographers.find((photographer) => photographer.id == id)
	)

// Récupération des médias du photographe
let mediasData = await fetch('https://anthonycollette.github.io/AnthonyCollette_6_08102022/data/photographers.json')
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
let index = 0
mediasData.forEach((media) => {
	index += 1
	const medias = mediaFactory(media, data.name)
	const displayMedias = medias.getPortfolio(index)
	portfolioDiv.appendChild(displayMedias)
})

// Modification du tri des médias
select.addEventListener('change', () => {
	// Tri des médias
	let sortedMedias = media.sortMedias(select.value)

	// Remise à zero du portfolio
	portfolioDiv.textContent = ''
	index = 0

	// Affichage des médias
	sortedMedias.forEach((media) => {
		index += 1
		const medias = mediaFactory(media, data.name)
		const displayMedias = medias.getPortfolio(index)
		portfolioDiv.appendChild(displayMedias)
	})

	// Gestion des likes
	media.like()

	// Ouverture du carousel
	media.openCarousel(mediasDisplayed)
	// Fermeture du carousel
	media.closeCarousel(select.value)
})

// Gestion des likes
media.like()

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

// Envoi du formulaire
photographer.sendForm()