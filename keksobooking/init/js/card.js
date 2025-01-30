import {
  AllKeysForCard,
  PostfixGuests,
  PostfixRooms,
  Accomodation
} from './constants.js';
import {
  findTemplate,
  getPostfix,
  getAllKeys
} from './utils.js';

const template = findTemplate('card');
let existedKeys = [];

const fillAvatar = (tag, dataKey) => {
  tag.src = `../${dataKey}`;
};

const fillCapacity = (tag, dataKeyRooms, dataKeyGuests) => {
  const rooms = dataKeyRooms
    ? `${dataKeyRooms} ${getPostfix(dataKeyRooms, PostfixRooms)}`
    : '';
  const guests = dataKeyGuests
    ? `для ${dataKeyGuests} ${getPostfix(dataKeyGuests, PostfixGuests)}`
    : '';
  tag.textContent = `${rooms} ${guests}`;
};

const fillTime = (tag, dataKeyCheckIn, dataKeyCheckOut) => {
  const checkin = dataKeyCheckIn ? `Заезд после ${
    dataKeyCheckIn}, ` : '';
  const checkout = dataKeyCheckOut ? `выезд до ${dataKeyCheckOut}` : '';
  tag.textContent = `${checkin} ${checkout}`;
};

const fillPrice = (tag, dataKey) => {
  tag.innerHTML = `${ dataKey }<span> ₽/ночь</span>`;
};

const fillDefault = (tag, dataKey, isAccomodation = false) => {
  tag.textContent = isAccomodation
    ? Accomodation[dataKey]
    : dataKey;
};

const hideFeatures = (featuresDomArray) => featuresDomArray.map((feature) => feature.classList.add('visually-hidden'));

const fillFeatures = (featuresParent, appartmentFeatures) => {
  appartmentFeatures.map((feature) => {
    featuresParent
      .querySelector(`.popup__feature--${feature}`)
      .classList.remove('visually-hidden');
  });
};

const renderPhotos = (parent, photosDataArray, photo) => {
  photosDataArray.forEach((photoSrc) => {
    const newImg = photo.cloneNode();
    newImg.src = photoSrc;
    parent.append(newImg);
  });
};

const clearCard = (popup, appartment, cb) => {
  const avatar = popup.querySelector('.popup__avatar');
  avatar.src = '';
  const title = popup.querySelector('.popup__title');
  title.textContent = '';
  const address = popup.querySelector('.popup__text--address');
  address.textContent = '';
  const price = popup.querySelector('.popup__text--price');
  price.innerHTML = '';
  const type = popup.querySelector('.popup__type');
  type.textContent = '';
  const capacity = popup.querySelector('.popup__text--capacity');
  capacity.textContent = '';
  const time = popup.querySelector('.popup__text--time');
  time.textContent = '';
  const features = popup.querySelector('.popup__features');
  const featuresNodeList = features.querySelectorAll('.popup__feature');
  hideFeatures(Array.from(featuresNodeList));
  const description = popup.querySelector('.popup__description');
  description.textContent = '';
  const photos = popup.querySelector('.popup__photos');
  const photo = photos.querySelector('.popup__photo');
  photos.innerHTML = '';
  const cardElements = {avatar, title, address, price, type, capacity, time, features, description, photos, photo};
  cb(appartment, cardElements);
};


const fillCard = (appartment, cardElements) => {
  existedKeys.forEach((key) =>{
    switch (key) {
      case 'avatar':
        fillAvatar(cardElements[key], appartment.author[key]);
        break;
      case 'rooms':
      case 'guests':
        fillCapacity(cardElements.capacity, appartment.offer.rooms, appartment.offer.guests);
        break;
      case 'checkin':
      case 'checkout':
        fillTime(cardElements.time, appartment.offer.checkin, appartment.offer.checkout);
        break;
      case 'price':
        fillPrice(cardElements[key], appartment.offer[key]);
        break;
      case 'features':
        fillFeatures(cardElements[key], appartment.offer[key]);
        break;
      case 'photos':
        renderPhotos(cardElements[key], appartment.offer[key], cardElements.photo);
        break;
      case 'type':
        fillDefault(cardElements[key], appartment.offer[key], true);
        break;
      default:
        fillDefault(cardElements[key], appartment.offer[key]);
        break;
    }
  }
  );
};

const filterKeys = (allDataKeys) => allDataKeys.filter((key) => AllKeysForCard.includes(key));

const createCard = (appartment) => {
  const popup = template.cloneNode(true);
  existedKeys = filterKeys(getAllKeys(appartment));
  clearCard(popup, appartment, fillCard);
  return popup;
};

export { createCard };
