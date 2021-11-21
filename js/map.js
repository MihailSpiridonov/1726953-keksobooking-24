import {activateForm} from './page-status.js';
import {addressInput} from './form-validation.js';
import {fillTemplate} from './offer.js';


const FIVE = 5;
const LATITUDE_MAP = 35.6805;
const LONGITUDE_MAP = 139.772;
const LATITUDE_MARKER = 35.6895;
const LONGITUDE_MARKER = 139.772;
const SCALE = 13;
const map = L.map('map-canvas');


// Функция для добавления карты Leaflet на страницу
const addLeafletMap = (activate) => {

  // Добавляем интерактивную карту со стартовыми координатами в спец.контейнер
  map
    .on('load', activate)
    .setView({
      lat: LATITUDE_MAP,
      lng: LONGITUDE_MAP,
    }, SCALE);

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
    lat: LATITUDE_MARKER,
    lng: LONGITUDE_MARKER,
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
    lat: LATITUDE_MARKER,
    lng: LONGITUDE_MARKER,
  });
  map
    .setView({
      lat: LATITUDE_MAP,
      lng: LONGITUDE_MAP,
    }, SCALE);
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
    addressInput.value = `${coordinate.lat.toFixed(FIVE)  }, ${  coordinate.lng.toFixed(FIVE)}`;
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
  data.offer.address = `${data.location.lat.toFixed(FIVE)  }, ${  data.location.lng.toFixed(FIVE)}`;
  // Добавляем иконку для похожих объявлений
  offerPinIcon;

  // Добавляем слой для маркеров похожих объявлений
  markerGroup.addTo(map);

  // Добавляем маркеры похожих объявлений на страницу
  const addMarker = L.marker(
    {
      lat: data.location.lat.toFixed(FIVE),
      lng: data.location.lng.toFixed(FIVE),
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
  // Функция для добавления карты Leaflet на страницу
  addLeafletMap(activateForm);
  // Функция для создания основного маркера
  addBasicMarker();
};


export {addMap, showSimilarAds, markerGroup, addBasicMarker, resetMarker, setCoordinates};
