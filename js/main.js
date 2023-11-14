import { renderPictures } from './pictures.js';
import { getData } from './server.js';
import { showDataErrorMessage } from './util.js';
import { initFilter } from './filter.js';
import './form.js';

const loadPhotos = (data) => {
  renderPictures(data);
  initFilter(data);
};

getData(loadPhotos, showDataErrorMessage);

