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

const getRandomNumber = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const getRandomArrayEl = (array) => array[getRandomNumber(0, array.length - 1)];

const createUnicNumber = (min, max) => {
  const previousNumbers = [];

  return () => {
    let currentNumber = getRandomNumber(min, max);
    while (previousNumbers.includes(currentNumber)) {
      currentNumber = getRandomNumber(min, max);
    }
    previousNumbers.push(currentNumber);
    return currentNumber;
  };
};

const generatePhotoId = createUnicNumber(1, 25);
const generateUrlNumber = createUnicNumber(1, 25);
const generateCommentId = createUnicNumber(1, 999);

const generateComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  message: getRandomArrayEl(MESSAGES),
  name: getRandomArrayEl(NAMES)
});

const generatePhotoObj = () => ({
  id: generatePhotoId(),
  url: `photos/${generateUrlNumber()}.jpg`,
  description: getRandomArrayEl(DESCRIPTIONS),
  likes: getRandomNumber(15, 200),
  comments: Array.from({length: getRandomNumber(0, 30)}, generateComment)
});

const photos = Array.from({length: 25}, generatePhotoObj);

export { photos };
