import {setFormValidation} from './form-validation.js';
import {addMap} from './map.js';
import {getData, sendData} from './api.js';


// Вызов функции получения данных с сервера
getData();


// Вызов функции отправки данных на сервер
sendData();


//Вызов функции валидации формы
setFormValidation();


//Добавление карты на страницу
addMap();
