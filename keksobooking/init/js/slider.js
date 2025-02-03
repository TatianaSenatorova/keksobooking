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
    min: sliderInitValues.MIN,
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
  console.log();
  formPrice.value = slider.noUiSlider.get();
});

export const updateSlider = (newPrice) => {
  if(newPrice <= sliderInitValues.MAX){slider.noUiSlider.set(newPrice);}
};

export const changeSliderOptions = (minPrice) => {
  slider.noUiSlider.updateOptions({
    range: {
      min: sliderInitValues.MIN,
      max: sliderInitValues.MAX,
    },
    start: minPrice,
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
