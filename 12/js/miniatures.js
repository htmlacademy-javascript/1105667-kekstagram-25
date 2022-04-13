import {openPopup} from './popup.js';
import {getRandomArrayElement} from './util.js';

const picturesSection = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
// Фильтры
const filterSection = document.querySelector('.img-filters');


const renderPicturesList = (photos) => {

  const picturesToRemove = picturesSection.querySelectorAll('.picture');
  for (let i = 0; i < picturesToRemove.length; i++) {
    picturesToRemove[i].remove();
  }

  const picturesSectionFragment = document.createDocumentFragment();

  photos.forEach((picture) => {
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
    openPopup(pictures[i], photos[i]);
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

const drawPictures = (evt, pictures) => {
  const targetBtn = evt.target;
  let picturesToShow = pictures;
  if (targetBtn.id === 'filter-random') {
    picturesToShow = getRandomPictures(pictures);
  }
  if (targetBtn.id === 'filter-discussed') {
    const discussedPictures = pictures.slice();
    discussedPictures.sort((pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length);
    picturesToShow = discussedPictures;
  }
  renderPicturesList(picturesToShow);
};

const setFiltersClick = (cb) => {
  document.querySelector('.img-filters__form').addEventListener('click', (evt) => {
    const targetBtn = evt.target;
    const activeBtn = document.querySelector('.img-filters__button--active');
    if (targetBtn !== activeBtn) {
      activeBtn.classList.remove('img-filters__button--active');
      targetBtn.classList.add('img-filters__button--active');

      cb(evt);
    }
  });
};

export {renderPicturesList, drawPictures, setFiltersClick};
