import {form, containerForMapFilters} from './page-status.js';
import {resetMarker, setCoordinates} from './map.js';
import {removeFormValidation} from './form-validation.js';
import {filterReset, reduceRequests} from './filter.js';
import {getData} from './api.js';


const Z_INDEX = 1000;
const POSITION = 'fixed';
const POSITION_TOP = '45%';
const CENTER = 'center';
const COLOR = 'black';
const BACKGROUND_COLOR = 'red';
const ZERO = 0;
const HORIZONTALLY_PADDING = 3;
const VERTICALLY_PADDING = 10;
const FONT_SIZE = 30;
const PIXEL = 'px';

// Время показа сообщения об ошибке
const ALERT_SHOW_TIME = 7000;


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
    document.removeEventListener('keydown', onPopupEscKeydown);
  }
};


// Функция для показа сообщения об отправки данных
const showMessagesSuccess = (message) => {
  body.append(message);
  removeFormValidation();
  filterReset();
  getData();
  containerForMapFilters.addEventListener('change', reduceRequests);
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
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = Z_INDEX;
  alertContainer.style.position = POSITION;
  alertContainer.style.left = ZERO;
  alertContainer.style.top = POSITION_TOP;
  alertContainer.style.right = ZERO;
  alertContainer.style.padding = `${VERTICALLY_PADDING + PIXEL  } ${  HORIZONTALLY_PADDING  }${PIXEL}`;
  alertContainer.style.fontSize = FONT_SIZE + PIXEL;
  alertContainer.style.textAlign = CENTER;
  alertContainer.style.color = COLOR;
  alertContainer.style.backgroundColor = BACKGROUND_COLOR;

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {success, error, showAlert, showMessagesSuccess, showMessagesError};
