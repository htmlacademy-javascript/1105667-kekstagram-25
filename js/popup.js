import {isEscapeKey} from './util.js';
const NUMBER_OF_COMMENTS_TO_LOAD = 5;
const bigPictureSection = document.querySelector('.big-picture');

const updateNumberOfCommentsLoaded = (totalCommentsElement, loadedCommentsElement) => {
  bigPictureSection.querySelector('.social__comment-count').innerHTML = '';
  bigPictureSection.querySelector('.social__comment-count').append(totalCommentsElement);
  bigPictureSection.querySelector('.social__comment-count').append(' комментариев');
  bigPictureSection.querySelector('.social__comment-count').prepend(`${loadedCommentsElement } из `);
};

const openPopup = (picture, pictureData) => {
  picture.addEventListener('click', () => {
    bigPictureSection.classList.remove('hidden');
    bigPictureSection.querySelector('.big-picture__img').querySelector('img').src = pictureData.url;
    bigPictureSection.querySelector('.likes-count').textContent = pictureData.likes;
    bigPictureSection.querySelector('.comments-count').textContent = pictureData.comments.length;
    bigPictureSection.querySelector('.social__caption').textContent = pictureData.description;
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

    for (let i = 0; i < pictureData.comments.length; i++) {
      const singleComment = createComment(pictureData.comments[i]);
      bigPictureSection.querySelector('.social__comments').appendChild(singleComment);
    }

    const commentsList = bigPictureSection.querySelectorAll('.social__comment');
    const numberOfCommentsLoaded = bigPictureSection.querySelector('.comments-count');


    updateNumberOfCommentsLoaded(numberOfCommentsLoaded, NUMBER_OF_COMMENTS_TO_LOAD);


    // Вычисляем число групп по N и остаток

    const numberOfGroupOfN = Math.floor(commentsList.length / NUMBER_OF_COMMENTS_TO_LOAD);
    const numberOfLastGroup = commentsList.length % NUMBER_OF_COMMENTS_TO_LOAD;
    let k = 2;


    const addMoreComments = () => {
      if (k <= numberOfGroupOfN) {
        for (let i = (k-1)*NUMBER_OF_COMMENTS_TO_LOAD; i < k*NUMBER_OF_COMMENTS_TO_LOAD; i++) {
          commentsList[i].classList.remove('hidden');
        }

        updateNumberOfCommentsLoaded(numberOfCommentsLoaded, k*NUMBER_OF_COMMENTS_TO_LOAD);

        if (k === numberOfGroupOfN && numberOfLastGroup === 0 ) {
          bigPictureSection.querySelector('.social__comments-loader').classList.add('hidden');
          bigPictureSection.querySelector('.social__comments-loader').removeEventListener('click', onLoadButtonClick);
        }


        k += 1;

      } else {

        for (let i = (k-1)*NUMBER_OF_COMMENTS_TO_LOAD; i < (k-1)*NUMBER_OF_COMMENTS_TO_LOAD + numberOfLastGroup; i++) {
          commentsList[i].classList.remove('hidden');
        }
        updateNumberOfCommentsLoaded(numberOfCommentsLoaded, (k-1)*NUMBER_OF_COMMENTS_TO_LOAD + numberOfLastGroup);

        bigPictureSection.querySelector('.social__comments-loader').classList.add('hidden');
        bigPictureSection.querySelector('.social__comments-loader').removeEventListener('click', onLoadButtonClick);
      }
    };


    if (commentsList.length >= NUMBER_OF_COMMENTS_TO_LOAD) {

      // Скрываем комментарии начиная с Nго
      for (let i = NUMBER_OF_COMMENTS_TO_LOAD; i < commentsList.length; i++) {
        commentsList[i].classList.add('hidden');
      }

      bigPictureSection.querySelector('.social__comments-loader').addEventListener('click', onLoadButtonClick);
    } else {
      updateNumberOfCommentsLoaded(numberOfCommentsLoaded, commentsList.length);

      bigPictureSection.querySelector('.social__comments-loader').classList.add('hidden');
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
      closeButton.removeEventListener('click', onCloseButtonClick);
      document.removeEventListener('keydown', onPopupEscKeydown);
      bigPictureSection.querySelector('.social__comments-loader').removeEventListener('click', onLoadButtonClick);
      bigPictureSection.querySelector('.social__comments-loader').classList.remove('hidden');
    }


    closeButton.addEventListener('click', onCloseButtonClick);
    document.addEventListener('keydown', onPopupEscKeydown);

    function onCloseButtonClick () {
      closePopup();
    }

    function onLoadButtonClick () {
      addMoreComments();
    }
  });
};


export {openPopup};
