import {isEscapeKey} from './util.js';

const URL = 'https://30.javascript.pages.academy/kekstagram';
const TIME_TO_DELETE_MESSAGE = 5000;

const errorElement = document.querySelector('#data-error').content.querySelector('.data-error');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');

const isResponseOk = (response) => {
  if (!response.ok) {
    throw new Error();
  }
};

const removeMessage = () => {
  document.body.lastChild.remove();
  document.removeEventListener('keydown', onEscapeBtnClick);
};

function onEscapeBtnClick (evt) {
  if (isEscapeKey(evt)) {
    removeMessage();
  }
}

const renderMessage = (element) => {
  const message = element.cloneNode(true);

  message.querySelector('button').addEventListener('click', () => {
    removeMessage();
  });

  message.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('success') || evt.target.classList.contains('error')) {
      removeMessage();
    }
  });

  document.addEventListener('keydown', onEscapeBtnClick);

  document.body.append(message);
};

const getData = () => fetch(`${URL}/data`)
  .then((response) => {
    isResponseOk(response);
    return response.json();
  })
  .catch(() => {
    const message = errorElement.cloneNode(true);
    document.body.append(message);
    setTimeout(() => {
      message.remove();
    }, TIME_TO_DELETE_MESSAGE);
  });

const sendData = (data, onSuccess, escapeFormHandler) => fetch(
  URL,
  {
    method: 'POST',
    body: data
  })
  .then((response) => {
    isResponseOk(response);
    renderMessage(successMessage);
    onSuccess();
  })
  .catch(() => {
    renderMessage(errorMessage);
    document.removeEventListener('keydown', escapeFormHandler);
  });


export { getData, sendData };
