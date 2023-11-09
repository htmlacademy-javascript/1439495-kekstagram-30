const getRandomNumber = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const getRandomArrayEl = (array) => array[getRandomNumber(0, array.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomNumber, getRandomArrayEl, isEscapeKey};
