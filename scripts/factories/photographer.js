export function photographerFactory(data) {
  const { id, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;
  const url = `photographers.html?id=${id}`;
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
    link.setAttribute('src', url);

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(taglinePar);
    article.appendChild(link);

    return article;
  }
  return { name, getUserCardDOM };
}
