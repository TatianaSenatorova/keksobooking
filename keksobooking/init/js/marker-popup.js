import {
  PopupClasses,
  PostfixGuests,
  PostfixRooms,
  Accomodation,
} from './constants.js';
import { findTemplate, getPostfix } from './utils.js';

const template = findTemplate('card');

const popup = template.cloneNode(true);

const findDomElement = (className) => popup.querySelector(`.${className}`);
const findDomElements = (className) => popup.querySelectorAll(`.${className}`);

const contentAvatar = (tag, dataKey) => {
  tag.src = dataKey ? `../${dataKey}` : '';
};

const contentCapacity = (tag, dataKeyRooms, dataKeyGuests) => {
  if (!dataKeyRooms && !dataKeyGuests) {
    tag.textContent = '';
  } else {
    const rooms = dataKeyRooms
      ? `${dataKeyRooms} ${getPostfix(dataKeyRooms, PostfixRooms)}`
      : '';
    const guests = dataKeyGuests
      ? `для ${dataKeyGuests} ${getPostfix(
        dataKeyGuests,
        PostfixGuests
      )}`
      : '';
    tag.textContent = `${rooms} ${guests}`;
  }
};

const contentTime = (tag, dataKeyCheckIn, dataKeyCheckOut) => {
  if (!dataKeyCheckIn && !dataKeyCheckOut) {
    tag.textContent = '';
  } else {
    const checkin = dataKeyCheckIn ? `Заезд после ${
      dataKeyCheckIn}, ` : '';
    const checkout = dataKeyCheckOut ? `выезд до ${dataKeyCheckOut}` : '';
    tag.textContent = `${checkin} ${checkout}`;
  }
};

const contentPrice = (tag, dataKey) => {
  if (dataKey) {
    tag.innerHTML = `${ dataKey }<span> ₽/ночь</span>`;
  } else {
    tag.innerHTML = '';
  }
};

const contentDefault = (tag, dataKey, isAccomodation) => {
  if (!dataKey) {
    tag.textContent = '';
  } else {
    tag.textContent = isAccomodation
      ? Accomodation[dataKey]
      : dataKey;
  }
};

const hideFeatures = (featuresDomArray) => featuresDomArray.map((feature) => feature.classList.add('visually-hidden'));

const contentFeatures = (appartmentFeatures, featuresDomArray,popupClass) => {
  featuresDomArray.forEach((item) => item.classList.remove('visually-hidden'));
  popupClass.MODIFIERS.map((modifier) => {
    if (!appartmentFeatures.includes(modifier)) {
      popup
        .querySelector(`.${popupClass.CLASS_NAME}--${modifier}`)
        .classList.add('visually-hidden');
    }
  });
};

const createPopup = (appartment) => {
  PopupClasses.map((popupClass) => {
    switch (popupClass.DATA_KEY) {
      case 'avatar':
        contentAvatar(findDomElement(popupClass.CLASS_NAME), appartment.author[popupClass.DATA_KEY]);
        break;
      case 'capacity':
        contentCapacity(findDomElement(popupClass.CLASS_NAME), appartment.offer[popupClass.ROOMS], appartment.offer[popupClass.GUESTS]);
        break;
      case 'time':
        contentTime(findDomElement(popupClass.CLASS_NAME), appartment.offer[popupClass.CHECKIN], appartment.offer[popupClass.CHECKOUT]);
        break;
      case 'features':{
        const featuresDomArray = Array.from(findDomElements(popupClass.CLASS_NAME));
        const appartmentFeatures = appartment.offer[popupClass.DATA_KEY] ? appartment.offer[popupClass.DATA_KEY] : hideFeatures(featuresDomArray);
        contentFeatures(appartmentFeatures, featuresDomArray, popupClass);
      }
        break;
      case 'price':
        contentPrice(findDomElement(popupClass.CLASS_NAME), appartment.offer[popupClass.DATA_KEY]);
        break;
      default:
        {
          let isAccomodation = false;
          if (popupClass.DATA_KEY === 'type') {
            isAccomodation = true;
          }
          contentDefault(findDomElement(popupClass.CLASS_NAME), appartment.offer[popupClass.DATA_KEY], isAccomodation);
        }
        break;
    }
  });
  return popup;
};

export { createPopup };
