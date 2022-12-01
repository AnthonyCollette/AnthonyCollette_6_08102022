export function photographerFactory(data, mediasData) {
  const { id, portrait, city, country, tagline } = data;

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
    const h2 = document.createElement('h2');
    const paragraphDesc = document.createElement('p');

    h1.textContent = name();
    img.setAttribute('src', picture);
    h2.textContent = city + ', ' + country;
    paragraphDesc.textContent = tagline;

    const descDiv = document.getElementById('photographer-desc');
    descDiv.appendChild(h1);
    descDiv.appendChild(h2);
    descDiv.appendChild(paragraphDesc);

    const imgDiv = document.getElementById('photographer-img');
    imgDiv.appendChild(img);

    return descDiv, imgDiv;
  }

  function createRedBox() {
    const redBox = document.getElementById('redbox');
    let totalOfLikes = 0;

    const likesDiv = document.createElement('p');
    const tarif = document.createElement('p');

    // Addition des likes totaux
    mediasData.forEach((media) => {
      totalOfLikes += media.likes;
    });

    likesDiv.innerHTML = totalOfLikes + ' <i class="fa-solid fa-heart"></i>';
    tarif.textContent = data.price + '€/jour';

    redBox.appendChild(likesDiv);
    redBox.appendChild(tarif);

    return redBox;
  }

  return { name, getUserCardDOM, getInfosPhotographer, createRedBox };
}
