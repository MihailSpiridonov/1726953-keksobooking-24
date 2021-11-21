const form = document.querySelector('.ad-form');
const formHeader = document.querySelector('.ad-form-header');
const formElements = document.querySelectorAll('.ad-form__element');
const containerForMapFilters = document.querySelector('.map__filters');
const mapFilters = document.querySelectorAll('.map__filter');
const mapFeatures = document.querySelector('.map__features');


//Функция для перевода формы в активное состояние
const activateForm = function () {
  form.classList.remove('ad-form--disabled');
  formHeader.removeAttribute('disabled');
  formElements.forEach((formElement) => {
    formElement.removeAttribute('disabled');
  });
};


//Функция для перевода фильтра в активное состояние
const activateFilter = function () {
  containerForMapFilters.classList.remove('map__filters--disabled');
  mapFilters.forEach((mapFilter) => {
    mapFilter.removeAttribute('disabled');
  });
  mapFeatures.removeAttribute('disabled');
};


//Функция для перевода страницы в неактивное состояние
const deActivatePage = function () {
  form.classList.add('ad-form--disabled');
  formHeader.setAttribute('disabled', 'disabled');
  formElements.forEach((formElement) => {
    formElement.setAttribute('disabled', 'disabled');
  });
  containerForMapFilters.classList.add('map__filters--disabled');
  mapFilters.forEach((mapFilter) => {
    mapFilter.setAttribute('disabled', 'disabled');
  });
  mapFeatures.setAttribute('disabled', 'disabled');
};


export {activateForm, activateFilter, deActivatePage, containerForMapFilters, form};
