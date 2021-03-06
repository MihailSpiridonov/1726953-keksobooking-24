import {form, containerForMapFilters} from './page-status.js';
import {resetMarker,  setCoordinates} from './map.js';
import {filterReset, reduceRequests} from './filter.js';
import {getData, sendData} from './api.js';


const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MIN_BUNGALOW = '0';
const MIN_FLAT = '1000';
const MIN_HOTEL = '3000';
const MIN_HOUSE = '5000';
const MIN_PALASE = '10000';
const titleInput = form.querySelector('.ad-form__title');
const priceInput = form.querySelector('.ad-form__price');
const roomsSelect = form.querySelector('.ad-form__rooms');
const guestsSelect = form.querySelector('.ad-form__capacity');
const addressInput = form.querySelector('.ad-form__address');
const typeSelect = form.querySelector('.ad-form__type');
const timeinSelect = form.querySelector('.ad-form__timein');
const timeoutSelect = form.querySelector('.ad-form__timeout');
const resetButton = form.querySelector('.ad-form__reset');


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
const addAttributes = (attributeValue) => {
  priceInput.setAttribute('min', attributeValue);
  priceInput.setAttribute('placeholder', attributeValue);
};


// Функция для валидации select "«Тип жилья» и поля «Цена за ночь»"
const validateTypeSelect = () => {
  const valueType = typeSelect.value;

  switch (valueType) {
    case 'bungalow':
      addAttributes(MIN_BUNGALOW);
      break;
    case 'flat':
      addAttributes(MIN_FLAT);
      break;
    case 'hotel':
      addAttributes(MIN_HOTEL);
      break;
    case 'house':
      addAttributes(MIN_HOUSE);
      break;
    case 'palace':
      addAttributes(MIN_PALASE);
      break;
  }
};


// Функции для валидации select "«Количество комнат» и «количество мест»"
const validateSelectTime = (selectOne, selectTwo) => {
  const value = selectOne.value;
  const items = selectOne.children;

  for (let i=0; i<items.length; i++) {
    if (value === items[i].value) {
      selectTwo.value = items[i].value;
    }
  }
};

const validateSelectTimein = () => {
  validateSelectTime(timeinSelect, timeoutSelect);
};

const validateSelectTimeout = () => {
  validateSelectTime(timeoutSelect, timeinSelect);
};


// Функция добавления обработчиков валидации формы
const setFormValidation = () => {
  // Валидация поля "Заголовок объявления" при вводе данных
  titleInput.addEventListener('input', validateTitleLength);

  // Валидация полей "Количество комнат и количество мест"
  roomsSelect.addEventListener('change', validateSelect);
  guestsSelect.addEventListener('change', validateSelect);

  // Валидации полей «Тип жилья» и поля «Цена за ночь»
  typeSelect.addEventListener('change', validateTypeSelect);

  // Синхронизация полей «Время заезда» и поля «Время выезда»
  timeinSelect.addEventListener('change', validateSelectTimein);
  timeoutSelect.addEventListener('change', validateSelectTimeout);
};


// Функция удаления обработчиков валидации формы
const removeFormValidation = () => {
  // Валидация поля "Заголовок объявления" при вводе данных
  titleInput.removeEventListener('input', validateTitleLength);

  // Валидация полей "Количество комнат и количество мест"
  roomsSelect.removeEventListener('change', validateSelect);
  guestsSelect.removeEventListener('change', validateSelect);

  // Валидации полей «Тип жилья» и поля «Цена за ночь»
  typeSelect.removeEventListener('change', validateTypeSelect);

  // Синхронизация полей «Время заезда» и поля «Время выезда»
  timeinSelect.removeEventListener('change', validateSelectTimein);
  timeoutSelect.removeEventListener('change', validateSelectTimeout);
};


// Функция очистки формы
const resetForm = (evt) => {
  evt.preventDefault();
  form.reset();
  filterReset();
  removeFormValidation();
  validateTypeSelect();
  resetMarker();
  setCoordinates();
  getData();
  // Показ похожих объявлений взависимости от фильтра
  containerForMapFilters.addEventListener('change', reduceRequests);
  // Добавление обработчиков для валидации формы
  setFormValidation();
};


// Вызов функции очистки формы
resetButton.addEventListener('click', resetForm);


// Вызов функции для отправки формы
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendData();
});


export {setFormValidation, removeFormValidation, resetForm, addressInput};
