import { disablePage } from './disable-page.js';
import { getMap } from './map.js';
import { getData } from './api.js';
import { addTagError } from './utils.js';
import {
  ERROR_MESSAGE_MAP,
  ERROR_MESSAGE_DATA,
  ErrorElementStyles
} from './constants.js';
import { renderMarkers} from './render-appartments.js';
import './map.js';
import { setFilters} from './form-filters.js';

disablePage();

getMap()
  .then((map) => {
    getData()
      .then((appartments)=>{
        disablePage(false);
        renderMarkers(appartments, map);
        setFilters(appartments);
      })
      .catch(() => {
        addTagError(ERROR_MESSAGE_DATA);
      })
      .catch(() => {
        addTagError(ERROR_MESSAGE_MAP);
      });
  });
