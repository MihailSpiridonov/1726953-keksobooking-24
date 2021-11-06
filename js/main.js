import {getAdSimilar} from './ad-similar.js';
import {setFormValidation} from './form-validation.js';
import {addMap} from './map.js';


//  Создание массива из 10 сгенерированных JS-объектов\
const serverDatas = [];
for (let i=0; i<10; i++) {
  serverDatas.push(getAdSimilar());
}


//Вызов функции валидации формы
setFormValidation();


//Добавление карты на страницу
addMap();


export {serverDatas};
