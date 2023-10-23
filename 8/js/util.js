const getRandomNumber = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const getRandomArrayEl = (array) => array[getRandomNumber(0, array.length - 1)];

export {getRandomNumber, getRandomArrayEl};
