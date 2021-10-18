//Функция, возвращающая случайное целое число из переданного диапазона включительно.

function getIntegerRandomNumber (min, max) {
  if (min >= 0 && min < max) {
    return Math.round(Math.random() * (max-min)+min);
  }
  return 'Неверно задан диапозон';
}

getIntegerRandomNumber(1, 2);


//Функция, возвращающая случайное целое двухзначное число число из переданного диапазона включительно.

function getIntegerRandomNumberZero (min, max) {
  if (min >= 0 && min < max) {
    const NUMBER = Math.round(Math.random() * (max-min)+min);
    if (NUMBER === max) {
      return NUMBER;
    }
    return `0${  NUMBER}`;
  }
  return 'Неверно задан диапозон';
}

getIntegerRandomNumberZero(1, 10);


//Функция, возвращающая случайное число с плавающей точкой (с указанным "количеством знаков после запятой") из переданного диапазона включительно.

function getFractionalRandomNumber (min, max, numberSigns) {
  if (min >= 0 && min < max) {
    const NUMBER = Math.random() * (max-min)+min;
    if (numberSigns > 0) {
      return NUMBER.toFixed(numberSigns);
    }
    return NUMBER;
  }
  return 'Неверно задан диапозон';
}

getFractionalRandomNumber(0, 1.2, 2);


// Функция для получения случайного элемента из массива

const flat = 'Квартира';
const bungalow = 'Бунгало';
const house = 'Дом';
const palace = 'Дворец';
const hotel = 'Отель';

const types = [palace, flat, house, bungalow, hotel];
const checkin = ['12:00', '13:00', '14:00'];
const checkout = ['12:00', '13:00', '14:00'];
const dataFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const dataPhotos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const randomValue = (characteristic) => characteristic[getIntegerRandomNumber(0, characteristic.length-1)];


// Функция для получения массива случайной длины из заданных значений

const getRandomArray = (characteristic) => {
  const maxLength = characteristic.length;
  const lengthOfArray = getIntegerRandomNumber(1, maxLength);
  const array = [];

  while (array.length < lengthOfArray) {
    const indexOfEl = getIntegerRandomNumber(0, maxLength - 1);
    const el = characteristic[indexOfEl];

    if (!array.includes(el)) {
      array.push(el);
    }
  }
  return array;
};

export {types, checkin, checkout, dataFeatures, dataPhotos, randomValue, getRandomArray, getIntegerRandomNumber, getIntegerRandomNumberZero, getFractionalRandomNumber};
