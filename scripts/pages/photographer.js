// import { images, getPhotographer, firstName } from '/scripts/utils/getPhotographer.js';
import { sortPortfolio, select } from '/scripts/utils/sortPortfolio.js';
import { carousel } from '../utils/carousel.js';
import { photographerFactory } from '../factories/photographer.js';
import { mediaFactory } from '../factories/medias.js';

const id = new URL(document.location.href).searchParams.get('id');

const header = document.getElementById('photograph-header');
const portfolioDiv = document.getElementById('portfolio');
const data = await fetch('../../data/photographers.json')
  .then((res) => res.json())
  .then((arrays) =>
    arrays.photographers.find((photographer) => photographer.id == id)
  );
const mediasData = await fetch('../../data/photographers.json')
  .then((res) => res.json())
  .then((arrays) => arrays.media.filter((media) => media.photographerId == id));
const photographer = photographerFactory(data);
const infosPhotographer = photographer.getInfosPhotographer();
header.appendChild(infosPhotographer);
mediasData.forEach((media) => {
  const medias = mediaFactory(media, data.name);
  const displayMedias = medias.getPortfolio();
  portfolioDiv.appendChild(displayMedias);
});
select.addEventListener('change', () => {
  carousel(firstName, images);
});
