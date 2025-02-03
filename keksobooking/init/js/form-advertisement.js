import {
  adForm,
  avatarChooser,
  avatarPreview,
  formType,
  formPrice,
  formPriceParent,
  formAddress,
  formCheckin,
  formCheckout
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
export const getLatLngMainMarker = (lat, lng) => {
  formAddress.value = `lat: ${lat.toFixed(5)}, lng: ${lng.toFixed(5)}`;
};

const getMinPrice = () => function (){
  return currentMinPrice;
};

export const closerMinPrice = getMinPrice();

const uploadAvatar = () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const url = URL.createObjectURL(file);
    avatarPreview.src = url;
  }
};

export const checkIsError = (parent) => {
  if(parent.querySelector('.ad-form__element-validate--error')) {
    parent.querySelector('.ad-form__element-validate--error').
      style.display = 'none';
  }
};

const changeMinPrice = (target) => {
  const minPrice = Accomodation[target.value].minPrice;
  formPrice.placeholder = minPrice;
  formPrice.value = minPrice;
  currentMinPrice = minPrice;
  getMinPrice();
  closerMinPrice();
  changeSliderOptions(minPrice);
  updateSlider(minPrice);
  checkIsError(formPriceParent);
};

const changeTime = (target) =>{
  if(target === formCheckin) {
    formCheckout.value = target.value;
  }else {
    formCheckin.value = target.value;
  }
};

adForm.addEventListener('change', ({target})=>{
  switch (target) {
    case avatarChooser:
      uploadAvatar();
      break;
    case formType:
      changeMinPrice(target);
      break;
    case formCheckin:
    case formCheckout:
      changeTime(target);
      break;
    default:
      break;
  }
});

formPrice.addEventListener('input', () => {
  updateSlider(formPrice.value);});

/*Чтобы была возвожность удалить первую цифру клавишей backspace. А также удалить полностью выделенное значение в инпуте*/
formPrice.addEventListener('keydown', ({code}) => {
  if ((code === 'Backspace' || code === 'Delete') &&
     (formPrice.value < 10 || window.getSelection().toString() === formPrice.value)) {
    formPrice.value = 0;
    updateSlider(formPrice.value);
  }
});
