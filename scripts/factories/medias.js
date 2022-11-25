export function mediaFactory(data, name) {
  const { image, video, likes, price, title } = data;
  const firstName = name.substring(0, name.indexOf(' '));
  firstName.includes('-') ? (firstName = firstName.replace('-', ' ')) : '';
  const imageSrc = `assets/images/${firstName}/${image}`;
  const videoSrc = `assets/images/${firstName}/${video}`;

  function getPortfolio() {
    // Création des éléments
    const mediaArticle = document.createElement('div');
    const imgWrapper = document.createElement('div');
    const imgPortfolio = document.createElement('img');
    const videoPortfolio = document.createElement('video');
    const videoFile = document.createElement('source');
    const descDiv = document.createElement('div');
    const h5 = document.createElement('h5');
    const p = document.createElement('p');

    // Modification des éléments
    h5.textContent = title;
    p.innerHTML = likes + '<i class="fa-solid fa-heart"></i>';

    // Ajout des classes
    mediaArticle.classList.add('portfolio__article');
    imgWrapper.classList.add('portfolio__article--img-wrapper');
    descDiv.classList.add('portfolio__article--text');
    p.classList.add('likes');
    // Modification des attributs
    videoPortfolio.setAttribute('controls', true);

    // Ajout des éléments
    mediaArticle.appendChild(imgWrapper);
    mediaArticle.appendChild(descDiv);
    descDiv.appendChild(h5);
    descDiv.appendChild(p);

    videoPortfolio.appendChild(videoFile);

    // Affichage des images
    if (image) {
      imgPortfolio.setAttribute('src', imageSrc);
      imgWrapper.appendChild(imgPortfolio);
    }
    // Affichage des vidéos
    if (video) {
      videoFile.setAttribute('src', videoSrc);
      imgWrapper.appendChild(videoPortfolio);
    }

    return mediaArticle;
  }

  return { getPortfolio };
}
