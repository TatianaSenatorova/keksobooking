import {
  adForm,
  formTitle,
  formPrice
} from './dom-elements.js';
import {
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  MAX_PRICE,
  Accomodation
} from './constants.js';
import{ minPriceToImport } from './form-advertisement.js';
console.log(minPriceToImport());

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
  `Mинимальная длина заголовка ${MIN_TITLE_LENGTH}, максимальная ${MAX_TITLE_LENGTH}`;

const validatePrice = (value) => {
  console.log(value, minPriceToImport());
 return value >= minPriceToImport() && value <= MAX_PRICE;

};
const getPriceErrorMessage = () => `Min цена ${minPriceToImport()}. Max цена ${MAX_PRICE} руб.`;

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


const isValid = () => pristine.validate();
const resetValidation = () => pristine.reset();

export { isValid, resetValidation };
