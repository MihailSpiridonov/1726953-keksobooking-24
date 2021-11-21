import {markerGroup, showSimilarAds} from './map.js';
import {form, activateFilter} from './page-status.js';
import {setFormValidation} from './form-validation.js';
import {filterate} from './filter.js';
import {success, error, showAlert, showMessagesSuccess, showMessagesError} from './messages.js';


// Функция для получения данных с сервера
const getData = () => {
  markerGroup.clearLayers();
  fetch('https://24.javascript.pages.academy/keksobooking/dat')
    .then((response) => response.json())
    .then((data) => data.slice())
    .then((data) => filterate(data))
    .then((newData) => {
      newData
        .forEach(showSimilarAds);
      if (newData) {
        activateFilter();
      }
    })
    .catch(() => {
      showAlert('Данные не получены. Попробуйте обновить страницу');
    });
};


// Функция для отправки данных на сервер
const sendData = () => {
  const formData = new FormData(form);
  fetch(
    'https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((Response) => {
      setFormValidation();
      if (Response.ok) {
        showMessagesSuccess(success);
      } else {
        showMessagesError(error);
      }
    })
    .catch(() => {
      showMessagesError(error);
    });
};


export {getData, sendData};
