import {
  MAP_LEAFLET,
  TILE_LAYER,
  MAX_MAP_ZOOM,
  CURRENT_ZOOM,
  MAP_ATTRIBUTION,
  TokioCoordinates
} from './constants.js';
import { disablePage } from './form-advertisement.js';

// import { disablePage } from './form-advertisement.js';

const getMap = () =>{
  MAP_LEAFLET.on('load', () => {
    disablePage(false);
  });

  MAP_LEAFLET.setView([TokioCoordinates.LATITUDE, TokioCoordinates.LONGITUDE], CURRENT_ZOOM);

  L.tileLayer(TILE_LAYER, {
    maxZoom: MAX_MAP_ZOOM,
    attribution: MAP_ATTRIBUTION
  }).addTo(MAP_LEAFLET);
};

export {getMap};
