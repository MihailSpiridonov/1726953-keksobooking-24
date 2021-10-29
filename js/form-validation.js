import {form} from './page-status.js';
import {getAdSimilar} from './ad-similar.js';

const titleInput = form.querySelector('.ad-form__title');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const priceInput = form.querySelector('.ad-form__price');
const roomsSelect = form.querySelector('.ad-form__rooms');
const guestsSelect = form.querySelector('.ad-form__capacity');
const addressInput = form.querySelector('.ad-form__address');
const typeSelect = form.querySelector('.ad-form__type');
const MIN_BUNGALOW = '0';
const MIN_FLAT = '1000';
const MIN_HOTEL = '3000';
const MIN_HOUSE = '5000';
const MIN_PALASE = '10000';
const timeinSelect = form.querySelector('.ad-form__timein');
const timeoutSelect = form.querySelector('.ad-form__timeout');


//Рандомное значение для поля с адресом
addressInput.value = getAdSimilar().offer.address;


// Функция для валидации select "«Количество комнат» и «количество мест»"
const validateSelect = () => {
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


// Валидация поля "Заголовок объявления"
const validateTitleLength = () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Ещё ${  MIN_TITLE_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${  valueLength - MAX_TITLE_LENGTH } симв.`);
  } else {
    titleInput.setCustomValidity('');
  }
};


// Функция для добавления атрибутов
const addAttributes = (nameAttribute) => {
  priceInput.setAttribute('min', nameAttribute);
  priceInput.setAttribute('placeholder', nameAttribute);
};


// Функция для валидации select "«Тип жилья» и поля «Цена за ночь»"
const validateTypeSelect = () => {
  const valueType = typeSelect.value;

  if (valueType === 'bungalow') {
    addAttributes(MIN_BUNGALOW);
  } else if (valueType === 'flat') {
    addAttributes(MIN_FLAT);
  } else if (valueType === 'hotel') {
    addAttributes(MIN_HOTEL);
  } else if (valueType === 'house') {
    addAttributes(MIN_HOUSE);
  } else if (valueType === 'palace') {
    addAttributes(MIN_PALASE);
  }
};


// Функции для валидации select "«Количество комнат» и «количество мест»"
const validateSelectTimeIn = () => {
  const valueTimein = timeinSelect.value;
  const itemsTimein = timeinSelect.children;

  for (let i=0; i<itemsTimein.length; i++) {
    if (valueTimein === itemsTimein[i].value) {
      timeoutSelect.value = itemsTimein[i].value;
    }
  }
};


const validateSelectTimeOut = () => {
  const valueTimeout = timeoutSelect.value;
  const itemsTimeout = timeoutSelect.children;

  for (let i=0; i<itemsTimeout.length; i++) {
    if (valueTimeout === itemsTimeout[i].value) {
      timeinSelect.value = itemsTimeout[i].value;
    }
  }
};


// Функция валидации формы
const setFormValidation = () => {
  // Валидация поля "Заголовок объявления" при вводе данных
  titleInput.addEventListener('input', validateTitleLength);

  // Валидация полей "Количество комнат и количество мест"
  roomsSelect.addEventListener('change', validateSelect);
  guestsSelect.addEventListener('change', validateSelect);

  // Валидации полей «Тип жилья» и поля «Цена за ночь»
  typeSelect.addEventListener('change', validateTypeSelect);

  // Синхронизация полей «Время заезда» и поля «Время выезда»
  timeinSelect.addEventListener('change', validateSelectTimeIn);
  timeoutSelect.addEventListener('change', validateSelectTimeOut);
};


export {setFormValidation};
