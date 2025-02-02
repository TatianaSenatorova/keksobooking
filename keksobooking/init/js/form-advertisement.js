import {
  adForm,
  avatarChooser,
  avatarPreview,
  formType,
  formPrice
} from './dom-elements.js';
import {
  FILE_TYPES,
  Accomodation
} from './constants.js';
import {
  changeSliderOptions,
  updateSlider
} from './slider.js';

formPrice.placeholder = Accomodation[formType.value].minPrice;
let currentMinPrice = Accomodation[formType.value].minPrice;

export const getMinPrice = () => function (){
  return currentMinPrice;
};

export const minPriceToImport = getMinPrice();

const uploadAvatar = () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const url = URL.createObjectURL(file);
    avatarPreview.src = url;
  }
};

adForm.addEventListener('change', ({target})=>{
  if(target === avatarChooser) {
    uploadAvatar();
  }
});

formPrice.addEventListener('input', () => updateSlider(formPrice.value));

/*Чтобы была возвожность удалить последню цифру клавишей backspace.
А также удалить полностью выделенное значение в инпуте*/
formPrice.addEventListener('keydown', ({code}) => {
  if ((code === 'Backspace' || code === 'Delete') &&
     (formPrice.value < 10 || window.getSelection().toString() === formPrice.value)) {
    formPrice.value = 0;
    updateSlider(formPrice.value);
  }
});

formType.addEventListener('change', ({target}) =>{
  const minPrice = Accomodation[target.value].minPrice;
  formPrice.placeholder = minPrice;
  formPrice.value = minPrice;
  currentMinPrice = minPrice;
  getMinPrice();
  minPriceToImport();
  changeSliderOptions(minPrice);
  updateSlider(minPrice);
  if(formPrice.closest('.ad-form__element-validate').querySelector('.ad-form__element-validate--error')) {
    formPrice.closest('.ad-form__element-validate').querySelector('.ad-form__element-validate--error').style.display = 'none';
  }
});


