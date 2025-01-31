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
  sliderValues
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


noUiSlider.create(slider, {
  range: {
    min: sliderValues.MIN,
    max: sliderValues.MAX,
  },
  start: sliderValues.START
});

/*const updateSliderData = (effect) => {
  const effectInFilters = effect.toUpperCase();
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: FilterEffects[effectInFilters].ranges[0],
      max: FilterEffects[effectInFilters].ranges[1]
    },
    start: FilterEffects[effectInFilters].ranges[1],
    step: FilterEffects[effectInFilters].step
  });
};

const changePhotoStyle = (effect) => {
  imgUploadPreview.style.filter = `${effect.filter}(${effectLevelValue.value.trim()}${effect.unit})`;
};

effectsRadioButtons.forEach((button) =>{
  button.addEventListener('change', ({ target }) => {
    imgUploadPreview.style.filter = 'unset';
    if (target.value !== 'none') {
      sliderContainer.classList.remove('hidden');
      const effect = target.value;
      effectLevelValue.setAttribute('data-effect', effect);
      updateSliderData(effect);
    } else if (target.value === 'none') {
      sliderContainer.classList.add('hidden');
    }
  });
});

sliderElement.noUiSlider.on('update', () => {
  effectLevelValue.value = parseFloat(sliderElement.noUiSlider.get());
  if(effectLevelValue.dataset.effect) {
    const effect = FilterEffects[effectLevelValue.dataset.effect.toUpperCase()];
    changePhotoStyle(effect);
  }
});

const removeScaleChanges = () => {
  scaleValue.setAttribute('value', `${ScaleExtremums.MAX}`);
  imgUploadPreview.style.transform = 'scale(1)';
};

const removeFilterStyle = () => {
  imgUploadPreview.style.removeProperty('filter');
};

const hideSlider = () => {
  sliderContainer.classList.add('hidden');
};*/


const isValid = () => pristine.validate();
const resetValidation = () => pristine.reset();

export { isValid, resetValidation };
