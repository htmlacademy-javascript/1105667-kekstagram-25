import {isEscapeKey} from './util.js';
const bigPictureSection = document.querySelector('.big-picture');

const openPopup = (picture, photoMock) => {
  picture.addEventListener('click', () => {
    bigPictureSection.classList.remove('hidden');
    bigPictureSection.querySelector('.big-picture__img').querySelector('img').src = photoMock.url;
    bigPictureSection.querySelector('.likes-count').textContent = photoMock.likes;
    bigPictureSection.querySelector('.comments-count').textContent = photoMock.comments.length;
    bigPictureSection.querySelector('.social__caption').textContent = photoMock.description;
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

    const allCommentsList = bigPictureSection.querySelectorAll('.social__comment');
    const NUMBER_OF_COMMENTS_TO_LOAD = 5;
    const numberOfCommentsLoaded = bigPictureSection.querySelector('.comments-count');

    const clearNumberOfCommentsLoaded = () => {
      bigPictureSection.querySelector('.social__comment-count').innerHTML = '';
      bigPictureSection.querySelector('.social__comment-count').append(numberOfCommentsLoaded);
      bigPictureSection.querySelector('.social__comment-count').append(' комментариев');
    };

    clearNumberOfCommentsLoaded();
    bigPictureSection.querySelector('.social__comment-count').prepend(`${NUMBER_OF_COMMENTS_TO_LOAD  } из `);


    if (allCommentsList.length >= NUMBER_OF_COMMENTS_TO_LOAD) {

      // Скрываем комментарии начиная с Nго

      for (let i = NUMBER_OF_COMMENTS_TO_LOAD; i < allCommentsList.length; i++) {
        allCommentsList[i].classList.add('hidden');
      }

      // Вычисляем число групп по N и остаток

      const numberOfGroupOfN = Math.floor(allCommentsList.length / NUMBER_OF_COMMENTS_TO_LOAD);
      const numberOfLastGroup = allCommentsList.length % NUMBER_OF_COMMENTS_TO_LOAD;

      //
      let k = 2;

      bigPictureSection.querySelector('.social__comments-loader').addEventListener('click', () => {
        if (k <= numberOfGroupOfN) {
          for (let i = (k-1)*NUMBER_OF_COMMENTS_TO_LOAD; i < k*NUMBER_OF_COMMENTS_TO_LOAD; i++) {
            allCommentsList[i].classList.remove('hidden');
          }

          clearNumberOfCommentsLoaded();
          bigPictureSection.querySelector('.social__comment-count').prepend(`${k*NUMBER_OF_COMMENTS_TO_LOAD  } из `);

          k += 1;

        } else {

          for (let i = (k-1)*NUMBER_OF_COMMENTS_TO_LOAD; i < (k-1)*NUMBER_OF_COMMENTS_TO_LOAD + numberOfLastGroup; i++) {
            allCommentsList[i].classList.remove('hidden');

            clearNumberOfCommentsLoaded();
            bigPictureSection.querySelector('.social__comment-count').prepend(`${(k-1)*NUMBER_OF_COMMENTS_TO_LOAD + numberOfLastGroup   } из `);
          }
        }
      });
    } else {
      clearNumberOfCommentsLoaded();
      bigPictureSection.querySelector('.social__comment-count').prepend(`${allCommentsList.length  } из `);
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
