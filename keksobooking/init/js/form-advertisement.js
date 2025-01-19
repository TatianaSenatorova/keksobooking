import {
  adForm,
  adFormFieldsets,
  mapFiltersForm,
  mapFilterSelects,

} from './dom-elements.js';
import {
  DISABLE_CLASS_FORM,
  DISABLE_CLASS_FILTERS
} from './constants.js';


const disableForm = (form, fieldSets, disableClass, isDisable) => {
  if(isDisable) {
    form.classList.add(disableClass);
    console.log(...form.classList);
  }
  form.classList.remove(disableClass);
  fieldSets.forEach((fildset) => {
    fildset.disabled = isDisable;
  });
};

const disablePage = (isDisable = true) => {
  disableForm(adForm, adFormFieldsets, DISABLE_CLASS_FORM, isDisable);
  disableForm(mapFiltersForm, mapFilterSelects, DISABLE_CLASS_FILTERS, isDisable);
};


export { disablePage };