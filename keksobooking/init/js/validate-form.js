import {
  adForm,
  formTitle,
  formPrice,
  formAddress,
  roomsSelect,
  guestsSelect,
  guestsSelectParent,
  roomsSelectParent
} from './dom-elements.js';
import {
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  MAX_PRICE,
  PostfixGuests,
  PostfixRoomsIn,
  // RoomOptions,
  // GuestsOptions,
  AccomodationOptions
} from './constants.js';
import{ closerMinPrice } from './form-advertisement.js';
import {
  closerLat,
  closerLng
} from './map.js';
import {
  getPostfix
} from './utils.js';


let capacityCurrentIndex;
let alowed = [];
// let alowedRooms = [];

const pristine = new Pristine(
  adForm,
  {
    classTo: 'ad-form__element-validate',
    errorTextClass: 'ad-form__element-validate--error',
    errorTextParent: 'ad-form__element-validate',
  },
);

const validateTitle = (value) =>
  value.length >= MIN_TITLE_LENGTH && value.length <= MAX_TITLE_LENGTH;
const getTitleErrorMessage = () =>
  `Mинимальная длина заголовка ${MIN_TITLE_LENGTH} символов, максимальная ${MAX_TITLE_LENGTH}`;

const validatePrice = (value) => value >= closerMinPrice() && value <= MAX_PRICE;
const getPriceErrorMessage = () => `Min цена ${closerMinPrice().toLocaleString('ru')}. Max цена ${MAX_PRICE.toLocaleString('ru')} руб.`;

const validateAddress = (value) => value === `lat: ${closerLat()}, lng: ${closerLng()}`;
const getAddressErrorMessage = () => 'Переместите красную метку на карте на адрес жилья';

const validateAccomodation = (value, arrayToCheck, chosenOption, optionToCheck) => {
  capacityCurrentIndex  = arrayToCheck.findIndex((option) => option[chosenOption] === parseInt(value, 10));
  alowed = arrayToCheck[capacityCurrentIndex][optionToCheck];
  console.log(parseInt(value, 10), alowed);
  console.log(alowed.includes(parseInt(value, 10)));
  return alowed.includes(parseInt(value, 10));};


const getGuestsErrorMessage = () => {
  let message = 'Возможно размещение в ';
  for(let i = 0; i < alowed.length; i++) {
    message += `${alowed[i]} , `;
  }
  message = message.slice(0, -2) + getPostfix(alowed.pop(), PostfixRoomsIn);
  return message;
};

const validateGuests = (value) => {
  const arrayToCheck = AccomodationOptions.GUESTS;
  const chosenOption = 'GUESTS_OPTION';
  const optionToCheck = 'ROOMS';
  validateAccomodation(value, arrayToCheck, chosenOption, optionToCheck);
};

const validateRooms = (value) => {
  const arrayToCheck = AccomodationOptions.ROOMS;
  const chosenOption = 'ROOM_OPTION';
  const optionToCheck = 'GUESTS';
  validateAccomodation(value, arrayToCheck, chosenOption, optionToCheck);
};

const getRoomsErrorMessage = () => {
  let message = 'Возможно размещение ';
  for(let i = 0; i < alowed.length; i++) {
    message += `${alowed[i]} , `;
  }
  message = message.slice(0, -2) + getPostfix(alowed.pop(), PostfixGuests);
  return message;

};

pristine.addValidator(
  formTitle,
  validateTitle,
  getTitleErrorMessage
);

pristine.addValidator(
  formPrice,
  validatePrice,
  getPriceErrorMessage
);

pristine.addValidator(
  formAddress,
  validateAddress,
  getAddressErrorMessage
);

pristine.addValidator(
  roomsSelect,
  validateRooms,
  getRoomsErrorMessage
);

pristine.addValidator(
  guestsSelect,
  validateGuests,
  getGuestsErrorMessage
);

const isValid = () => pristine.validate();
const resetValidation = () => pristine.reset();

export { isValid, resetValidation };
