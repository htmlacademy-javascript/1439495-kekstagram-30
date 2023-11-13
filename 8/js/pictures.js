import {generatePhotos} from './data.js';
import {openFullPhoto} from './full-photo.js';

const pictures = generatePhotos();

const container = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();

const renderPicture = (picture) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__img').alt = picture.description;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.addEventListener('click', () => {
    openFullPhoto(picture);
  });
  return pictureElement;
};

const renderPictures = () => {
  pictures.forEach((picture) => {
    const pictureElement = renderPicture(picture);
    fragment.append(pictureElement);
  });
  container.append(fragment);
};

export {renderPictures};