import './create-random-value.js';
import {types, checkin, checkout, features, photos, randomValue, getRandomArray, getIntegerRandomNumber, getIntegerRandomNumberZero, getFractionalRandomNumber} from './create-random-value.js';

// Функция для создания сгенерированных JS-объектов

const adSimilar = {
  author: {
    avatar: `img/avatars/user${getIntegerRandomNumberZero(1, 10)}.png`,
  },
  offer: {
    title: 'Отличный вариант',
    address: `Адрес: широта/долгота - ${getFractionalRandomNumber(35.65000, 35.70000, 5)} / ${getFractionalRandomNumber(139.70000, 139.80000, 5)}`,
    price: getIntegerRandomNumber(5000, 500000),
    type: randomValue(types),
    rooms: getIntegerRandomNumber(1, 5),
    quests: getIntegerRandomNumber(1, 5),
    checkin: randomValue(checkin),
    checkout: randomValue(checkout),
    features: getRandomArray(features),
    description: 'Сдаётся жильё. Сделан качественный ремонт, есть вся необходимая мебель и бытовая техника. Всё для вашего комфортного проживания.',
    photos: getRandomArray(photos),
  },
  location: {
    lat: `Широта ${  getFractionalRandomNumber(35.65000, 35.70000, 5)}`,
    lng: `Долгота ${  getFractionalRandomNumber(139.70000, 139.80000, 5)}`,
  },
};

export {adSimilar};