export function photographerFactory(data) {
  const { id, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;
  const url = `photographer.html?id=${id}`;
  function name() {
    return data.name;
  }

  function getUserCardDOM() {
    const article = document.createElement('article');
    const img = document.createElement('img');
    const h2 = document.createElement('h2');
    const taglinePar = document.createElement('p');
    const link = document.createElement('a');

    img.setAttribute('src', picture);
    h2.textContent = name();
    taglinePar.textContent = tagline;
    taglinePar.classList.add('tagline');
    link.setAttribute('href', url);

    article.appendChild(link);

    link.appendChild(img);
    link.appendChild(h2);
    link.appendChild(taglinePar);

    return article;
  }
  function getInfosPhotographer() {
    const h1 = document.createElement('h1');
    const img = document.createElement('img');
    
    h1.textContent = name();
    img.setAttribute('src', picture);


    const descDiv = document.getElementById('photographer-desc')
    descDiv.appendChild(h1);

    const imgDiv = document.getElementById('photographer-img')
    imgDiv.appendChild(img);

    return descDiv, imgDiv;
  }

  return { name, getUserCardDOM, getInfosPhotographer };
}
