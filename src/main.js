import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import VanillaTilt from 'vanilla-tilt';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getPhotos } from './js/pixabay-api';
import { createMarkup } from './js/render-functions';
import { errorMsg, okMsg, warningMsg, hello } from './js/izi-toast-options';

const searchForm = document.querySelector('.js-search-form');
const input = searchForm.querySelector('.js-input');
const loader = document.querySelector('.js-loader');
const gallery = document.querySelector('.js-gallery');

let searchQ;
let pages = 1;

searchForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  loader.classList.remove('is-hidden');
  gallery.innerHTML = '';

  searchQ = e.currentTarget.elements['user-search-q'].value.trim();

  if (!searchQ) return searchEmptyWarning();

  getPhotos(searchQ, pages)
    .then(res => {
      if (res.hits.length === 0) return searchFinishedError();
      searchFinishedOk(res.total);

      gallery.innerHTML = createMarkup(res.hits);

      let galleryList = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
      galleryList.refresh();

      VanillaTilt.init(document.querySelectorAll('.gallery-item'), {
        max: 25,
        speed: 400,
      });
    })
    .catch(console.log);

  e.currentTarget.reset();
}

input.addEventListener('focus', () => {
  input.removeAttribute('placeholder');
});
input.addEventListener('blur', () => {
  input.setAttribute('placeholder', 'Search images...');
});

iziToast.info(hello);

function searchEmptyWarning() {
  loader.classList.add('is-hidden');
  iziToast.warning(warningMsg);
}

function searchFinishedError() {
  loader.classList.add('is-hidden');
  iziToast.error(errorMsg);
}

function searchFinishedOk(total) {
  loader.classList.add('is-hidden');
  okMsg.message = `We found ${total} photos`;
  iziToast.success(okMsg);
}

//     ulEl.innerHTML = createMarkup(res.results);
//     if (res.total < perPage) {
//       loadMoreBtnHide();
//     } else {
//       loadMoreBtnShow();
//     }
//   })
//   .catch(console.log)
//   .finally(() => spinnerStop());

// e.currentTarget.reset();

function imgLoaded(img) {
  var imgWrapper = img.parentNode;

  imgWrapper.className += imgWrapper.className ? ' loaded' : 'loaded';
}
