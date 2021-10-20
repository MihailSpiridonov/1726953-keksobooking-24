import {getAdSimilar} from './ad-similar.js';

getAdSimilar;

// Копируем шаблон карточки с объявлением из template
const mapCanvas = document.querySelector('.map__canvas');
const offerCard = document.querySelector('#card');
const card = offerCard.content.cloneNode(true);
mapCanvas.appendChild(card);


// Функция для наполнение шаблона данными
const fillTemplate = function () {
  const avatar = document.querySelector('.popup__avatar');
  avatar ? avatar.src = getAdSimilar().author.avatar : avatar.remove();

  const title = document.querySelector('.popup__title');
  title ? title.textContent = getAdSimilar().offer.title : title.remove();

  const address = document.querySelector('.popup__text--address');
  address ? address.textContent = getAdSimilar().offer.address : address.remove();

  const price = document.querySelector('.popup__text--price');
  price ? price.textContent = `${getAdSimilar().offer.price  }₽/ночь` : price.remove();

  const type = document.querySelector('.popup__type');
  type ? type.textContent = getAdSimilar().offer.type : type.remove();

  const capacity = document.querySelector('.popup__text--capacity');
  capacity ? capacity.textContent = `${getAdSimilar().offer.rooms  } комнаты для ${  getAdSimilar().offer.quests  } гостей` : capacity.remove();

  const time = document.querySelector('.popup__text--time');
  time ? time.textContent = `Заезд после ${  getAdSimilar().offer.checkin  }, выезд до ${  getAdSimilar().offer.checkout}` : time.remove();

  const features = document.querySelector('.popup__features');
  const featureFragment = document.createDocumentFragment();
  getAdSimilar().offer.features.forEach((dataFeature) => {
    const feature = features.querySelector(`.popup__feature--${  dataFeature}`);
    if (feature) {
      featureFragment.append(feature);
    }
  });
  features.innerHTML = '';
  features.append(featureFragment);

  const description = document.querySelector('.popup__description');
  description ? description.textContent = getAdSimilar().offer.description : description.remove();

  const photos = document.querySelector('.popup__photos');
  const photo = document.querySelectorAll('.popup__photo');
  if (getAdSimilar().offer.photos.length < 1) {
    photos.remove();
  } else {
    if (getAdSimilar().offer.photos.length === 1) {
      photo[0].src = getAdSimilar().offer.photos[0];
    } else {
      for (let i=0; i<getAdSimilar().offer.photos.length; i++) {
        const offerPhoto = photo[0].cloneNode(true);
        photo[0].remove();
        offerPhoto.src = getAdSimilar().offer.photos[i];
        photos.appendChild(offerPhoto);
      }
    }
  }
};


export {fillTemplate};
