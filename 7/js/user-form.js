import {isEscapeKey, checkLineLength} from './util.js';
const uploadForm = document.querySelector('#upload-select-image');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadFormCloseElement = uploadForm.querySelector('#upload-cancel');
const scale = uploadForm.querySelector('.scale__control--value');
const hashtags = uploadForm.querySelector('[name="hashtags"]');
const description = uploadForm.querySelector('[name="description"]');

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

  hashtags.addEventListener('focusin', removeEventListeneronDocument);
  hashtags.addEventListener('focusout', addEventListenerOnDocument);

  description.addEventListener('focusin', removeEventListeneronDocument);
  description.addEventListener('focusout', addEventListenerOnDocument);

};

function closeUploadForm () {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.body.classList.remove('modal-open');
  // Сброс полей
  uploadFile.value = '';
  scale.value ='55%';
  hashtags.value = '';
  description.value = '';
  // Убираем обработчики
  document.removeEventListener('keydown', onUploadFormEscKeydown);
  uploadFormCloseElement.removeEventListener('click', closeUploadForm);
  hashtags.removeEventListener('focusin', removeEventListeneronDocument);
  hashtags.removeEventListener('focusout', addEventListenerOnDocument);
  description.removeEventListener('focusin', removeEventListeneronDocument);
  description.removeEventListener('focusout', addEventListenerOnDocument);
}

uploadFile.addEventListener('change', openUploadForm);


const pristine = new Pristine(uploadForm);

pristine.addValidator(description, checkLineLength);
pristine.addValidator(hashtags, checkHashtags);

function checkHashtags () {
  if (hashtags.value === '') {
    return true;
  }
  const userHashtags = hashtags.value.split(' ');
  const userHashtagsLowerCase = userHashtags.map((element) => element.toLowerCase());

  return checkHashtagsNotation(userHashtags) && checkHashtagsQuantity(userHashtags) && checkHashtagsUniqueness(userHashtagsLowerCase);
}

function checkHashtagsNotation (element) {
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  for (let i = 0; i < element.length; i++) {
    if (!re.test(element[i])) {
      return false;
    }
  }
  return true;
}

function checkHashtagsQuantity (element) {
  return element.length <=5;
}


function checkHashtagsUniqueness (element) {
  for (let i = 0; i < element.length; i++) {
    for (let j = element.length - 1; j > i; j--) {
      if (element[i] === element[j]) {
        return false;
      }
    }
  }
  return true;
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
