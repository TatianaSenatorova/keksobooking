import {
  formPrice,
  slider
} from './dom-elements.js';
import {
  sliderInitValues
} from './constants.js';

formPrice.value = sliderInitValues.START;

noUiSlider.create(slider, {
  range: {
    min: sliderInitValues.MIN,
    max: sliderInitValues.MAX,
  },
  start: sliderInitValues.START,
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

const updateSlider = (newPrice) =>  slider.noUiSlider.set(newPrice);

formPrice.addEventListener('input', () => updateSlider(formPrice.value));

/*Чтобы была возвожность удалить последню цифру клавишей backspace.
А также удалить полностью выделенное значение в инпуте*/
formPrice.addEventListener('keydown', ({code}) => {
  if (code === 'Backspace' || code === 'Delete' &&
     (formPrice.value < 10 || window.getSelection().toString() === formPrice.value)) {
    formPrice.value = 0;
    updateSlider(formPrice.value);
  }
});

export const resetSlider = () => slider.noUiSlider.reset();
