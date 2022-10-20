// Mettre le code JavaScript lié à la page photographer.html
const id = new URL(document.location.href).searchParams.get('id');
const desc = document.getElementById('photographer-desc');
const img = document.getElementById('photographer-img');
let photographer = '';

// Recherche du photographe correspondant à l'id de l'URL
const getPhotographer = async (id) => {
	await fetch('../../data/photographers.json').then((res) => res.json())
		.then((data) => {
			photographer = data.photographers.filter(profil => profil.id == id)[0]
			desc.innerHTML += `
				<h1>${photographer.name}</h1>
				<h3>${photographer.city}, ${photographer.country}</h3>
				<p class="tagline">${photographer.tagline}</p>
			`
			img.innerHTML += `
				<img src="assets/photographers/${photographer.portrait}" alt="Photo de ${photographer.name}" />
			` 

			console.log(photographer)
		})
}




getPhotographer(id)