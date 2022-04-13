import {showAlert, createSuccessMessage, createErrorMessage} from './util.js';

const getData = (onSuccess) => {

  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((pictures) => {
      if (pictures.length) {
        onSuccess(pictures);
      } else {
        showAlert('Нет данных');
      }
    })
    .catch (() => {
      showAlert('Не удалось загрузить данные. Попробуйте обновить страницу');
    });
};


const sendData = (onSuccess, onFail, bodyForm) => {
  fetch(
    'https://25.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: bodyForm,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess(createSuccessMessage());
    } else {
      onFail(createErrorMessage());
    }
  })
    .catch(() => {
      onFail(createErrorMessage());
    });

};

export {getData, sendData};
