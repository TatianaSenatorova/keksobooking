import {
  PopupClasses,
  PostfixGuests,
  PostfixRooms,
  Accomodation,
} from './constants.js';
import { findTemplate, getPostfix } from './utils.js';

const template = findTemplate('card');

const popup = template.cloneNode(true);

const contentAvatar = (tag, appartment, popupClass) => {
  tag.src = appartment.author[popupClass.DATA_KEY]
    ? `../${appartment.author[popupClass.DATA_KEY]}`
    : '';
};

const contentCapacity = (tag, appartment, popupClass) => {
  if (
    !appartment.offer[popupClass.ROOMS] &&
    !appartment.offer[popupClass.GUESTS]
  ) {
    tag.textContent = '';
  } else {
    const rooms = appartment.offer[popupClass.ROOMS]
      ? `${appartment.offer[popupClass.ROOMS]} ${getPostfix(
        appartment.offer[popupClass.ROOMS],
        PostfixRooms
      )}`
      : '';
    const guests = appartment.offer[popupClass.GUESTS]
      ? `для ${appartment.offer[popupClass.GUESTS]} ${getPostfix(
        appartment.offer[popupClass.GUESTS],
        PostfixGuests
      )}`
      : '';
    tag.textContent = `${rooms} ${guests}`;
  }
};

const contentTime = (tag, appartment, popupClass) => {
  if (
    !appartment.offer[popupClass.CHECKIN] &&
    !appartment.offer[popupClass.CHECKOUT]
  ) {
    tag.textContent = '';
  } else {
    const checkin = appartment.offer[popupClass.CHECKIN] ? `Заезд после ${
      appartment.offer[popupClass.CHECKIN]}, ` : '';
    const checkout = appartment.offer[popupClass.CHECKOUT] ? `выезд до ${appartment.offer[popupClass.CHECKOUT]}` : '';
    tag.textContent = `${checkin} ${checkout}`;
  }
};


const contentPrice = (tag, appartment, popupClass) => {
  if (appartment.offer[popupClass.DATA_KEY]) {
    tag.innerHTML = `${
      appartment.offer[popupClass.DATA_KEY]
    }<span> ₽/ночь</span>`;
  } else {
    tag.innerHTML = '';
  }
};

const contentDefault = (tag, appartment, popupClass, isAccomodation) => {
  if (!appartment.offer[popupClass.DATA_KEY]) {
    tag.textContent = '';
  } else {
    tag.textContent = isAccomodation
      ? Accomodation[appartment.offer[popupClass.DATA_KEY]]
      : appartment.offer[popupClass.DATA_KEY];
  }
};

const contentFeatures = (appartmentFeatures, popupClass) => {
  if (appartmentFeatures) {
    Array.from(popup.querySelectorAll(`.${popupClass.CLASS_NAME}`)
    ).forEach((item) => item.classList.remove('visually-hidden'));
    popupClass.MODIFIERS.map((feature) => {
      if (!appartmentFeatures.includes(feature)) {
        popup
          .querySelector(`.${popupClass.CLASS_NAME}--${feature}`)
          .classList.add('visually-hidden');
      }
    });
  }
};

const createPopup = (appartment) => {
  PopupClasses.map((popupClass) => {
    switch (popupClass.DATA_KEY) {
      case 'avatar':
        {
          const avatar = popup.querySelector(`.${popupClass.CLASS_NAME}`);
          contentAvatar(avatar, appartment, popupClass);
        }
        break;
      case 'capacity':
        {
          const capacity = popup.querySelector(`.${popupClass.CLASS_NAME}`);
          contentCapacity(capacity, appartment, popupClass);
        }
        break;
      case 'time':
        {
          const time = popup.querySelector(`.${popupClass.CLASS_NAME}`);
          contentTime(time, appartment, popupClass);
        }
        break;
      case 'features': {
        const appartmentFeatures = appartment.offer.features;
        contentFeatures(appartmentFeatures, popupClass);
        break;
      }
      case 'price':
        {
          const element = popup.querySelector(`.${popupClass.CLASS_NAME}`);
          contentPrice(element, appartment, popupClass);
        }
        break;
      default:
        {
          const element = popup.querySelector(`.${popupClass.CLASS_NAME}`);
          let isAccomodation = false;
          if (popupClass.DATA_KEY === 'type') {
            isAccomodation = true;
          }
          contentDefault(element, appartment, popupClass, isAccomodation);
        }
        break;
    }
  });
  return popup;
};

export { createPopup };
