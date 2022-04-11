import {openPopup} from './popup.js';
import {getData} from './api.js';
import {debounce, getRandomArrayElement} from './util.js';

const picturesSection = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
// Фильтры и кнопки
const filterSection = document.querySelector('.img-filters');
const randomButton = filterSection.querySelector('#filter-random');
const discussedButton = filterSection.querySelector('#filter-discussed');
const defaultButton = filterSection.querySelector('#filter-default');

const renderPicturesList = (photoMocks) => {

  const picturesToRemove = picturesSection.querySelectorAll('.picture');
  for (let i = 0; i < picturesToRemove.length; i++) {
    picturesToRemove[i].remove();
  }

  const picturesSectionFragment = document.createDocumentFragment();

  photoMocks.forEach((picture) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    picturesSectionFragment.appendChild(pictureElement);
  });

  picturesSection.appendChild(picturesSectionFragment);

  filterSection.classList.remove('img-filters--inactive');

  const pictures = document.querySelectorAll('.picture');

  for (let i = 0; i < pictures.length; i++) {
    openPopup(pictures[i], photoMocks[i]);
  }
};

// массив 10 случайных фотографий
const getRandomPictures = (pictures) => {
  const picturesRandom = [];

  for (let i = 0; i < 10; i++) {
    let randomElement = getRandomArrayElement(pictures);

    while (picturesRandom.includes(randomElement)) {
      randomElement = getRandomArrayElement(pictures);
    }
    picturesRandom.push(randomElement);
  }
  return picturesRandom;
};

const RERENDER_DELAY = 500;

randomButton.addEventListener('click', debounce(() => {
  randomButton.classList.add('img-filters__button--active');
  defaultButton.classList.remove('img-filters__button--active');
  discussedButton.classList.remove('img-filters__button--active');

  getData((pictures) => {
    const randomPictures = getRandomPictures(pictures);
    renderPicturesList(randomPictures);
  });
},RERENDER_DELAY));

defaultButton.addEventListener('click', debounce(() => {
  defaultButton.classList.add('img-filters__button--active');
  randomButton.classList.remove('img-filters__button--active');
  discussedButton.classList.remove('img-filters__button--active');

  getData((pictures) => {
    renderPicturesList(pictures);
  });
},RERENDER_DELAY));

discussedButton.addEventListener('click', debounce(() => {
  discussedButton.classList.add('img-filters__button--active');
  randomButton.classList.remove('img-filters__button--active');
  defaultButton.classList.remove('img-filters__button--active');

  getData((pictures) => {
    const discussedPictures = pictures.slice();
    discussedPictures.sort((pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length);
    renderPicturesList(discussedPictures);
  });
}, RERENDER_DELAY));

export {renderPicturesList};
