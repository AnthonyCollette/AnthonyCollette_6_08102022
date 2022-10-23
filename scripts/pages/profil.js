import { images, getPhotographer, firstName } from '/scripts/utils/getPhotographer.js';
import { sortPortfolio } from '/scripts/utils/sortPortfolio.js';
import { carousel } from '../utils/carousel.js';
import { select } from '../utils/sortPortfolio.js';

const id = new URL(document.location.href).searchParams.get('id');


getPhotographer(id).then(() => {
    sortPortfolio(images, firstName)
    carousel(firstName, images)
})

select.addEventListener('change', () => {
    carousel(firstName, images)
})

