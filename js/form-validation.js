import {form} from './page-status.js';
import {getAdSimilar} from './ad-similar.js';

const formTitle = form.querySelector('.ad-form__title');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const formType = form.querySelector('.ad-form__type');
const formPrice = form.querySelector('.ad-form__price');
const formRooms = form.querySelector('.ad-form__rooms');
const formQuests = form.querySelector('.ad-form__capacity');
const formAddress = form.querySelector('.ad-form__address');


formAddress.value = getAdSimilar().offer.address;

// Валидация поля "Заголовок объявления"
formTitle.addEventListener('invalid', () => {
  if (formTitle.validity.valueMissing) {
    formTitle.setCustomValidity('Обязательное поле');
  } else {
    formTitle.setCustomValidity('');
  }
});

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


// Валидация поля "Цена за ночь"
formPrice.addEventListener('invalid', () => {
  if (formPrice.validity.valueMissing) {
    formPrice.setCustomValidity('Обязательное поле');
  } else {
    formPrice.setCustomValidity('');
  }
});

formType.addEventListener('invalid', () => {
  if (formType.validity.valueMissing) {
    formType.setCustomValidity('Обязательное поле');
  } else {
    formType.setCustomValidity('');
  }
});


// Валидация полей "Количество комнат и количество мест"
formRooms.addEventListener('invalid', () => {
  if (formRooms.validity.valueMissing) {
    formRooms.setCustomValidity('Обязательное поле');
  } else {
    formRooms.setCustomValidity('');
  }
});

formQuests.addEventListener('invalid', () => {
  if (formQuests.validity.valueMissing) {
    formQuests.setCustomValidity('Обязательное поле');
  } else {
    formQuests.setCustomValidity('');
  }
});


formRooms.addEventListener('change', () => {
  const valueRooms = formRooms.value;
  const valueQuests = formQuests.children;

  for (let j=0; j<valueQuests.length; j++) {
    valueQuests[j].setAttribute('disabled', 'disabled');

    if (valueRooms === '1') {
      valueQuests[2].removeAttribute('disabled');
    } else if (valueRooms === '2') {
      valueQuests[1].removeAttribute('disabled');
      valueQuests[2].removeAttribute('disabled');
    } else if (valueRooms === '3') {
      valueQuests[0].removeAttribute('disabled');
      valueQuests[1].removeAttribute('disabled');
      valueQuests[2].removeAttribute('disabled');
    } else if (valueRooms === '100') {
      valueQuests[3].removeAttribute('disabled');
    }
  }
});


// Валидация всей формы создания нового объявления
form.addEventListener('submit', () => {
  Event.preventDefault();
  formTitle.reportValidity();
  formPrice.reportValidity();
  formType.reportValidity();
  formRooms.reportValidity();
  formQuests.reportValidity();

  if(!formTitle.value) {
    formTitle.setCustomValidity('Обязательное поле');
    return;
  }

  if(!formPrice.value) {
    formPrice.setCustomValidity('Обязательное поле');
    return;
  }

  this.submit();
});


export {form};
