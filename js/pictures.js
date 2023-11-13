import {openFullPhoto} from './full-photo.js';

const container = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPicture = (picture) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__img').alt = picture.description;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openFullPhoto(picture);
  });
  return pictureElement;
};

const clearPicturesContainer = () => {
  container.querySelectorAll('a.picture').forEach((item) => {
    item.remove();
  });
};

const renderPictures = (pictures) => {
  clearPicturesContainer();

  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const pictureElement = renderPicture(picture);
    fragment.append(pictureElement);
  });
  container.append(fragment);
};

export {renderPictures};
