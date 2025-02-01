import {
  adForm,
  formTitle,
  formPrice,
  slider
} from './dom-elements.js';
import {
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  MAX_PRICE,
  MIN_PRICE,
  sliderInitValues
} from './constants.js';


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

const validatePrice = (value) =>
  value.length >= MIN_PRICE && value <= MAX_PRICE;
const getPriceErrorMessage = () =>
  `Цена от ${MIN_PRICE} руб. до ${MAX_PRICE} руб.`;

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
