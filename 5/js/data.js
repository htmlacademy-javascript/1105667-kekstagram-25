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

function createComment () {
  const commentRangeIds = [ ...Array(10000).keys() ].map( (i) => i+1); // массив всех чисел в заданном диапазоне
  const commentIds = []; // массив случайных неповторяющихся 25 чисел из массива выше


  for (let i = 0; i < 25; i++) {
    commentIds[i] = commentRangeIds.splice(getRandomNumber(0, commentRangeIds.length - 1),1)[0];
  }

  for (let i = 0; i < 25; i++) {
    comments[i] = [{
      id: commentIds[i],
      avatar: `img/avatar-${  getRandomNumber(1, 6)  }.svg`,
      message: getRandomArrayElement(MESSAGES),
      name: getRandomArrayElement(NAMES)
    }];
  }
}


const photoMocks = [];

function createPhotoDescription () {
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
}

createPhotoDescription();

function createPhotoMocks () {
  return photoMocks;
}

export {createPhotoMocks};
