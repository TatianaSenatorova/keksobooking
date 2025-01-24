import {
  filtersForm,
  typeSelect,
  priceSelect,
  roomSelect,
  featureCheckBoxes,
} from './dom-elements.js';
import { PriceRange, DEFAULT_SELECT_VALUE } from './constants.js';

let appartments = [];
let filteredAppartments = [];

const FiltersFunctions = {
  TYPE: (appartment) =>  typeSelect.value === appartment.offer.type ||
  typeSelect.value === DEFAULT_SELECT_VALUE,
  PRICE: (appartment) => ((appartment.offer.price > PriceRange[priceSelect.value].min && appartment.offer.price < PriceRange[priceSelect.value].max) ||   priceSelect.value === DEFAULT_SELECT_VALUE),
  ROOMS: (appartment) => parseInt(roomSelect.value, 10) === appartment.offer.rooms || roomSelect.value === DEFAULT_SELECT_VALUE,
  FEATURES: (appartment) => {
    const featuresChosen = (Array.from(featureCheckBoxes).
      filter((checkbox) => checkbox.checked)).
      map((checkbox) => checkbox.value);
    if(featuresChosen.length && appartment.offer.features){
      return featuresChosen.every((feature) =>
        appartment.offer.features.includes(feature));
    }
  },
};

const getFilteredAppartments = () => {
  filteredAppartments = [];
  for (let i = 0; i < appartments.length; i++) {
    if (
      FiltersFunctions.TYPE((appartments[i])) &&
      FiltersFunctions.PRICE((appartments[i])) &&
      FiltersFunctions.ROOMS((appartments[i])) &&
      FiltersFunctions.FEATURES(appartments[i])
    ) {
      filteredAppartments.push(appartments[i]);
    }
  }
};

const setFilters = (appartmentsData) => {
  appartments = appartmentsData;
  filtersForm.addEventListener('change', () =>
    getFilteredAppartments()
  );
};

export { setFilters };
