import {
  formPrice,
  slider,
  formType
} from './dom-elements.js';
import {
  sliderInitValues,
  Accomodation
} from './constants.js';

noUiSlider.create(slider, {
  range: {
    min: Accomodation[formType.value].minPrice,
    max: sliderInitValues.MAX,
  },
  start: Accomodation[formType.value].minPrice,
  step: sliderInitValues.STEP,
  connect: sliderInitValues.CONNECT,
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

slider.noUiSlider.on('update', () => {
  formPrice.value = slider.noUiSlider.get();
});

export const updateSlider = (newPrice) =>  slider.noUiSlider.set(newPrice);

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

export const changeSliderOptions = (type) => {
  slider.noUiSlider.updateOptions({
    range: {
      min: parseInt(Accomodation[type].minPrice, 10),
      max: sliderInitValues.MAX,
    },
    start: parseInt(Accomodation[type].minPrice, 10),
    step: sliderInitValues.STEP,
    connect: sliderInitValues.CONNECT,
    format: {
      to: function (value) {
        return value.toFixed(0);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
};

export const resetSlider = () => slider.noUiSlider.reset();
