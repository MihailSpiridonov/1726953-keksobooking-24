import {fillTemplate} from './offer.js';
import {map, offerPinIcon} from './map.js';
import {form} from './page-status.js';
import {setFormValidation} from './form-validation.js';
import {success, error, showMessagesSuccess, showMessagesError} from './messages.js';


// Сообщение об ошибке
const ALERT_SHOW_TIME = 10000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = 0;
  alertContainer.style.top = `${45}%`;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = 'black';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};


// Функция для получения данных с сервера
const getData = () => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((datas) => {
      datas.slice(0, 10).forEach((data) => {
        data.offer.address = `${data.location.lat.toFixed(5)  }, ${  data.location.lng.toFixed(5)}`;
        // Добавляем иконку для похожих объявлений
        offerPinIcon;


        // Добавляем маркеры похожих объявлений на страницу
        const addMarker = L.marker(
          {
            lat: data.location.lat.toFixed(5),
            lng: data.location.lng.toFixed(5),
          },
          {
            draggable: false,
            icon: offerPinIcon,
          },
        );

        addMarker.addTo(map)
          .bindPopup(fillTemplate(data));
      });
    })
    .catch(() => {
      showAlert('Данные не получены. Попробуйте обновить страницу');
    });
};

// Функция для отправки данных на сервер
const sendData = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

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
  });
};


export {getData, sendData};
