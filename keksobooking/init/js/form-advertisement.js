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

formType.addEventListener('change', ({target}) =>{
  formPrice.placeholder = Accomodation[target.value].minPrice;
  changeSliderOptions(target.value);
  updateSlider(Accomodation[target.value].minPrice);
});
