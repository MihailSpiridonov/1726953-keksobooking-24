import {getData} from './api.js';
import {debounce} from './utils/debounce.js';
import {containerForMapFilters} from './page-status.js';


// Максимальное колличество меток на карте
const MAX = 10;

// Дефолтное значение полей "число комнат" и "число гостей"
const ROOMS_DEFAULT = 0;
const GUESTS_DEFAULT = 0;

// Задержка времени для функции debounce()
const TIMEOUT_DELAY = 500;

const housingType = containerForMapFilters.querySelector('#housing-type');
const housingPrice = containerForMapFilters.querySelector('#housing-price');
const housingRooms = containerForMapFilters.querySelector('#housing-rooms');
const housingGuests = containerForMapFilters.querySelector('#housing-guests');
const featureContainer = containerForMapFilters.querySelector('.map__features');


// Ограничение для фильтра аренды жилья
const PriceRange = {
  LOW: 10000,
  MIDDLE: 50000,
};


// Значения фильтра стоимости аренды жилья
const PriceType = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
};


// Функция проверяет соответствие похожих объявлений по типу жилья
const filtrateHousing = ({type}) => type === housingType.value || housingType.value === 'any';


// Функция проверяет соответствие похожих объявлений по стоимости
const filtratePrice = ({price}) => {
  switch(housingPrice.value) {
    case PriceType.LOW:
      return price < PriceRange.LOW;
    case PriceType.MIDDLE:
      return price >= PriceRange.LOW && price < PriceRange.MIDDLE;
    case PriceType.HIGH:
      return price >= PriceRange.MIDDLE;
    default:
      return true;
  }
};


// Функция проверяет соответствие похожих объявлений по количеству комнат
const filtrateRooms = ({rooms}) => rooms === (+housingRooms.value || ROOMS_DEFAULT) || housingRooms.value === 'any';


// Функция проверяет соответствие похожих объявлений по количеству гостей
const filtrateGuests = ({guests}) => guests === (+housingGuests.value || GUESTS_DEFAULT) || housingGuests.value === 'any';


// Функция проверяет соответствие похожих объявлений по удобствам
const filtrateFeatures = ({ features }) => {
  const nodes = Array.from(featureContainer.querySelectorAll('.map__checkbox:checked'));
  if (!features && nodes.length > 0) {
    return false;
  }

  return nodes.every((node) => features.includes(node.value));
};


// Функция проверяет соответствие похожих объявлений по всем параметрам фильтра
const filtrateData = ({offer}) => filtrateHousing(offer) && filtratePrice(offer) && filtrateRooms(offer) && filtrateGuests(offer) && filtrateFeatures(offer);


// Функция, ограничивающая колличество отображаемых меток на карте
const filterate = (data) => {const newData = [];
  for (let i=0; i<data.length; i++) {
    if (filtrateData(data[i])) {
      newData.push(data[i]);
      if (newData.length > MAX) {break;}
    }
  }
  return newData;
};


// Функция для ограничения числа запросов к серверу
const reduceRequests = debounce(getData, TIMEOUT_DELAY);


// Показ похожих объявлений взависимости от фильтра
containerForMapFilters.addEventListener('change', reduceRequests);


// Функция очистки фильтра
const filterReset = () => {
  containerForMapFilters.reset();
  containerForMapFilters.removeEventListener('change', reduceRequests);
};


export {reduceRequests, filterate, filterReset};
