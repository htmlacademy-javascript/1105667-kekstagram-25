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

    // Закрытие окна по кнопке
    const closePopup = () => {
      bigPictureSection.classList.add('hidden');
      document.body.classList.remove('modal-open');
    };

    const closeButton = bigPictureSection.querySelector('.big-picture__cancel');

    closeButton.addEventListener('click', closePopup);

    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        closePopup();
      }
    });


  });
};

export {openPopup};
