import { renderPictures } from './pictures.js';
import { getRandomArrayEl, debounce } from './util.js';

const RANDOM_PHOTOS_LENGTH = 10;
const DELAY = 500;

const filterContainer = document.querySelector('.img-filters');
const filter = filterContainer.querySelector('.img-filters__form');

let photos = [];

const getRandomPhotos = (data) => {
  const randomPhotos = new Set();
  while (randomPhotos.size < RANDOM_PHOTOS_LENGTH) {
    randomPhotos.add(getRandomArrayEl(data));
  }
  return randomPhotos;
};

const getDiscussedPhotos = (data) => {
  const sortPhotos = data.slice().sort((first, second) => second.comments.length - first.comments.length);
  return sortPhotos;
};

const setFilter = (cb) => {
  filter.addEventListener('click', (evt) => {
    let newPhotos = photos.slice();
    filter.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    if (evt.target.id.includes('random')) {
      newPhotos = getRandomPhotos(photos);
    }
    if (evt.target.id.includes('discussed')) {
      newPhotos = getDiscussedPhotos(photos);
    }
    cb(newPhotos);
  });
};

const initFilter = (data) => {
  photos = data.slice();
  filterContainer.classList.remove('img-filters--inactive');
  setFilter(debounce(renderPictures, DELAY));
};

export {initFilter};
