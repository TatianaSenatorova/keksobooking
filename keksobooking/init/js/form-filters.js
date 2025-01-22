import {
  filtersForm,
  mapFilterSelects,
  checkBoxes
} from './dom-elements.js';
import {
  SelectNameFilterKeys,
  PriceRange
} from './constants.js';
import { saveData } from './data.js';

const FiltersKeys = {
  'housing-type': 'type',
  'housing-price':  'price',
  'housing-rooms': 'rooms',
  'housing-guests': 'guests',
  'features': 'features'
};

const SORT_FUNCTIONS = {
  getType: () => 0.5 - Math.random(),
  getPrice: (a,b) => b.comments.length - a.comments.length
};

const FiltersFunctions = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

let filters = [];
let appartments = [];
const filteredAppartments = [];
let checkBoxesArray = [];

const getFilters = () => {
  filters = [];
  checkBoxesArray = [];
  Array.from(mapFilterSelects).forEach((filter) => {
    filters.push({[FiltersKeys[filter.name]]: filter.value});
  });
  Array.from(checkBoxes).forEach((checkbox) => {
    if(checkbox.checked) {
      checkBoxesArray.push(checkbox.value);
    }
  });
  if(checkBoxesArray.length) {
    filters.push({[checkBoxes[0].name] : checkBoxesArray});
  }
  console.log(filters);
  return filters;
};

const getFilteredAppartments = (filterObj) =>{
  const arrayToFilter = (filteredAppartments) ? filteredAppartments : appartments;
  console.log(arrayToFilter);
  for (let i = 0; i < arrayToFilter.length; i++) {
    const appartment = arrayToFilter[i];
    if (checkAppartment(appartment, filterObj)) {
      console.log('yes');
      arrayToFilter.push(appartment);
    }
  }
  console.log(arrayToFilter);
};

function checkAppartment(appartment, filterObj) {
  console.log(appartment);
  for (const key in filterObj) {
    // if (key === 'price') {
    //   console.log(appartment.offer.price, filterObj.price.min, filterObj.price.max);
    //   return appartment.offer.price > filterObj.price.min && appartment.offer.price < filterObj.price.max;

      switch (key) {
        case 'price':
          return appartment.offer.price > filterObj.price.min && appartment.offer.price < filterObj.price.max;
        case 'features':
          console.log(appartment.offer.features);
          // return (appartment.offer.features).filter((feature) => filterObj.features.includes(feature));
          break;
        case 5:
          alert( 'Перебор' );
          break;
        default:
          alert( "Нет таких значений" );
      }




  }
}


// const debounceRender = debounce(renderThumbnails);

// const getPhotosToRender = (filter) => {
//   let photosToRender = [];
//   const copyPhotos = photos.slice();
//   switch (filter) {
//     case Filters.RANDOM:
//       photosToRender = copyPhotos.sort(SORT_FUNCTIONS.getRandom).slice(0, PHOTO_NUMBERS_RANDOM);
//       break;
//     case Filters.DISCUSSED:
//       photosToRender = copyPhotos.sort(SORT_FUNCTIONS.getDiscussed).slice(0, PHOTO_NUMBERS_DEFAULT);
//       break;
//     case Filters.DEFAULT:
//       photosToRender = copyPhotos.slice(0, PHOTO_NUMBERS_DEFAULT);
//       break;
//   }
//   debounceRender(photosToRender);
// };
const setFilters = () => {
  appartments = saveData();
  filtersForm.addEventListener('change', ({target}) => getFilteredAppartments(getFilters({target})));
};


export { setFilters };
