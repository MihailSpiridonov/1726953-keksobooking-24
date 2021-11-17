import {deActivePage, activePage} from './page-status.js';
import {addressInput} from './form-validation.js';
import {fillTemplate} from './offer.js';


const map = L.map('map-canvas');


// Функция для добавления карты Leaflet на страницу
const addLeafletMap = () => {

  // Добавляем интерактивную карту со стартовыми координатами в спец.контейнер
  map
    .on('load', () => {
      activePage ();
    })
    .setView({
      lat: 35.6805,
      lng: 139.772,
    }, 13);

  // Добавляем слой с картой в Leaflet
  L.tileLayer(
    'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};


// Добавляем иконку для главной метки
const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});


// Добавляем основной маркер на страницу
const marker = L.marker(
  {
    lat: 35.6895,
    lng: 139.772,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
).addTo(map);


// Получаем координаты основного маркера
const setCoordinates = () => {
  addressInput.value = `${marker._latlng.lat  }, ${  marker._latlng.lng}`;
};


// Возращает маркер на изначальную позицию
const resetMarker = () => {
  marker.setLatLng({
    lat: 35.6895,
    lng: 139.772,
  });
  map
    .setView({
      lat: 35.6805,
      lng: 139.772,
    }, 13);
};


// Функция для создания основного маркера
const addBasicMarker = () => {

  // Добавляем иконку для главной метки
  mainPinIcon;

  // Добавляем основной маркер на страницу
  marker;

  //Начальное значение поля с адресом
  setCoordinates();

  // Получаем координаты основного маркера
  marker.on('move', (evt) => {
    const coordinate = evt.target.getLatLng();
    addressInput.value = `${coordinate.lat.toFixed(5)  }, ${  coordinate.lng.toFixed(5)}`;
  });
};


// Добавляем слой для маркеров похожих объявлений
const markerGroup = L.layerGroup();


// Добавляем иконку для похожих объявлений
const offerPinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});


// Функция добавления похожих объявлений на карту
const showSimilarAds = (data) => {
  data.offer.address = `${data.location.lat.toFixed(5)  }, ${  data.location.lng.toFixed(5)}`;
  // Добавляем иконку для похожих объявлений
  offerPinIcon;

  // Добавляем слой для маркеров похожих объявлений
  markerGroup.addTo(map);

  // Добавляем маркеры похожих объявлений на страницу
  const addMarker = L.marker(
    {
      lat: data.location.lat.toFixed(5),
      lng: data.location.lng.toFixed(5),
    },
    {
      draggable: false,
      icon: offerPinIcon,
    },
  );

  addMarker.addTo(markerGroup)
    .bindPopup(fillTemplate(data));
};


// Функция для создания карты
const addMap = () => {
  //Вызов функции для перевода страницы в неактивное состояние
  deActivePage ();
  // Функция для добавления карты Leaflet на страницу
  addLeafletMap();
  // Функция для создания основного маркера
  addBasicMarker();
};


export {addMap, showSimilarAds, markerGroup, addBasicMarker, resetMarker, setCoordinates};
