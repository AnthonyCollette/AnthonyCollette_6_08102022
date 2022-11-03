const btn = document.getElementById('contact')
const closeModalBtn = document.getElementById('close-modal-btn')
const modal = document.getElementById("contact_modal")

// Ouverture du modal
btn.addEventListener('click', () => {
    modal.classList.add("display-flex")
})


// Fermeture du modal
closeModalBtn.addEventListener('click', () => {
    modal.classList.remove("display-flex")
})

