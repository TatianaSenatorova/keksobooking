import {
  filtersForm
} from './dom-elements.js';
import {
  PriceRange,
  WITHOUT_FILTER,
  ModelKeys
} from './constants.js';
import { renderMarkers } from './map.js';
import { debounce } from './utils.js';

let appartments = [];
const model = {};

const debounceRender = debounce(renderMarkers);

const FiltersFunctions = {
  TYPE: (appartment) => model.type === appartment.offer.type,
  PRICE: (appartment) =>
    (appartment.offer.price > PriceRange[model.price].min &&
      appartment.offer.price < PriceRange[model.price].max),
  ROOMS: (appartment) =>
    parseInt(model.rooms, 10) === appartment.offer.rooms,
  GUESTS: (appartment) =>
    parseInt(model.guests, 10) === appartment.offer.rooms,
  FEATURES: (appartment) => model.features.every((feature) =>
    appartment.offer.features.includes(feature))
};

const getFilteredAppartments = (filters) =>
  Object.keys(filters).reduce((filteredApps, filter) => {
    filteredApps = filteredApps.filter((app) => filters[filter] === WITHOUT_FILTER ||
    (Array.isArray(filters[filter]) && !filters[filter].length) ||
    (app.offer[filter] && FiltersFunctions[filter.toUpperCase()](app)));
    return filteredApps;
  }, appartments);

const setModel = ({target}) => {
  if (target.tagName === 'SELECT') {
    model[ModelKeys[target.id]] = target.value;
    return model;
  }
  const key = ModelKeys[target.parentNode.id];
  if(target.checked) {
    model[key] =  model[key] ? [...model[key], target.value] : [target.value];
    return model;
  }
  model[key] = model[key].filter((item) => item !== target.value);
  return model;
};

const setFilters = (appartmentsData) => {
  appartments = appartmentsData;
  filtersForm.addEventListener('change', ({target}) => debounceRender(getFilteredAppartments(setModel({target}))));
};

export { setFilters };
