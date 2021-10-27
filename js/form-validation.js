import {form} from './page-status.js';
import {getAdSimilar} from './ad-similar.js';

const formTitle = form.querySelector('.ad-form__title');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const formRooms = form.querySelector('.ad-form__rooms');
const formGuests = form.querySelector('.ad-form__capacity');
const formAddress = form.querySelector('.ad-form__address');


//Рандомное значение для поля с адресом
formAddress.value = getAdSimilar().offer.address;


// Функция для валидации select "Количество комнат и количество мест"
const validitySelect = function (selectNameOne, selectNameSecond) {
  selectNameOne.addEventListener('change', () => {
    const valueRooms = formRooms.value;
    const valueGuests = formGuests.value;


    if (valueGuests <= valueRooms && valueGuests !== '0' && valueRooms !== '100') {
      selectNameOne.setCustomValidity('');
      selectNameSecond.setCustomValidity('');
    } else if (valueGuests === '0' && valueRooms === '100') {
      selectNameOne.setCustomValidity('');
      selectNameSecond.setCustomValidity('');
    } else {
      selectNameOne.setCustomValidity('Количество комнат должно быть больше или равно количеству гостей. А «100 комнат» соответствует варианту «не для гостей»');
      selectNameSecond.setCustomValidity('');
    }
  });
};

// Функция валидации формы
const getValidityForm = function () {
  // Валидация поля "Заголовок объявления"
  formTitle.addEventListener('input', () => {
    const valueLength = formTitle.value.length;

    if (valueLength < MIN_TITLE_LENGTH) {
      formTitle.setCustomValidity(`Ещё ${  MIN_TITLE_LENGTH - valueLength } симв.`);
    } else if (valueLength > MAX_TITLE_LENGTH) {
      formTitle.setCustomValidity(`Удалите лишние ${  valueLength - MAX_TITLE_LENGTH } симв.`);
    } else {
      formTitle.setCustomValidity('');
    }
  });

  // Валидация полей "Количество комнат и количество мест"
  validitySelect(formRooms, formGuests);
  validitySelect(formGuests, formRooms);
};


export {getValidityForm};
