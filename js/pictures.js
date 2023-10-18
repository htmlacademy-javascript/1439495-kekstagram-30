import {generatePhotos} from './data.js';

const pictures = generatePhotos();

const container = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();

const renderPictures = () => {
  pictures.forEach(({url, description, likes, comments}) => {
    const picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__img').alt = description;
    picture.querySelector('.picture__likes').textContent = likes;
    picture.querySelector('.picture__comments').textContent = comments.length;
    fragment.append(picture);
  });
  container.append(fragment);
};

export {renderPictures};
