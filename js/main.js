
//Функция, возвращающая случайное целое число из переданного диапазона включительно.

function getIntegerRandomNumber (min, max) {
  if (min >= 0 && min < max) {
    const integerNumber = Math.round(Math.random() * (max-min)+min);
    return integerNumber;
  }
  return 'Неверно задан диапозон';
}

getIntegerRandomNumber(1, 2);


//Функция, возвращающая случайное число с плавающей точкой (с указанным "количеством знаков после запятой") из переданного диапазона включительно.

function getFractionalRandomNumber (min, max, numberSigns) {
  if (min >= 0 && min < max) {
    const number = Math.random() * (max-min)+min;
    if (numberSigns > 0) {
      return  number.toFixed(numberSigns);
    } else {
      return  number;
    }
  }
  return 'Неверно задан диапозон';
}

getFractionalRandomNumber(0, 1.2, 2);
