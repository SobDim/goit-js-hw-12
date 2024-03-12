import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getPhotos } from './js/pixabay-api';
import { renderPage, gallery } from './js/render-functions';
import { errorMsg, okMsg, warningMsg, hello } from './js/izi-toast-options';

const searchForm = document.querySelector('.js-search-form');
const input = searchForm.querySelector('.js-input');
const loader = document.querySelector('.js-loader');
const loadMoreBtn = document.querySelector('.js-load-more');

let searchQ;
let perPage = 15;
let page = 1;
let lastPage;

searchForm.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onloadMoreClick);

input.addEventListener('focus', () => {
  input.removeAttribute('placeholder');
});
input.addEventListener('blur', () => {
  input.setAttribute('placeholder', 'Search images...');
});

// document.addEventListener('DOMContentLoaded', renderPage); ??????

async function onFormSubmit(e) {
  e.preventDefault();

  loader.classList.remove('is-hidden');
  gallery.innerHTML = '';

  searchQ = e.currentTarget.elements['user-search-q'].value.trim();

  if (!searchQ) return searchEmptyWarning();

  try {
    const data = await getPhotos(searchQ, page, perPage);
    if (data.hits.length === 0) return searchFinishedError();
    searchFinishedOk(data.total);

    renderPage();

    lastPage = Math.ceil(data.total / perPage);

    showLoadMoreBtn();

    searchForm.reset();
  } catch (error) {
    console.log(error);
  }
}

function onloadMoreClick() {
  page += 1;
  if (lastPage === page) {
    hideLoadMoreBtn();
    iziToast.info(hello);
  }
}

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

function showLoadMoreBtn() {
  loadMoreBtn.classList.remove('is-hidden');
}
function hideLoadMoreBtn() {
  loadMoreBtn.classList.add('is-hidden');
}

// iziToast.info(hello);

//     ulEl.innerHTML = createMarkup(res.results);
//     if (res.total < perPage) {
//       loadMoreBtnHide();
//     } else {
//       loadMoreBtnShow();
//     }
//   })
//   .catch(console.log)
//   .finally(() => spinnerStop());
