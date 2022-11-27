import { select } from '/scripts/utils/sortPortfolio.js';
import { carousel } from '../utils/carousel.js';
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
const mediasData = await fetch('../../data/photographers.json')
  .then((res) => res.json())
  .then((arrays) => arrays.media.filter((media) => media.photographerId == id));

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

select.addEventListener('change', () => {
  const mediasArray = mediaFactory(mediasData);

  // Tri des médias
  const sortPortfolio = mediasArray.sortMedias(select.value);

  // Remise à zero du portfolio
  portfolioDiv.textContent = '';

  // Affichage des médias
  sortPortfolio.forEach((media) => {
    const medias = mediaFactory(media, data.name);
    const displayMedias = medias.getPortfolio();
    portfolioDiv.appendChild(displayMedias);
  });
});
