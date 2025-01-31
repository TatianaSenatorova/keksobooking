import {
  adForm,
  avatarChooser,
  avatarPreview
} from './dom-elements.js';
import {
  FILE_TYPES
} from './constants.js';

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
