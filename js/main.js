import {renderPictures} from './pictures.js';
import './form.js';
import { getData } from './server.js';

const TIME_TO_DELETE_MESSAGE = 5000;

let photos = [];

const loadPhotos = (data) => {
  photos = data.slice();
  renderPictures(photos);
};

const showErrorMessage = () => {
  const message = document.querySelector('#data-error').content.querySelector('.data-error').cloneNode(true);
  document.body.append(message);
  setTimeout(() => {
    message.remove();
  }, TIME_TO_DELETE_MESSAGE);
};

getData(loadPhotos, showErrorMessage);

