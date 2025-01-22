const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('.ad-form__element');
const filtersForm = document.querySelector('.map__filters');
const mapFilterSelects = filtersForm.querySelectorAll('.map__filter');
const checkBoxes = filtersForm.querySelectorAll('.map__checkbox');
const map = document.querySelector('.map__canvas');
const formMap = document.querySelector('.map__filters');

export {
  adForm,
  adFormFieldsets,
  filtersForm,
  mapFilterSelects,
  checkBoxes,
  map,
  formMap,
};
