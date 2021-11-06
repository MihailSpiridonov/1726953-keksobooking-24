import {serverDatas} from './main.js';
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

// Функция для создания основного маркера
const addBasicMarker = () => {
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
  marker.on('move', (evt) => {
    const coordinate = evt.target.getLatLng();
    addressInput.value = `${coordinate.lat.toFixed(5)  }, ${  coordinate.lng.toFixed(5)}`;
  });
};


// Добавляем маркеры похожих объявлений на страницу
const addAdditionalMarkers = () => {
  // Функция для создания балуна
  serverDatas.forEach((serverData) => {
    serverData.offer.address = `${serverData.location.lat  }, ${  serverData.location.lng}`;
    // Добавляем иконку для похожих объявлений
    const offerPinIcon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });


    // Добавляем маркеры похожих объявлений на страницу
    const addMarker = L.marker(
      {
        lat: serverData.location.lat,
        lng: serverData.location.lng,
      },
      {
        draggable: false,
        icon: offerPinIcon,
      },
    );

    addMarker.addTo(map)
      .bindPopup(fillTemplate(serverData));
  });
};


// Функция для создания карты
const addMap = () => {
  //Вызов функции для перевода страницы в неактивное состояние
  deActivePage ();
  // Функция для добавления карты Leaflet на страницу
  addLeafletMap();
  // Функция для создания основного маркера
  addBasicMarker();
  // Добавляем маркеры похожих объявлений на страницу
  addAdditionalMarkers();
};

export {addMap};
