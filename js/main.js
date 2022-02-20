// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
let getRandomNumber = function (min, max) {
  if (min >=0 && max>min) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return 'Ошибка. Неправильно заданный диапазон';
};

getRandomNumber(0,3);


const MAX_COMMENT_LENGTH = 140;

let checkLineLength = function (text, max) {
  if  (text.length <= max) {
    return true;
  }

  return false;
};

checkLineLength('Текст', MAX_COMMENT_LENGTH);

