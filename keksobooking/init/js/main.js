import { disablePage } from './disable-page.js';
import {
  getMap,
  renderMarkers
 } from './map.js';
import { getData } from './api.js';
import { addTagError } from './utils.js';
import {
  ERROR_MESSAGE_MAP,
  ERROR_MESSAGE_DATA
} from './constants.js';
import './map.js';
import { setFilters} from './form-filters.js';

disablePage();

getMap()
  .then((map) => {
    getData()
      .then((appartments)=>{
        console.log(appartments);
        disablePage(false);
        renderMarkers(appartments);
        setFilters(appartments);
      })
      .catch(() => {
        addTagError(ERROR_MESSAGE_DATA);
      })
      .catch(() => {
        addTagError(ERROR_MESSAGE_MAP);
      });
  });
