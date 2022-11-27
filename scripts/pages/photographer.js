import { photographerFactory } from '../factories/photographer.js';
import { mediaFactory } from '../factories/medias.js';

// Récupération de l'id du photographe
const id = new URL(document.location.href).searchParams.get('id');

const header = document.getElementById('photograph-header');
const portfolioDiv = document.getElementById('portfolio');

// Récupération des informations du photographe
const data = await fetch('../../data/photographers.json')
  .then((res) => res.json())
  .then((arrays) =>
    arrays.photographers.find((photographer) => photographer.id == id)
  );

// Récupération des médias du photographe
let mediasData = await fetch('../../data/photographers.json')
  .then((res) => res.json())
  .then((arrays) => arrays.media.filter((media) => media.photographerId == id));

const media = mediaFactory(mediasData);

// Affichage du header
const photographer = photographerFactory(data, mediasData);
const infosPhotographer = photographer.getInfosPhotographer();

// Affichage du bloc rouge
const displayRedBox = photographer.createRedBox();
header.appendChild(infosPhotographer);

// Affichage du portfolio
mediasData.forEach((media) => {
  const medias = mediaFactory(media, data.name);
  const displayMedias = medias.getPortfolio();
  portfolioDiv.appendChild(displayMedias);
});

// Modification du tri des médias
const select = document.getElementById('filter-select');
select.addEventListener('change', () => {
  const mediasArray = mediaFactory(mediasData);

  // Tri des médias
  mediasData = mediasArray.sortMedias(select.value);

  // Remise à zero du portfolio
  portfolioDiv.textContent = '';

  // Affichage des médias
  mediasData.forEach((media) => {
    const medias = mediaFactory(media, data.name);
    const displayMedias = medias.getPortfolio();
    portfolioDiv.appendChild(displayMedias);
  });
});

// Affichage du carousel
const mediasDisplayed = document.getElementsByClassName('portfolio__article');

for (let i = 0; i < mediasDisplayed.length; i++) {
  const media = mediaFactory(mediasData, data.name);
  mediasDisplayed[i].addEventListener('click', () => {
    media.openCarousel(i);
  });
}

// Fermeture du carousel
media.closeCarousel();
