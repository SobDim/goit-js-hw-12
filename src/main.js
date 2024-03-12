import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getPhotos } from './js/pixabay-api';
import { renderPage, gallery, smoothOnLoad } from './js/render-functions';
import { errorMsg, okMsg, warningMsg } from './js/izi-toast-options';

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

async function onFormSubmit(e) {
  e.preventDefault();
  hideLoadMoreBtn();

  gallery.innerHTML = '';
  page = 1;
  searchQ = e.currentTarget.elements['user-search-q'].value.trim();

  if (!searchQ) return messageEmptyWarning();

  try {
    loaderShow();
    const data = await getPhotos(searchQ, page, perPage);
    if (data.hits.length === 0) return messageFinishedError();

    messageFinishedOk(data.total);
    renderPage(data.hits);

    if (data.total < perPage) {
      hideLoadMoreBtn();
    } else {
      showLoadMoreBtn();
    }

    e.target.reset();
  } catch (error) {
    console.log(error);
  } finally {
    loaderHide();
  }
}
/*======= LoadMore =======*/
async function onloadMoreClick() {
  page += 1;

  try {
    loaderShow();

    const data = await getPhotos(searchQ, page, perPage);

    renderPage(data.hits);
    smoothOnLoad();

    lastPage = Math.ceil(data.total / perPage);
    if (lastPage === page) {
      hideLoadMoreBtn();
      messageOnLastPage(data.total);
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderHide();
  }
}

function showLoadMoreBtn() {
  loadMoreBtn.classList.remove('is-hidden');
}
function hideLoadMoreBtn() {
  loadMoreBtn.classList.add('is-hidden');
}
/*======= / LoadMore =======*/
/*=========== Messages=========*/

function messageEmptyWarning() {
  iziToast.warning(warningMsg);
}

function messageFinishedError() {
  iziToast.error(errorMsg);
}

function messageFinishedOk(total) {
  okMsg.message = `We found ${total} photos`;
  iziToast.success(okMsg);
}

function messageOnLastPage(total) {
  okMsg.message = `It's all ${total} photos`;
  iziToast.success(okMsg);
}

/*=========== /Messages=========*/

/*=========== Loader Spinner=========*/
function loaderShow() {
  loader.classList.remove('is-hidden');
}
function loaderHide() {
  loader.classList.add('is-hidden');
}
/*=========== /Loader Spinner=========*/
