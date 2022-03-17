import {makeElement} from './makeElement.js';

const bigPictureSection = document.querySelector('.big-picture');

const addPictureClickHandler = function (picture, photoMock) {
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
    bigPictureSection.querySelector('.social__comments').textContent = '';
    function createComment ({avatar, name, message}) {
      const comment = makeElement('li', 'social__comment');
      const commentImg = makeElement('img', 'social__picture');
      commentImg.src = avatar;
      commentImg.alt = name;
      commentImg.width = 35;
      commentImg.height = 35;

      comment.appendChild(commentImg);
      const commentText = makeElement('p', 'social__text', message);
      comment.appendChild(commentText);
      return comment;
    }

    for (let i = 0; i < photoMock.comments.length; i++) {
      const singleComment = createComment(photoMock.comments[i]);
      bigPictureSection.querySelector('.social__comments').appendChild(singleComment);
    }


    // Закрытие окна по кнопке
    const closeButton = bigPictureSection.querySelector('.big-picture__cancel');
    closeButton.addEventListener('click', () => {
      bigPictureSection.classList.add('hidden');
      document.body.classList.remove('modal-open');
    });

    // Закрытие окна по клавише
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        bigPictureSection.classList.add('hidden');
        document.body.classList.remove('modal-open');
      }

    });

  });
};

export {addPictureClickHandler};
