import {isEscapeKey} from './util.js';
const bigPictureSection = document.querySelector('.big-picture');

const openPopup = (picture, photoMock) => {
  picture.addEventListener('click', () => {
    bigPictureSection.classList.remove('hidden');
    bigPictureSection.querySelector('.big-picture__img').querySelector('img').src = photoMock.url;
    bigPictureSection.querySelector('.likes-count').textContent = photoMock.likes;
    bigPictureSection.querySelector('.comments-count').textContent = photoMock.comments.length;
    bigPictureSection.querySelector('.social__caption').textContent = photoMock.description;
    bigPictureSection.querySelector('.social__comment-count').classList.add('hidden');
    bigPictureSection.querySelector('.comments-loader').classList.add('hidden');
    document.body.classList.add('modal-open');

    // Вставка комментариев
    const commentElement = bigPictureSection.querySelector('.social__comment');
    bigPictureSection.querySelector('.social__comments').textContent = '';
    const createComment = ({avatar, name, message}) => {
      const comment = commentElement.cloneNode(true);
      const commentImg = comment.querySelector('.social__picture');
      commentImg.src = avatar;
      commentImg.alt = name;
      comment.querySelector('.social__text').textContent = message;
      return comment;
    };

    for (let i = 0; i < photoMock.comments.length; i++) {
      const singleComment = createComment(photoMock.comments[i]);
      bigPictureSection.querySelector('.social__comments').appendChild(singleComment);
    }

    const closeButton = bigPictureSection.querySelector('.big-picture__cancel');

    const onPopupEscKeydown = (evt) => {
      if (isEscapeKey(evt)) {
        closePopup();
      }
    };

    // Закрытие окна по кнопке
    function closePopup () {
      bigPictureSection.classList.add('hidden');
      document.body.classList.remove('modal-open');
      closeButton.removeEventListener('click', closePopup);
      document.removeEventListener('keydown', onPopupEscKeydown);
    }


    closeButton.addEventListener('click', closePopup);


    document.addEventListener('keydown', onPopupEscKeydown);


  });
};

export {openPopup};
