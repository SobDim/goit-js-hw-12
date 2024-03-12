import iziToast from 'izitoast';

const errorMsg = {
  message:
    'Sorry, there are no images matching  your search query. Please, try again!',
  messageSize: '16',
  messageLineHeight: '24',
  iconUrl: './img/error.svg',
  backgroundColor: 'rgb(239, 64, 64)',
  messageColor: 'rgb(255, 255, 255)',
  titleColor: 'rgb(255, 255, 255)',
  position: 'topRight',
  close: 'rgb(255, 255, 255)',
  maxWidth: '432px',
};

const okMsg = {
  // title: 'Ok',
  iconUrl: './img/ok.svg',
  backgroundColor: 'rgb(89, 161, 13)',
  messageColor: 'rgb(255, 255, 255)',
  titleColor: 'rgb(255, 255, 255)',
  position: 'topRight',
  close: 'rgb(255, 255, 255)',
  messageSize: '16',
  messageLineHeight: '24',
};

const warningMsg = {
  iconUrl: './img/warning.svg',
  backgroundColor: 'rgb(255, 160, 0)',
  messageColor: 'rgb(255, 255, 255)',
  titleColor: 'rgb(255, 255, 255)',
  position: 'topRight',
  close: 'rgb(255, 255, 255)',
  messageSize: '16',
  messageLineHeight: '24',
};

/*=========== Messages=========*/

export function messageEmptyWarning() {
  warningMsg.message = 'You forgot to enter a search query';
  iziToast.warning(warningMsg);
}

export function messageFinishedError() {
  iziToast.error(errorMsg);
}

export function messageFinishedOk(total) {
  okMsg.message = `We found ${total} photos`;
  iziToast.success(okMsg);
}

export function messageOnLastPage(total) {
  warningMsg.message = `We're sorry, but you've reached the end of search of ${total} results`;
  iziToast.warning(warningMsg);
}
/*=========== / Messages=========*/
