import {
  adForm,
  formTitle,
  formPrice,
  formAddress,
  roomsSelect,
  capacitySelect
} from './dom-elements.js';
import {
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  MAX_PRICE,
  Accomodation,
  Capacity
} from './constants.js';
import{ closerMinPrice } from './form-advertisement.js';
import {
  closerLat,
  closerLng
} from './map.js';

// let minPrice;

// export const newIt  = (newMinPrice) => {
//   minPrice = newMinPrice;
// };
// console.log(newIt());

// пришло добавить в разметку класс ad-form__element-validate для элементов формы, которые будут валидироваться, чтобы было куда добавить сообщение об ошибке

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

const validateRooms = (value) => {
  console.log(value);
  console.log(Capacity.findIndex((item) => item.ROOM_OPTION === parseInt(value, 10)));
  return Capacity.indexOf(Capacity.ROOM_OPTION === value)};
const getRoomsErrorMessage = () => 'Переместите красную метку на карте на адрес жилья';


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

const isValid = () => pristine.validate();
const resetValidation = () => pristine.reset();

export { isValid, resetValidation };
