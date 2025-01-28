import {
  PopupClasses,
  PostfixGuests,
  PostfixRooms,
  Accomodation,
} from './constants.js';
import { findTemplate, getPostfix } from './utils.js';

const template = findTemplate('card');

const popup = template.cloneNode(true);
let photoTag = '';

const findDomElement = (className) => popup.querySelector(`.${className}`);
const findDomElements = (className) => popup.querySelectorAll(`.${className}`);

const fillAvatar = (tag, dataKey) => {
  tag.src = dataKey ? `../${dataKey}` : '';
};

const isExistKey = (tag, firstKey, secondKey = true) =>{
  if (!firstKey && !secondKey) {
    tag.textContent = '';
    return false;
  }
  return true;
};

const fillCapacity = (tag, dataKeyRooms, dataKeyGuests) => {
  if(isExistKey(tag, dataKeyRooms, dataKeyGuests)){
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
  if(isExistKey(tag, dataKeyCheckIn, dataKeyCheckOut)) {
    const checkin = dataKeyCheckIn ? `Заезд после ${
      dataKeyCheckIn}, ` : '';
    const checkout = dataKeyCheckOut ? `выезд до ${dataKeyCheckOut}` : '';
    tag.textContent = `${checkin} ${checkout}`;
  }
};

const fillPrice = (tag, dataKey) => {
  tag.innerHTML = dataKey ? `${ dataKey }<span> ₽/ночь</span>` : '';
};

const fillDefault = (tag, dataKey, isAccomodation) => {
  if(isExistKey(tag, dataKey)){
    tag.textContent = isAccomodation
      ? Accomodation[dataKey]
      : dataKey;
  }
};

const hideFeatures = (featuresDomArray) => featuresDomArray.map((feature) => feature.classList.add('visually-hidden'));

const fillFeatures = (appartmentFeatures, featuresDomArray, popupClass) => {
  featuresDomArray.forEach((item) => item.classList.remove('visually-hidden'));
  popupClass.MODIFIERS.map((modifier) => {
    if (!appartmentFeatures.includes(modifier)) {
      popup
        .querySelector(`.${popupClass.CLASS_NAME}--${modifier}`)
        .classList.add('visually-hidden');
    }
  });
};

const clearPhotos = (parent) => {
  photoTag.src = '';
  parent.innerHTML = '';
};

const renderPhotos = (parent, photosDataArray) => {
  photosDataArray.forEach((photoSrc) => {
    const newImg = photoTag.cloneNode();
    newImg.src = photoSrc;
    parent.append(newImg);
  });
};

const createPopup = (appartment) => {
  PopupClasses.map((popupClass) => {
    switch (popupClass.DATA_KEY) {
      case 'avatar':
        fillAvatar(findDomElement(popupClass.CLASS_NAME), appartment.author[popupClass.DATA_KEY]);
        break;
      case 'capacity':
        fillCapacity(findDomElement(popupClass.CLASS_NAME), appartment.offer[popupClass.ROOMS], appartment.offer[popupClass.GUESTS]);
        break;
      case 'time':
        fillTime(findDomElement(popupClass.CLASS_NAME), appartment.offer[popupClass.CHECKIN], appartment.offer[popupClass.CHECKOUT]);
        break;
      case 'features':{
        const featuresDomArray = Array.from(findDomElements(popupClass.CLASS_NAME));
        if(appartment.offer[popupClass.DATA_KEY]) {
          fillFeatures(appartment.offer[popupClass.DATA_KEY], featuresDomArray, popupClass);
        } else{
          hideFeatures(featuresDomArray);
        }
      }
        break;
      case 'price':
        fillPrice(findDomElement(popupClass.CLASS_NAME), appartment.offer[popupClass.DATA_KEY]);
        break;
      case 'photos': {
        const photosParent = findDomElement(popupClass.CLASS_NAME);
        photoTag = findDomElement(popupClass.CLASS_NAME_CHILDREN);
        clearPhotos(photosParent);
        if(appartment.offer[popupClass.DATA_KEY]) {
          renderPhotos(photosParent, appartment.offer[popupClass.DATA_KEY]);
        }
      }
        break;
      default:
        {
          const isAccomodation = popupClass.DATA_KEY === 'type';
          fillDefault(findDomElement(popupClass.CLASS_NAME), appartment.offer[popupClass.DATA_KEY], isAccomodation);
        }
        break;
    }
  });
  return popup;
};

export { createPopup };
