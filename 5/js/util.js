const MAX_COMMENT_LENGTH = 140;

function checkLineLength (text, max) {
  return text.length <= max;
}

checkLineLength('Текст', MAX_COMMENT_LENGTH);


function getRandomNumber (min, max) {
  if (min >= 0 && max > min) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  throw new Error('Ошибка. Неправильно заданный диапазон');
}

function getRandomArrayElement (elements) {
  return elements[getRandomNumber(0, elements.length - 1)];
}

export {checkLineLength, getRandomNumber, getRandomArrayElement};
