import {getRandomNumber, getRandomArrayEl} from './util.js';

const DESCRIPTIONS = [
  'На фотографии изображен пушистый кот с ярко-голубыми глазами. Он сидит на стуле с высокой спинкой, покрытой мягким пледом.',
  'На фотографии изображено озеро в окружении живописного леса. Зеркальная гладь озера отражает проплывающие по небу облака и вершины деревьев, создавая неповторимую атмосферу спокойствия и безмятежности.',
  'На фотографии представлен широкий песчаный пляж с золотистым песком. Линия берега омывается кристально чистой голубой водой, а солнечный свет создает на поверхности воды яркую сверкающую дорожку.',
  'На этой фотографии изображен симфонический оркестр, состоящий из множества музыкантов, каждый из которых играет свою партию на различных инструментах.',
  'На фотографии изображено болото, заросшее густой растительностью. Повсюду видны зеленые мхи, осоки и камыши, образующие непроходимые заросли. ',
  'На фотографии изображены различные виды еды. В центре стола стоит большая тарелка с различными салатами, зеленью и овощами.',
  'На фотографии изображена новая модель автомобиля. Она имеет обтекаемый корпус и большие колеса.'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Артем',
  'Ольга',
  'Матвей',
  'Кирилл',
  'Игорь',
  'Елена',
  'Николай'
];
const PHOTOS_COUNT = 25;
const Comments = {
  MIN: 1,
  MAX: 30
};
const Likes = {
  MIN: 15,
  MAX: 200
};
const Avatars = {
  MIN: 1,
  MAX: 6
};

const createComment = (index) => ({
  id: index,
  avatar: `img/avatar-${getRandomNumber(Avatars.MIN, Avatars.MAX)}.svg`,
  message: getRandomArrayEl(MESSAGES),
  name: getRandomArrayEl(NAMES)
});

const generateComments = (amount) => {
  const comments = [];
  for (let i = 1; i <= amount; i++) {
    comments.push(createComment(i));
  }
  return comments;
};

const createPhoto = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayEl(DESCRIPTIONS),
  likes: getRandomNumber(Likes.MIN, Likes.MAX),
  comments: generateComments(getRandomNumber(Comments.MIN, Comments.MAX))
});

const generatePhotos = () => {
  const photos = [];
  for (let i = 1; i <= PHOTOS_COUNT; i++) {
    photos.push(createPhoto(i));
  }
  return photos;
};

export { generatePhotos };
