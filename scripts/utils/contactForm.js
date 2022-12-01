export function modalContact(name) {
	const btn = document.getElementById('contact')
	const closeModalBtn = document.getElementById('close-modal-btn')
	const modal = document.getElementById('contact_modal')
	const modalHeader = document.getElementById('modal-header')

	// Affichage des informations du photographe
	function getModal() {
		const title = document.createElement('h2')
		title.textContent = 'Contactez-moi ' + name
		modalHeader.appendChild(title)
	}

	// Ouverture du modal
	function openModal() {
		btn.addEventListener('click', () => {
			modal.classList.add('display-flex')
		})
		return modal
	}

	// Fermeture du modal
	function closeModal() {
		closeModalBtn.addEventListener('click', () => {
			modal.classList.remove('display-flex')
		})

		return modal
	}

	return { getModal, openModal, closeModal }
}
