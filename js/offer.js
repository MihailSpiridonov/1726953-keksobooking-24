import {adSimilar} from './ad-similar.js';
import {photosData} from './create-random-value.js';


// Копируем шаблон карточки с объявлением из template
const mapCanvas = document.querySelector('.map__canvas');
const offerCard = document.querySelector('#card');
const card = offerCard.content.cloneNode(true);
mapCanvas.appendChild(card);


// Функция для наполнение шаблона данными
const fillTemplate = function () {
  const avatar = document.querySelector('.popup__avatar');
  avatar ? avatar.src = adSimilar.author.avatar : avatar.remove();

  const title = document.querySelector('.popup__title');
  title ? title.textContent = adSimilar.offer.title : title.remove();

  const address = document.querySelector('.popup__text--address');
  address ? address.textContent = adSimilar.offer.address : address.remove();

  const price = document.querySelector('.popup__text--price');
  price ? price.textContent = `${adSimilar.offer.price  }₽/ночь` : price.remove();

  const type = document.querySelector('.popup__type');
  type ? type.textContent = adSimilar.offer.type : type.remove();

  const capacity = document.querySelector('.popup__text--capacity');
  capacity ? capacity.textContent = `${adSimilar.offer.rooms  } комнаты для ${  adSimilar.offer.quests  } гостей` : capacity.remove();

  const time = document.querySelector('.popup__text--time');
  time ? time.textContent = `Заезд после ${  adSimilar.offer.checkin  }, выезд до ${  adSimilar.offer.checkout}` : time.remove();

  const features = document.querySelector('.popup__features');
  if (!features) {
    features.remove();
  }

  const feature = document.querySelectorAll('.popup__feature');
  feature ? feature.textContent = adSimilar.offer.features : feature.remove();

  const description = document.querySelector('.popup__description');
  description ? description.textContent = adSimilar.offer.description : description.remove();

  const photos = document.querySelector('.popup__photos');
  const photo = document.querySelectorAll('.popup__photo');
  if (!photos) {
    photos.remove();
  } else {
    if (photos.children.length > 1) {
      for (let i=0; i<photosData.length; i++) {
        photo[i].src = photosData[i];
      }
    } else {
      photo[0].src = photosData[0];
    }
  }
};


export {fillTemplate};
