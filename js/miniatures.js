import {openPopup} from './popup.js';

const picturesSection = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPicturesList = (photoMocks) => {
  const picturesSectionFragment = document.createDocumentFragment();

  photoMocks.forEach((picture) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    picturesSectionFragment.appendChild(pictureElement);
  });

  picturesSection.appendChild(picturesSectionFragment);

  const pictures = document.querySelectorAll('.picture');

  for (let i = 0; i < pictures.length; i++) {
    openPopup(pictures[i], photoMocks[i]);
  }
};

export {renderPicturesList};
