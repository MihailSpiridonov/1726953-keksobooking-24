import {types, checkin, checkout, dataFeatures, dataPhotos, randomValue, getRandomArray, getIntegerRandomNumber, getIntegerRandomNumberZero, getFractionalRandomNumber} from './create-random-value.js';


// Функция для создания сгенерированных JS-объектов
const getAdSimilar = function (adSimilar) {
  const lat = getFractionalRandomNumber(35.65000, 35.70000, 5);
  const lng = getFractionalRandomNumber(139.70000, 139.80000, 5);

  adSimilar = {
    author: {
      avatar: `img/avatars/user${getIntegerRandomNumberZero(1, 10)}.png`,
    },
    offer: {
      title: 'Отличный вариант',
      address: `Адрес: широта/долгота - ${lat} / ${lng}`,
      price: getIntegerRandomNumber(2000, 50000),
      type: randomValue(types),
      rooms: getIntegerRandomNumber(1, 5),
      quests: getIntegerRandomNumber(1, 5),
      checkin: randomValue(checkin),
      checkout: randomValue(checkout),
      features: getRandomArray(dataFeatures),
      description: 'Сдаётся жильё. Сделан качественный ремонт, есть вся необходимая мебель и бытовая техника. Всё для вашего комфортного проживания.',
      photos: getRandomArray(dataPhotos),
    },
    location: {
      lat: lat,
      lng: lng,
    },
  };

  return adSimilar;
};


//  Создание массива из 10 сгенерированных JS-объектов
const serverDatas = [];
for (let i=0; i<10; i++) {
  serverDatas.push(getAdSimilar());
}


export {getAdSimilar, serverDatas};
