import {form} from './page-status.js';
import {resetMarker, setCoordinates} from './map.js';


// Основная информация на странице
const body = document.querySelector('body');


// Сообщение об успешной отправки данных
const success = document.querySelector('#success').content.querySelector('.success');


// Сообщение об ошибке отправки данных
const error = document.querySelector('#error').content.querySelector('.error');
const resetMessageError = error.querySelector('error__button');


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


export {success, error, showMessagesSuccess, showMessagesError};
