import { disablePage } from './form-advertisement.js';
import { getMap } from './map.js';
import { getData } from './api.js';
import { saveData } from './data.js';
import  './dom-elements.js';
import './map.js';
import './form-filters.js';
import './form-advertisement.js';

disablePage();
getMap();
const appartments = await getData();
saveData(appartments);
console.log(appartments);

// getData()
//   .then((accomodation) => {
//     console.log(accomodation);
    // const newPhotos = photos.slice(0, PHOTO_ITEMS_NUMBER);
    // renderThumbnails(newPhotos);
    // setFilters(photos);
    // getBigPicture((chosenPhotoID) => renderFullPhoto(chosenPhotoID, newPhotos));
  // })
  // .catch(() => {
  //   console.log('123');
  //   // showRequestInfoTimeout(ErrorIdTemplates.LOAD_ERROR);
  // });


