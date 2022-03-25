import {isEscapeKey, checkLineLength} from './util.js';
const uploadForm = document.querySelector('#upload-select-image');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadFormCloseElement = uploadForm.querySelector('#upload-cancel');
const scale = uploadForm.querySelector('.scale__control--value');
const hashtagsInput = uploadForm.querySelector('[name="hashtags"]');
const descriptionInput = uploadForm.querySelector('[name="description"]');

const onUploadFormEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeUploadForm();
  }
};

const addEventListenerOnDocument = () => {
  document.addEventListener('keydown', onUploadFormEscKeydown);
};

const removeEventListeneronDocument = () => {
  document.removeEventListener('keydown', onUploadFormEscKeydown);
};

const openUploadForm = () => {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.body.classList.add('modal-open');
  // Добавляем обработчики
  document.addEventListener('keydown', onUploadFormEscKeydown);
  uploadFormCloseElement.addEventListener('click', closeUploadForm);

  hashtagsInput.addEventListener('focusin', removeEventListeneronDocument);
  hashtagsInput.addEventListener('focusout', addEventListenerOnDocument);

  descriptionInput.addEventListener('focusin', removeEventListeneronDocument);
  descriptionInput.addEventListener('focusout', addEventListenerOnDocument);

};

function closeUploadForm () {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.body.classList.remove('modal-open');
  // Сброс полей
  uploadFile.value = '';
  scale.value ='55%';
  hashtagsInput.value = '';
  descriptionInput.value = '';
  // Убираем обработчики
  document.removeEventListener('keydown', onUploadFormEscKeydown);
  uploadFormCloseElement.removeEventListener('click', closeUploadForm);
  hashtagsInput.removeEventListener('focusin', removeEventListeneronDocument);
  hashtagsInput.removeEventListener('focusout', addEventListenerOnDocument);
  descriptionInput.removeEventListener('focusin', removeEventListeneronDocument);
  descriptionInput.removeEventListener('focusout', addEventListenerOnDocument);
}

uploadFile.addEventListener('change', openUploadForm);


const pristine = new Pristine(uploadForm);

pristine.addValidator(descriptionInput, checkLineLength);
pristine.addValidator(hashtagsInput, checkHashtags);

function checkHashtags () {
  if (hashtagsInput.value === '') {
    return true;
  }
  const userHashtags = hashtagsInput.value.split(' ');
  const userHashtagsLowerCase = userHashtags.map((element) => element.toLowerCase());

  return checkHashtagsNotation(userHashtags) && checkHashtagsQuantity(userHashtags) && checkHashtagsUniqueness(userHashtagsLowerCase);
}

function checkHashtagsNotation (hashtags) {
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  for (let i = 0; i < hashtags.length; i++) {
    if (!re.test(hashtags[i])) {
      return false;
    }
  }
  return true;
}

function checkHashtagsQuantity (hashtags) {
  return hashtags.length <=5;
}


function checkHashtagsUniqueness (hashtags) {
  const uniqueHashtags = new Set(hashtags);
  return hashtags.length === uniqueHashtags.size;
}

// Проверка на валидность с выводами в консоль
// uploadForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();

//   const isValid = pristine.validate();
//   if (isValid) {
//     console.log('Можно отправлять');
//   } else {
//     console.log('Форма невалидна');
//   }
// });

// Проверка на валидность с отменой отправки
uploadForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});
