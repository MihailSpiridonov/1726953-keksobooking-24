import {getAdSimilar} from './ad-similar.js';
import {fillTemplate} from './offer.js';
import {deActivePage, activePage} from './page-status.js';


// Вызов функции для наполнение шаблона данными
fillTemplate();


//  Создание массива из 10 сгенерированных JS-объектов
const serverData = [];

for (let index=0; index<10; index++) {
  serverData.push(getAdSimilar());
}

serverData;


//Вызов функции для перевода страницы в неактивное состояние
deActivePage ();


//Вызов функции для перевода страницы в активное состояние
activePage ();
