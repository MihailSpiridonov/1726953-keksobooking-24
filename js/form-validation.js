import {form} from './page-status.js';
import {getAdSimilar} from './ad-similar.js';

const formTitle = form.querySelector('.ad-form__title');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const formType = form.querySelector('.ad-form__type');
const formPrice = form.querySelector('.ad-form__price');
const formRooms = form.querySelector('.ad-form__rooms');
const formGuests = form.querySelector('.ad-form__capacity');
const formAddress = form.querySelector('.ad-form__address');
//const butttonSubmit = form.querySelector('.ad-form__submit');


formAddress.value = getAdSimilar().offer.address;

// Валидация поля "Заголовок объявления"
formTitle.addEventListener('invalid', () => {
  if (formTitle.validity.valueMissing) {
    formTitle.setCustomValidity('Обязательное поле для заполнения');
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
    formPrice.setCustomValidity('Обязательное поле для заполнения');
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
    formRooms.setCustomValidity('Поле заполнено неверно');
  } else {
    formRooms.setCustomValidity('');
  }
});
formGuests.addEventListener('invalid', () => {
  if (formGuests.validity.valueMissing) {
    formGuests.setCustomValidity('Поле заполнено неверно');
  } else {
    formGuests.setCustomValidity('');
  }
});


formGuests.addEventListener('change', () => {
  const valueRooms = formRooms.value;
  const valueGuests = formGuests.value;

  if (valueGuests <= valueRooms && valueGuests !== '0') {
    //alert('1 комната — «для 1 гостя»');
    formGuests.setCustomValidity('');
  } else if (valueGuests === '0' && valueRooms === '100') {
    //alert('100 комнат');
    formGuests.setCustomValidity('');
  } else {
    //alert('Количество комнат не соответствует количеству гостей»');
    formGuests.setCustomValidity('Количество комнат не соответствует количеству гостей»');
  }
});


/*formRooms.addEventListener('change', () => {
  const valueRooms = formRooms.value;
  //const valueGuests = formGuests.children;
  const valueGuests = formGuests.value;

  if (valueGuests==='1' && valueRooms==='1') {
    //formGuests.setCustomValidity('');
    alert('good');
  } else {
    //formGuests.setCustomValidity('1 комната — «для 1 гостя»');
    alert('bad');
  }
  /*if (valueRooms === '1' && valueGuests === '1') {
    formRooms.setCustomValidity('1 комната — «для 1 гостя»');
    //valueGuests[2].removeAttribute('disabled');
  } else if (valueRooms === '2') {
    valueRooms.setCustomValidity('2 комнаты — «для 2 гостей» или «для 1 гостя»');
    //valueGuests[1].removeAttribute('disabled');
    //valueGuests[2].removeAttribute('disabled');
  } else if (valueRooms === '3') {
    valueRooms.setCustomValidity('3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»');
    //valueGuests[0].removeAttribute('disabled');
    //valueGuests[1].removeAttribute('disabled');
    //valueGuests[2].removeAttribute('disabled');
  } else if (valueRooms !== '100') {
    valueRooms.setCustomValidity('100 комнат — «не для гостей»');
    //valueGuests[3].removeAttribute('disabled');
  }
*/


/*
//for (let j=0; j<valueGuests.length; j++) {
//valueGuests[j].setAttribute('disabled', 'disabled');

switch (valueRooms) {
      case '1':
        valueRooms.setCustomValidity('1 комната — «для 1 гостя»');
        //valueGuests[2].removeAttribute('disabled');
        break;
      case '2':
        valueRooms.setCustomValidity('2 комнаты — «для 2 гостей» или «для 1 гостя»');
        //valueGuests[1].removeAttribute('disabled');
        //valueGuests[2].removeAttribute('disabled');
        break;
      case '3':
        this.setCustomValidity('3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»');
        //valueGuests[0].removeAttribute('disabled');
        //valueGuests[1].removeAttribute('disabled');
        //valueGuests[2].removeAttribute('disabled');
        break;
      case '100':
        this.setCustomValidity('100 комнат — «не для гостей»');
        //valueGuests[3].removeAttribute('disabled');
    }
  //}
});*/


// Валидация всей формы создания нового объявления
form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if(!formTitle.value && !formPrice.value && !formGuests.valid && !formRooms.valid) {
    form.setCustomValidity('Форма заполнена не верно');
    //butttonSubmit.setAttribute('disabled', 'disabled');
    //alert('Форма заполнена не верно');
  } else {
    //alert('Форма отправлена');
    form.submit();
  }
});


export {form};
