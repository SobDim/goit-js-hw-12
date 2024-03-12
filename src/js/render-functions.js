import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import VanillaTilt from 'vanilla-tilt';
import lazySizes from 'lazysizes';

let galleryList = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export const gallery = document.querySelector('.js-gallery');

export function renderPage(arr) {
  gallery.insertAdjacentHTML('beforeend', createMarkup(arr));

  galleryList.refresh();

  VanillaTilt.init(document.querySelectorAll('.gallery-item'), {
    max: 25,
    speed: 400,
  });
}

function createMarkup(arr) {
  return arr
    .map(arr => {
      const {
        webformatURL,
        tags,
        largeImageURL,
        previewURL,

        likes,
        views,
        comments,
        downloads,
      } = arr;
      return ` <li class="gallery-item blurred-img" data-tilt> 
              <a class="gallery-link " href="${largeImageURL}">
              <img  
                class="gallery-image lazyload"
                data-src="${webformatURL}"
                src="${previewURL}"
                alt="${tags}"
              />
            </a>
              <ul class="property-list">
    <li class="list-property-item"><strong>Likes</strong> <br> ${likes}</li>
    <li class="list-property-item"><strong>Views</strong> <br> ${views}</li>
    <li class="list-property-item"><strong>Comments</strong> <br> ${comments}</li>
    <li class="list-property-item"><strong>Downloads</strong> <br> ${downloads}</li>
  </ul>
          </li>`;
    })
    .join('');
}

export function smoothOnLoad() {
  let galleryImg = gallery.querySelector('.gallery-item');
  let rect = galleryImg.getBoundingClientRect();

  window.scrollBy({
    top: rect.height * 2,
    behavior: 'smooth',
  });
}
