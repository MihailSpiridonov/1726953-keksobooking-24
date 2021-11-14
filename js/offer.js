// Достаем шаблон карточки с объявлением из template
const popupTemplate = document.querySelector('#card').content.querySelector('.popup');


// Функция для наполнение шаблона данными
const fillTemplate = (serverData) => {
  // Копируем шаблон карточки
  const popup = popupTemplate.cloneNode(true);

  const avatar = popup.querySelector('.popup__avatar');
  avatar ? avatar.src = serverData.author.avatar : avatar.remove();

  const title = popup.querySelector('.popup__title');
  title ? title.textContent = serverData.offer.title : title.remove();

  const address = popup.querySelector('.popup__text--address');
  address ? address.textContent = serverData.offer.address : address.remove();

  const price = popup.querySelector('.popup__text--price');
  price ? price.textContent = `${serverData.offer.price  }₽/ночь` : price.remove();

  const type = popup.querySelector('.popup__type');
  if (type) {
    switch(serverData.offer.type) {
      case 'bungalow':
        type.textContent = 'Бунгало';
        break;

      case 'flat':
        type.textContent = 'Квартира';
        break;

      case 'hotel':
        type.textContent = 'Отель';
        break;

      case 'house':
        type.textContent = 'Дом';
        break;

      case 'palace':
        type.textContent = 'Дворец';
        break;
    }
  } else {
    type.remove();
  }

  const capacity = popup.querySelector('.popup__text--capacity');
  capacity ? capacity.textContent = `${serverData.offer.rooms  } комнаты для ${  serverData.offer.guests  } гостей` : capacity.remove();

  const time = popup.querySelector('.popup__text--time');
  time ? time.textContent = `Заезд после ${  serverData.offer.checkin  }, выезд до ${  serverData.offer.checkout}` : time.remove();

  const features = popup.querySelector('.popup__features');
  const featureFragment = document.createDocumentFragment();
  if (serverData.offer.features) {
    serverData.offer.features.forEach((dataFeature) => {
      const feature = features.querySelector(`.popup__feature--${  dataFeature}`);
      if (feature) {
        featureFragment.append(feature);
      }
    });
  }
  features.innerHTML = '';
  features.append(featureFragment);

  const description = popup.querySelector('.popup__description');
  description ? description.textContent = serverData.offer.description : description.remove();

  const photos = popup.querySelector('.popup__photos');
  const photo = popup.querySelectorAll('.popup__photo');
  if (!serverData.offer.photos) {
    photos.remove();
  } else {
    if (serverData.offer.photos.length === 1) {
      photo[0].src = serverData.offer.photos[0];
    } else {
      for (let i=0; i<serverData.offer.photos.length; i++) {
        const offerPhoto = photo[0].cloneNode(true);
        photo[0].remove();
        offerPhoto.src = serverData.offer.photos[i];
        photos.appendChild(offerPhoto);
      }
    }
  }
  return popup;
};

export {fillTemplate};
