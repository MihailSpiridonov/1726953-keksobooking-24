import {deActivePage} from './page-status.js';
import {addMap} from './map.js';
import {getData} from './api.js';
import {setFormValidation} from './form-validation.js';


//Вызов функции для перевода страницы в неактивное состояние
deActivePage ();

// Добавление карты на страницу
addMap();

// Вызов функции получения данных с сервера
getData();

// Вызов функции валидации формы
setFormValidation();
