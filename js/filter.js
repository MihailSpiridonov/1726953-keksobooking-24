const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const featureContainer = mapFilters.querySelector('.map__features');
const nodes = Array.from(featureContainer.querySelectorAll('.map__checkbox:checked'));

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


// Дефолтное значение полей "число комнат" и "число гостей"
const ROOMS_DEFAULT = 0;
const GUESTS_DEFAULT = 0;


// Функция проверяет соответствие предложения по типу жилья
const filterHousing = ({type}) => type === housingType.value || housingType.value === 'any';


// Функция проверяет соответствие предложения по стоимости
const filterPrice = ({price}) => {
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


// Функция проверяет соответствие предложения по количеству комнат
const filterRooms = ({rooms}) => rooms === (+housingRooms.value || ROOMS_DEFAULT) || housingRooms.value === 'any';


// Функция проверяет соответствие предложения по количеству гостей
const filterGuests = ({guests}) => guests === (+housingGuests.value || GUESTS_DEFAULT) || housingGuests.value === 'any';


// Функция проверяет соответствие предложения по удобствам
const filterFeatures = ({ features }) => {

  if (!features && nodes.length > 0) {
    return false;
  }

  return nodes.every((node) => features.includes(node.value));
};


export {mapFilters, filterHousing, filterPrice, filterRooms, filterGuests, filterFeatures};
