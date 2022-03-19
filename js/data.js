import {getRandomNumber} from './util.js';
import {getRandomArrayElement} from './util.js';

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


const comments = [];
// Создание комментариев с одним комментарием
// const createComment = () => {
//   const commentRangeIds = [ ...Array(10000).keys() ].map( (i) => i+1); // массив всех чисел в заданном диапазоне
//   const commentIds = []; // массив случайных неповторяющихся 25 чисел из массива выше


//   for (let i = 0; i < 25; i++) {
//     commentIds[i] = commentRangeIds.splice(getRandomNumber(0, commentRangeIds.length - 1),1)[0];
//   }

//   for (let i = 0; i < 25; i++) {
//     comments[i] = [{
//       id: commentIds[i],
//       avatar: `img/avatar-${  getRandomNumber(1, 6)  }.svg`,
//       message: getRandomArrayElement(MESSAGES),
//       name: getRandomArrayElement(NAMES)
//     }];
//   }
// };


// Создание комментариев с несколькими комментариями
const createComment = () => {
  const commentRangeIds = [ ...Array(10000).keys() ].map( (i) => i+1); // массив всех чисел в заданном диапазоне
  const commentIds = []; // массив куда будем записывать случайные неповторяющиеся числа из массива выше


  for (let i = 0; i < 100; i++) {
    commentIds[i] = commentRangeIds.splice(getRandomNumber(0, commentRangeIds.length - 1),1)[0];
  }
  // Создаем библиотеку случайных комментариев
  const commentsBlock = [];
  for (let i = 0; i < 100; i++) {
    commentsBlock[i] = {
      id: commentIds[i],
      avatar: `img/avatar-${  getRandomNumber(1, 6)  }.svg`,
      message: getRandomArrayElement(MESSAGES),
      name: getRandomArrayElement(NAMES)
    };
  }


  // Создаем 25 блоков комментариев из нескольких комментариев
  for (let i = 0; i <25; i++) {
    comments[i] = commentsBlock.splice(getRandomNumber(0, commentsBlock.length - 1),getRandomNumber(1,4));
  }
};


const photoMocks = [];

const createPhotoDescription = () => {
  createComment();
  for (let i = 0; i < 25; i++ ) {
    photoMocks[i] = {
      id: i + 1 ,
      url: `photos/${  i + 1  }.jpg`,
      description: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomNumber(15, 200),
      comments: comments[i]
    };
  }
};

createPhotoDescription();

const createPhotoMocks = () => photoMocks;

export {createPhotoMocks};
