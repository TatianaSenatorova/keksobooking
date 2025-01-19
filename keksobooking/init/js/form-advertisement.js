import {
  adForm,
  adFormFieldsets,
  filtersForm,
  mapFilterSelects,

} from './dom-elements.js';
import {
  DISABLE_CLASS_FORM,
  DISABLE_CLASS_FILTERS
} from './constants.js';


const disableForm = (form, fieldSets, disableClass, isDisable) => {
  if(isDisable) {
    form.classList.add(disableClass);
  }
  form.classList.remove(disableClass);
  fieldSets.forEach((fildset) => {
    fildset.disabled = isDisable;
  });
};

const disablePage = (isDisable = true) => {
  disableForm(adForm, adFormFieldsets, DISABLE_CLASS_FORM, isDisable);
  disableForm(filtersForm, mapFilterSelects, DISABLE_CLASS_FILTERS, isDisable);
};


export { disablePage };
