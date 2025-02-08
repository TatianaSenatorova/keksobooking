import {
  adForm,
  avatarChooser,
  avatarPreview,
  formType,
  formPrice,
  formPriceParent,
  formAddress,
  formAddressParent,
  formCheckin,
  formCheckout,
  guestsSelect,
  roomsSelect,
  roomsSelectParent,
  guestsSelectParent,
  photoChooser,
  photoPreview,
  submitButton
} from './dom-elements.js';
import {
  FILE_TYPES,
  Accomodation,
  IdTemplatesPopup,
  TokioCoordinates,
  ROUND
} from './constants.js';
import {
  changeSliderOptions,
  updateSlider,
  resetSlider
} from './slider.js';
import {
  isValid,
  resetValidation,
  getMinPrice
} from './validate-form.js';
import { sendData } from './api.js';
import { showPopup } from './utils.js';
import { resetMap } from './map.js';

formPrice.placeholder = Accomodation[formType.value].minPrice;
formAddress.value = `lat: ${TokioCoordinates.LATITUDE.toFixed(ROUND)}, lng: ${TokioCoordinates.LONGITUDE.toFixed(ROUND)}`;

const setInitAddress = () =>{
  formAddress.value = `lat: ${TokioCoordinates.LATITUDE.toFixed(ROUND)}, lng: ${TokioCoordinates.LONGITUDE.toFixed(ROUND)}`;
};
setInitAddress();

const uploadPhoto = (fileInput, parentForPhotos) => {
  const file = fileInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches && fileInput === avatarChooser) {
    const url = URL.createObjectURL(file);
    parentForPhotos.src = url;
  } else if (matches && fileInput === photoChooser){
    const url = URL.createObjectURL(file);
    parentForPhotos.insertAdjacentHTML('beforeend', `<img src=${url} width='70' height='70'>`);
  }
};

export const checkIsError = (parent) => {
  if(parent.querySelector('.ad-form__element-validate--error')) {
    parent.querySelector('.ad-form__element-validate--error').
      style.display = 'none';
  }
};

export const changeAddress = (coordinates) => {
  checkIsError(formAddressParent);
  formAddress.value = `lat: ${coordinates.lat.toFixed(ROUND)}, lng: ${coordinates.lng.toFixed(ROUND)}`;
};

export const checkIsErrorLinkSelect = (target) =>{
  if(target === guestsSelect) {checkIsError(roomsSelectParent);}
  else {checkIsError(guestsSelectParent);}
};

const changeMinPrice = (target) => {
  const minPrice = Accomodation[target.value].minPrice;
  formPrice.placeholder = minPrice;
  formPrice.value = minPrice;
  getMinPrice(minPrice);
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
      uploadPhoto(avatarChooser, avatarPreview);
      break;
    case photoChooser:
      uploadPhoto(photoChooser, photoPreview);
      break;
    case formType:
      changeMinPrice(target);
      break;
    case formCheckin:
    case formCheckout:
      changeTime(target);
      break;
    case roomsSelect:
    case guestsSelect:
      checkIsErrorLinkSelect(target);
      break;
    default:
      break;
  }
});

formPrice.addEventListener('input', () => {
  if(!formPrice.value.length){
    formPrice.value = 0;
  }
  updateSlider(parseInt(formPrice.value, 10));});

const blockSubmitButton = (isBlocked = true) => {
  submitButton.disabled = isBlocked;
};

const resetForm = () => {
  adForm.reset();
};

const removePhotos = () => {
  avatarPreview.src = '';
  photoPreview.innerHTML = '';
};

const clearForm = () => {
  resetValidation();
  resetForm();
  resetSlider();
  removePhotos();
  resetMap();
  setInitAddress();
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (isValid()) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(() => {
        clearForm();
        showPopup(IdTemplatesPopup.SUCCESS);
      })
      .catch(() => showPopup(IdTemplatesPopup.ERROR))
      .finally(() => blockSubmitButton(false));
  }
});


