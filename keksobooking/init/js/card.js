import {
  AllKeysForCard,
  PostfixGuests,
  PostfixRooms,
  Accomodation,
} from './constants.js';
import {
  findTemplate,
  getPostfix,
  getAllKeys
} from './utils.js';

const template = findTemplate('card');

const fillAvatar = (tag, dataKey) => {
  tag.src = dataKey ? `../${dataKey}` : '';
};

const isExistKey = (firstKey, secondKey = true) =>firstKey || secondKey;

const fillCapacity = (tag, dataKeyRooms, dataKeyGuests) => {
  if(isExistKey(dataKeyRooms, dataKeyGuests)){
    const rooms = dataKeyRooms
      ? `${dataKeyRooms} ${getPostfix(dataKeyRooms, PostfixRooms)}`
      : '';
    const guests = dataKeyGuests
      ? `для ${dataKeyGuests} ${getPostfix(dataKeyGuests, PostfixGuests)}`
      : '';
    tag.textContent = `${rooms} ${guests}`;
  }
};

const fillTime = (tag, dataKeyCheckIn, dataKeyCheckOut) => {
  if(isExistKey(dataKeyCheckIn, dataKeyCheckOut)) {
    const checkin = dataKeyCheckIn ? `Заезд после ${
      dataKeyCheckIn}, ` : '';
    const checkout = dataKeyCheckOut ? `выезд до ${dataKeyCheckOut}` : '';
    tag.textContent = `${checkin} ${checkout}`;
  }
};

const fillPrice = (tag, dataKey) => {
  tag.innerHTML = dataKey ? `${ dataKey }<span> ₽/ночь</span>` : '';
};

const fillDefault = (tag, dataKey, isAccomodation = false) => {
  if(dataKey){
    console.log(tag);
    tag.textContent = isAccomodation
      ? Accomodation[dataKey]
      : dataKey;
  }
};

const hideFeatures = (featuresDomArray) => featuresDomArray.map((feature) => feature.classList.add('visually-hidden'));

const fillFeatures = (featuresParent, appartmentFeatures, featuresDomArray, PopupKeys) => {
  PopupKeys.MODIFIERS.map((modifier) => {
    if (appartmentFeatures.includes(modifier)) {
      featuresParent
        .querySelector(`.${PopupKeys.CLASS_NAME}--${modifier}`)
        .classList.remove('visually-hidden');
    }
  });
};

const renderPhotos = (parent, photosDataArray, photo) => {
  photosDataArray.forEach((photoSrc) => {
    console.log(photo);
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
  const featuresParent = popup.querySelector('.popup__features');
  const featuresNodeList = featuresParent.querySelectorAll('.popup__feature');
  hideFeatures(Array.from(featuresNodeList));
  const description = popup.querySelector('.popup__description');
  description.textContent = '';
  const photosParent = popup.querySelector('.popup__photos');
  const photo = photosParent.querySelector('.popup__photo');
  photosParent.innerHTML = '';
  cb(appartment, popup, avatar, title, address, price, type, capacity, time, featuresParent, featuresNodeList, description, photosParent, photo);
};


const fillCard = (appartment, popup, avatar, title, address, price, type, capacity, time, featuresParent, featuresNodeList, description, photosParent, photo) => {


  // PopupKeyses.map((PopupKeys) => {
  //   switch (PopupKeys.DATA_KEY) {
  //     case 'avatar':
  //       fillAvatar(avatar, appartment.author[PopupKeys.DATA_KEY]);
  //       break;
  //     case 'capacity':
  //       fillCapacity(capacity, appartment.offer[PopupKeys.ROOMS], appartment.offer[PopupKeys.GUESTS]);
  //       break;
  //     case 'time':
  //       fillTime(time, appartment.offer[PopupKeys.CHECKIN], appartment.offer[PopupKeys.CHECKOUT]);
  //       break;
  //     case 'features': {
  //       const featuresDomArray = Array.from(featuresNodeList);
  //       if(appartment.offer[PopupKeys.DATA_KEY]) {
  //         fillFeatures(featuresParent, appartment.offer[PopupKeys.DATA_KEY], featuresDomArray, PopupKeys);
  //       }
  //     }
  //       break;
  //     case 'price':
  //       fillPrice(price, appartment.offer[PopupKeys.DATA_KEY]);
  //       break;
  //     case 'photos': {
  //       if(appartment.offer[PopupKeys.DATA_KEY]) {
  //         renderPhotos(photosParent, appartment.offer[PopupKeys.DATA_KEY], photo);
  //       }
  //     }
  //       break;
  //     case 'type': {
  //       const isAccomodation = true;
  //       fillDefault(type, appartment.offer[PopupKeys.DATA_KEY], isAccomodation);
  //     }
  //       break;
  //     case 'title': {
  //       fillDefault(title, appartment.offer[PopupKeys.DATA_KEY]);
  //     }
  //       break;
  //     case 'description': {
  //       fillDefault(description, appartment.offer[PopupKeys.DATA_KEY]);
  //     }
  //       break;
  //     case 'address': {
  //       fillDefault(address, appartment.offer[PopupKeys.DATA_KEY]);
  //     }
  //       break;
  //   }
  // });
  // return popup;
};

const filterKeys = (allDataKeys) => allDataKeys.filter((key) => AllKeysForCard.includes(key));

const createCard = (appartment) => {
  const popup = template.cloneNode(true);
  clearCard(popup, appartment, fillCard);
  const existedKeys = filterKeys(getAllKeys(appartment));
  console.log(existedKeys);
  return popup;
};

export { createCard };
