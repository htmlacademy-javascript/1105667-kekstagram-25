import {isEscapeKey, checkLineLength} from './util.js';
import './slider.js';
import {sendData} from './api.js';
import {filterList, updateEffectSlider} from './slider.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const HASHTAG_LENGTH_MAX = 20;
const HASHTAG_QUANTITY_MAX = 5;
const SCALE_VALUE_MAX = '100%';
const SCALE_VALUE_MIN = '25%';
const SCALE_VALUE_STEP = 25;

const uploadForm = document.querySelector('#upload-select-image');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadFormCloseElement = uploadForm.querySelector('#upload-cancel');

const hashtagsInput = uploadForm.querySelector('[name="hashtags"]');
const descriptionInput = uploadForm.querySelector('[name="description"]');

const scaleSmallerElement = document.querySelector('.scale__control--smaller');
const scaleBiggerElement = document.querySelector('.scale__control--bigger');
const scaleControl = document.querySelector('.scale__control--value');
const submitButton = document.querySelector('.img-upload__submit');
const picturePreview = document.querySelector('.img-upload__preview').querySelector('img');


const onUploadFormEscKeydown = (evt) => {
  if ((isEscapeKey(evt) && !document.querySelector('.error')) || (isEscapeKey(evt) && document.querySelector('.error.hidden'))) {
    closeUploadForm();
  }
};

const onInputFocusout = () => {
  document.addEventListener('keydown', onUploadFormEscKeydown);
};

const onInputFocusin = () => {
  document.removeEventListener('keydown', onUploadFormEscKeydown);
};

const openUploadForm = () => {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.querySelector('.img-upload__effect-level').classList.add('hidden');

  // Замена изображения
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    picturePreview.src = URL.createObjectURL(file);
  }
  // Сброс стилей
  picturePreview.removeAttribute('style');
  picturePreview.removeAttribute('class');
  // Масштаб изображения по умолчанию
  scaleControl.value = SCALE_VALUE_MAX;
  // Добавляем обработчики
  document.addEventListener('keydown', onUploadFormEscKeydown);
  uploadFormCloseElement.addEventListener('click', onCloseElementClick);

  hashtagsInput.addEventListener('focusin', onInputFocusin);
  hashtagsInput.addEventListener('focusout', onInputFocusout);

  descriptionInput.addEventListener('focusin', onInputFocusin);
  descriptionInput.addEventListener('focusout', onInputFocusout);

  filterList.addEventListener('click', onFilterListClick);
  // Добавляем обработчики кнопок масштаба
  scaleSmallerElement.addEventListener('click', onScaleSmallerElementClick);
  scaleBiggerElement.addEventListener('click', onScaleBiggerElementClick);

  uploadFile.removeEventListener('change', onUploadInputChange);

};

function closeUploadForm () {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.body.classList.remove('modal-open');
  // Сброс полей
  uploadFile.value = '';
  hashtagsInput.value = '';
  descriptionInput.value = '';

  document.querySelector('.effects__radio').checked = true;

  const errorsToRemove = document.querySelectorAll('.pristine-error');
  for (let i = 0; i < errorsToRemove.length; i++) {
    errorsToRemove[i].innerHTML='';
  }

  // Убираем обработчики
  document.removeEventListener('keydown', onUploadFormEscKeydown);
  uploadFormCloseElement.removeEventListener('click', onCloseElementClick);
  hashtagsInput.removeEventListener('focusin', onInputFocusin);
  hashtagsInput.removeEventListener('focusout', onInputFocusout);
  descriptionInput.removeEventListener('focusin', onInputFocusin);
  descriptionInput.removeEventListener('focusout', onInputFocusout);
  filterList.removeEventListener('click', onFilterListClick);
  // Убираем обработчики с кнопок масштаба
  scaleSmallerElement.removeEventListener('click', onScaleSmallerElementClick);
  scaleBiggerElement.removeEventListener('click', onScaleBiggerElementClick);
  // Сброс стиля изображения
  picturePreview.style.transform = '';

  uploadFile.addEventListener('change', onUploadInputChange);


}

function onUploadInputChange () {
  openUploadForm();
}

function onCloseElementClick () {
  closeUploadForm();
}

function onFilterListClick (evt) {
  updateEffectSlider(evt);
}

uploadFile.addEventListener('change', onUploadInputChange);

// Функции масштабирования изображения
function makeScaleSmaller () {
  if (scaleControl.value !== SCALE_VALUE_MIN) {
    scaleControl.value = `${Number(scaleControl.value.slice(0,-1)) - SCALE_VALUE_STEP  }%`;
    picturePreview.style.transform = `scale(${ scaleControl.value.slice(0,-1)/100})`;
  }
}

function makeScaleBigger () {
  if (scaleControl.value !== SCALE_VALUE_MAX) {
    scaleControl.value = `${Number(scaleControl.value.slice(0,-1)) + SCALE_VALUE_STEP  }%`;
    picturePreview.style.transform = `scale(${ scaleControl.value.slice(0,-1)/100})`;
  }
}

function onScaleSmallerElementClick () {
  makeScaleSmaller();
}

function onScaleBiggerElementClick () {
  makeScaleBigger();
}

// Валидация
const pristine = new Pristine(uploadForm, {
  classTo: 'text__item',
  errorClass: 'text__item--invalid',
  successClass: 'text__item--valid',
  errorTextParent: 'text__item',
  errorTextTag: 'p',
  errorTextClass: 'text__error'
},false);

pristine.addValidator(descriptionInput, checkLineLength,'- длина комментария не может составлять больше 140 символов;');
pristine.addValidator(hashtagsInput, checkHashtags, getHashtagsErrorMessage);
let errorMessageText = '';

function checkHashtags () {
  errorMessageText = '';
  if (hashtagsInput.value === '') {
    return true;
  }
  const userHashtags = hashtagsInput.value.split(' ');
  const userHashtagsLowerCase = userHashtags.map((element) => element.toLowerCase());

  const hashtagsNotationCheckResult = checkHashtagsNotation(userHashtags);
  const hashtagsQuantityCheckResult = checkHashtagsQuantity(userHashtags);
  const hashtagsUniquenessCheckResult = checkHashtagsUniqueness(userHashtagsLowerCase);

  return hashtagsNotationCheckResult && hashtagsQuantityCheckResult && hashtagsUniquenessCheckResult;
}

function checkHashtagsNotation (hashtags) {
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  for (let i = 0; i < hashtags.length; i++) {
    if (!re.test(hashtags[i])) {

      if (hashtags[i].length > HASHTAG_LENGTH_MAX) {
        errorMessageText += '<p>&mdash; максимальная длина одного хэш-тега 20 символов, включая решётку;</p>';
        return;
      }

      if (hashtags[i] === '#') {
        errorMessageText += '<p>&mdash; хеш-тег не может состоять только из одной решётки;</p>';
        return;
      }

      if (!hashtags[i].includes('#')) {
        errorMessageText += '<p>&mdash; хэш-тег начинается с символа # (решётка);</p>';
        return;
      }

      if (errorMessageText === '') {
        errorMessageText += '<p>&mdash; строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.; </p>';
      }
      return false;
    }
  }
  return true;
}

function checkHashtagsQuantity (hashtags) {
  if (hashtags.length > HASHTAG_QUANTITY_MAX) {
    errorMessageText += '<p>&mdash; нельзя указать больше пяти хэш-тегов;</p>';
    return false;
  }
  return true;
}


function checkHashtagsUniqueness (hashtags) {
  const uniqueHashtags = new Set(hashtags);
  if (hashtags.length === uniqueHashtags.size) {
    return true;
  }
  errorMessageText += '<p>&mdash; хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;</p><p>&mdash; один и тот же хэш-тег не может быть использован дважды;</p>';
  return false;
}

function getHashtagsErrorMessage () {
  return errorMessageText;
}

// Блокировка и разблокировка кнопки
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

// Проверка на валидность с отменой отправки

const setUserFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
    if (!isValid) {
      evt.preventDefault();
    }
  });
};

export {closeUploadForm, setUserFormSubmit};
