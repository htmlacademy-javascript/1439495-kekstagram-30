import {renderPictures} from './pictures.js';
import './form.js';
import { getData } from './server.js';
import {showDataErrorMessage} from './util.js';

let photos = [];

const loadPhotos = (data) => {
  photos = data.slice();
  renderPictures(photos);
};

getData(loadPhotos, showDataErrorMessage);

