import {form} from './page-status.js';
import {resetMarker, setCoordinates} from './map.js';
import {removeFormValidation} from './form-validation.js';
import {filterReset} from './filter.js';
import {getData} from './api.js';
import {mapFilters, reduceRequests} from './filter.js';


// Основная информация на странице
const body = document.querySelector('body');


// Сообщение об успешной отправки данных
const success = document.querySelector('#success').content.querySelector('.success');


// Сообщение об ошибке отправки данных
const error = document.querySelector('#error').content.querySelector('.error');
// Кнопка "Попробовать снова" в сообщении об ошибке
const resetMessageError = error.querySelector('.error__button');


// Функция закрывающая сообщение об успешной отправки данных на сервер
const closeMessage = () => {
  success.remove();
  form.reset();
  resetMarker();
  setCoordinates();
};


// Функция закрывающая сообщение об ошибке отправки данных на сервер
const closeMessageError = () => {
  error.remove();
};


// Закрытие сообщения об успешной отправки нажатием кнопки ESC
const onPopupEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeMessage();
    closeMessageError();
  }
};


// Функция для показа сообщения об отправки данных
const showMessagesSuccess = (message) => {
  body.append(message);
  removeFormValidation();
  filterReset();
  getData();
  mapFilters.addEventListener('change', reduceRequests);
  message.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onPopupEscKeydown);
};


// Функция для показа сообщения об ошибке при отправке данных
const showMessagesError = (message) => {
  body.append(message);
  message.addEventListener('click', closeMessageError);
  document.addEventListener('keydown', onPopupEscKeydown);
  resetMessageError.addEventListener('click', closeMessageError);
};


// Сообщение об ошибке
const ALERT_SHOW_TIME = 7000;

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

export {success, error, showAlert, showMessagesSuccess, showMessagesError};
