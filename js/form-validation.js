import {
  form
} from './page-status.js';
import {
  getAdSimilar
} from './ad-similar.js';

const formTitle = form.querySelector('.ad-form__title');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const roomsSelect = form.querySelector('.ad-form__rooms');
const guestsSelect = form.querySelector('.ad-form__capacity');
const formAddress = form.querySelector('.ad-form__address');


//Рандомное значение для поля с адресом
formAddress.value = getAdSimilar().offer.address;


// Функция для валидации select "Количество комнат и количество мест"
const validateSelect = function () {
  const valueRooms = roomsSelect.value;
  const valueGuests = guestsSelect.value;

  if (valueGuests <= valueRooms && valueGuests !== '0' && valueRooms !== '100') {
    roomsSelect.setCustomValidity('');
    guestsSelect.setCustomValidity('');
  } else if (valueGuests === '0' && valueRooms === '100') {
    roomsSelect.setCustomValidity('');
    guestsSelect.setCustomValidity('');
  } else {
    roomsSelect.setCustomValidity('Количество комнат должно быть больше или равно количеству гостей. А «100 комнат» соответствует варианту «не для гостей»');
    guestsSelect.setCustomValidity('');
  }
};

const validateTitleLength = function () {
  const valueLength = formTitle.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    formTitle.setCustomValidity(`Ещё ${  MIN_TITLE_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    formTitle.setCustomValidity(`Удалите лишние ${  valueLength - MAX_TITLE_LENGTH } симв.`);
  } else {
    formTitle.setCustomValidity('');
  }
};


// Функция валидации формы
const setFormValidation = function () {
  // Валидация поля "Заголовок объявления"
  formTitle.addEventListener('input', validateTitleLength);


  // Валидация полей "Количество комнат и количество мест"

  roomsSelect.addEventListener('change', validateSelect);
  guestsSelect.addEventListener('change', validateSelect);
};


export {
  setFormValidation
};
