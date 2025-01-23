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

const filterType = (appartment) =>
  typeSelect.value === appartment.offer.type ||
  typeSelect.value === DEFAULT_SELECT_VALUE;

const filterPrice = (appartment) =>
  ((appartment.offer.price > PriceRange[priceSelect.value].min &&
    appartment.offer.price < PriceRange[priceSelect.value].max) ||   priceSelect.value === DEFAULT_SELECT_VALUE);

const filterRooms = (appartment) =>
  parseInt(roomSelect.value, 10) === appartment.offer.rooms ||
  roomSelect.value === DEFAULT_SELECT_VALUE;

const filterFeatures = (appartment) => {
  const checkBoxesArray = [];
  Array.from(featureCheckBoxes).map((checkbox) => {
    if (checkbox.checked === true) {
      checkBoxesArray.push(checkbox.value);
    }
  });
  if(appartment.offer.features) {
    return checkBoxesArray.every((checkbox) =>
      appartment.offer.features.includes(checkbox));
  }
  return appartment;
};

const getFilteredAppartments = () => {
  console.log(appartments);
  filteredAppartments = [];
  for (let i = 0; i < appartments.length; i++) {
    if (
      filterType(appartments[i]) &&
      filterRooms(appartments[i]) &&
      filterPrice(appartments[i]) &&
      filterFeatures(appartments[i])
    ) {
      filteredAppartments.push(appartments[i]);
    }
  }
  console.log(filteredAppartments);
};

const setFilters = (appartmentsData) => {
  appartments = appartmentsData;
  filtersForm.addEventListener('change', () =>
    getFilteredAppartments()
  );
};

export { setFilters };
