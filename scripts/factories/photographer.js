function photographerFactory(data) {
	const { name, portrait, city, country, tagline, price, id } = data
	const picture = `assets/photographers/${portrait}`

	function getUserCardDOM() {
		const article = document.createElement('article')
		const img = document.createElement('img')
		img.setAttribute('src', picture)
		// const h2 = document.createElement('h2')
		// h2.textContent = name
		// const location = city + ', ' + country
		// const textLocation = document.createElement('p')
		// textLocation.textContent = location
		// const slogan = document.createElement('p')
		// slogan.textContent = tagline
		// const tarif = document.createElement('p')
		// tarif.textContent = `${price}€/jour`
		// const link = document.createElement('a')
		const photographerUrl = new URL('photographer.html', window.location.href)
		photographerUrl.searchParams.append('id', id)
		// article.appendChild(link)
		// link.appendChild(img)
		// link.appendChild(h2)
		// link.appendChild(textLocation)
		// link.appendChild(slogan)
		// link.appendChild(tarif)

		article.innerHTML = `
		<a href="${photographerUrl}" alt="Lien vers le profil de ${name}">
			<img src="${picture}" alt="Photo de ${name}" />
			<h2>${name}</h2>
			<p class="location">${city}, ${country}</p>
			<p class="tagline">${tagline}</p>
			<p class="tarif">${price}€/jour</p>
		</a>
		`
		return article
	}
	return { name, picture, getUserCardDOM }
}
