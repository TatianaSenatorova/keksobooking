import {
  filtersForm
} from './dom-elements.js';
import {
  SelectNameObjectKey
} from './constants.js';


const filters = {};

const getFilters = (target) => {
  const filterKey = SelectNameObjectKey[target.name];
  if(target.classList.contains('map__filter')) {
    filters[filterKey] = target.value;
  } else if(target.checked && !filters[filterKey]){
    filters[filterKey] = [target.value];
  } else {
    filters[filterKey].push(target.value);
  }
  return filters;
};


filtersForm.addEventListener('change', ({ target }) => {
  getFilters(target);
});
