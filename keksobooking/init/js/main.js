import { disablePage } from './form-advertisement.js';
import { getMap } from './map.js';
import { getData } from './api.js';
import { saveData } from './data.js';
import { addTagTimeout } from './utils.js';
import {
  ERROR_GET_MESSAGE,
  ErrorElementStyles
} from './constants.js';
import { renderMarkers} from './render-appartments.js';
import './map.js';
import './form-filters.js';

disablePage();
getMap();
try {
  const appartments = await getData();
  saveData(appartments);
  renderMarkers(appartments);
} catch {
  addTagTimeout(ERROR_GET_MESSAGE, ErrorElementStyles);
}


