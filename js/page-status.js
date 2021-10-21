const form = document.querySelector('.ad-form');
const formHeader = document.querySelector('.ad-form-header');
const formElement = document.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const mapFilter = document.querySelectorAll('.map__filter');
const mapFeatures = document.querySelector('.map__features');


//Функция для перевода страницы в неактивное состояние
const deActivePage = function () {
  form.classList.add('ad-form--disabled');
  formHeader.setAttribute('disabled', 'disabled');
  for (let i=0; i<formElement.length; i++) {
    formElement[i].setAttribute('disabled', 'disabled');
  }
  mapFilters.classList.add('map__filters--disabled');
  for (let i=0; i<mapFilter.length; i++) {
    mapFilter[i].setAttribute('disabled', 'disabled');
  }
  mapFeatures.setAttribute('disabled', 'disabled');
};


//Функция для перевода страницы в активное состояние
const activePage = function () {
  form.classList.remove('ad-form--disabled');
  formHeader.removeAttribute('disabled');
  for (let i=0; i<formElement.length; i++) {
    formElement[i].removeAttribute('disabled');
  }
  mapFilters.classList.remove('map__filters--disabled');
  for (let i=0; i<mapFilter.length; i++) {
    mapFilter[i].removeAttribute('disabled');
  }
  mapFeatures.removeAttribute('disabled');
};

export {deActivePage, activePage};
