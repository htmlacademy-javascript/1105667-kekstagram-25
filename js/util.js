const MAX_COMMENT_LENGTH = 140;
const ALERT_SHOW_TIME = 5000;
const checkLineLength = (text) => text.length <= MAX_COMMENT_LENGTH;

const isEscapeKey = (evt) => evt.key === 'Escape';

const getRandomNumber = (min, max) => {
  if (min >= 0 && max > min) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  throw new Error('Ошибка. Неправильно заданный диапазон');
};

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];


const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.textTransform = 'none';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// Шаблоны успех и ошибка
const succesTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const body = document.body;

const succesElement = succesTemplate.cloneNode(true);
const successButton = succesElement.querySelector('.success__button');
const errorElement = errorTemplate.cloneNode(true);
const errorButton = errorElement.querySelector('.error__button');

const onSuccessMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    succesElement.classList.add('hidden');
    document.removeEventListener('keydown', onSuccessMessageEscKeydown);
  }
};

const onSuccessMessageClickOnRandomArea = (evt) => {
  if (evt.target.className === 'success') {
    succesElement.classList.add('hidden');
  }
};

const createSuccessMessage = () => {
  body.appendChild(succesElement);

  succesElement.classList.remove('hidden');
  successButton.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onSuccessMessageEscKeydown);
  document.addEventListener('click', onSuccessMessageClickOnRandomArea);
};


const onErrorMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    errorElement.classList.add('hidden');
    document.removeEventListener('keydown', onErrorMessageEscKeydown);
  }
};

const onErrorMessageClickOnRandomArea = (evt) => {
  if (evt.target.className === 'error') {
    errorElement.classList.add('hidden');
  }
  document.removeEventListener('click', onErrorMessageClickOnRandomArea);
};

const createErrorMessage = () => {
  body.appendChild(errorElement);

  errorElement.classList.remove('hidden');
  errorElement.style.zIndex = '3';
  errorButton.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onErrorMessageEscKeydown);
  document.addEventListener('click', onErrorMessageClickOnRandomArea);
};

function closeMessage () {
  succesElement.classList.add('hidden');
  successButton.removeEventListener('click', closeMessage);
  errorElement.classList.add('hidden');
  errorButton.removeEventListener('click', closeMessage);
  document.removeEventListener('keydown', onSuccessMessageEscKeydown);
  document.removeEventListener('click', onSuccessMessageClickOnRandomArea);
  document.removeEventListener('keydown', onErrorMessageEscKeydown);
  document.removeEventListener('click', onErrorMessageClickOnRandomArea);
}

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

const debounce = (callback, timeoutDelay = 500) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};

export {checkLineLength, isEscapeKey, showAlert, createSuccessMessage, createErrorMessage, debounce, getRandomArrayElement};
