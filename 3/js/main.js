// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomNumber (min, max) {
  if (min >= 0 && max > min) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  throw new Error('Ошибка. Неправильно заданный диапазон');
}

getRandomNumber(0, 3);


const MAX_COMMENT_LENGTH = 140;

function checkLineLength (text, max) {
  return text.length <= max;
}

checkLineLength('Текст', MAX_COMMENT_LENGTH);

const DESCRIPTIONS = [
  'Вау!',
  'Делюсь с вами',
  'Всем привет',
  'Очень красиво'
];

const NAMES = [
  'Алексей',
  'Марина',
  'Санёк',
  'Иван',
  'Ибрагим'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

function getRandomArrayElement (elements) {
  return elements[getRandomNumber(0, elements.length - 1)];
}

const COMMENT = [];

function createComment () {
  const COMMENT_RANGE_INDEX = []; // массив всех числе в заданном диапазоне
  const COMMENT_INDEX = []; // массив случайных неповторяющихся 25 чисел из массива выше


  for (let i = 1; i <= 10000; i++) {
    COMMENT_RANGE_INDEX.push(i);
  }

  for (let i = 0; i < 25; i++) {
    COMMENT_INDEX[i] = COMMENT_RANGE_INDEX.splice(getRandomNumber(0, COMMENT_RANGE_INDEX.length - 1),1);
  }

  for (let i = 0; i < 25; i++) {
    COMMENT[i] = {
      id: Number(COMMENT_INDEX[i]),
      avatar: `img/avatar-${  getRandomNumber(1, 6)  }.svg`,
      message: getRandomArrayElement (MESSAGES),
      name: getRandomArrayElement (NAMES)
    };
  }
}


const PHOTO = [];

function createPhotoDescription () {
  createComment ();
  for (let i = 0; i < 25; i++ ) {
    PHOTO[i] = {
      id: i + 1 ,
      url: `photos/${  i + 1  }.jpg`,
      description: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomNumber(15, 200),
      comments: COMMENT[i]
    };
  }
}

createPhotoDescription ();
