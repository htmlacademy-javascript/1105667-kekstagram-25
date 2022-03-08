import {getRandomNumber} from './get-random-number.js';

function getRandomArrayElement (elements) {
  return elements[getRandomNumber(0, elements.length - 1)];
}

export {getRandomArrayElement};
