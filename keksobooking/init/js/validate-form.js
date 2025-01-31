import {
  adForm,
  formTitle
} from './dom-elements.js';
import {
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH
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
  `минимальная длина заголовка ${MIN_TITLE_LENGTH}, максимальная ${MAX_TITLE_LENGTH}`;

pristine.addValidator(
  formTitle,
  validateTitle,
  getTitleErrorMessage
);

const isValid = () => pristine.validate();
const resetValidation = () => pristine.reset();

export { isValid, resetValidation };
