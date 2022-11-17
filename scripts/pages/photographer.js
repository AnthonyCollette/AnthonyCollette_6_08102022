// import { images, getPhotographer, firstName } from '/scripts/utils/getPhotographer.js';
import { sortPortfolio, select } from '/scripts/utils/sortPortfolio.js';
import { carousel } from '../utils/carousel.js';
import { photographerFactory } from '../factories/photographer.js';

const id = new URL(document.location.href).searchParams.get('id');


// getPhotographer(id).then(() => {
//     sortPortfolio(images, firstName)
//     carousel(firstName, images)
// })
const header = document.getElementById('photograph-header')
const data = await fetch('../../data/photographers.json').then(res =>res.json()).then(arrays => arrays.photographers.find(photographer => photographer.id == id))
const photographer = photographerFactory(data)
const infosPhotographer = photographer.getInfosPhotographer()
header.appendChild(infosPhotographer);


select.addEventListener('change', () => {
    carousel(firstName, images)
})