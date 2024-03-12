import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import VanillaTilt from 'vanilla-tilt';

let galleryList = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// document.addEventListener('DOMContentLoaded', renderPage);

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
        likes,
        views,
        comments,
        downloads,
      } = arr;
      return ` <li class="gallery-item" data-tilt> 
              <a class="gallery-link" href="${largeImageURL}">
              <img  
                loading="lazy"
                class="gallery-image"
                src="${webformatURL}"
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
