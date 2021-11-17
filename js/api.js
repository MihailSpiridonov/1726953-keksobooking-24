import {markerGroup, showSimilarAds} from './map.js';
import {form} from './page-status.js';
import {setFormValidation} from './form-validation.js';
import {filterData} from './filter.js';
import {success, error, showAlert, showMessagesSuccess, showMessagesError} from './messages.js';


// Функция для получения данных с сервера
const getData = () => {
  markerGroup.clearLayers();
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((datas) => {
      datas
        .slice()
        .filter(filterData)
        .slice(0, 10)
        .forEach(showSimilarAds);
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
