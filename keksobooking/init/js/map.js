import {
  TILE_LAYER,
  MAX_MAP_ZOOM,
  CURRENT_ZOOM,
  MAP_ATTRIBUTION,
  TokioCoordinates
} from './constants.js';

const  getMap = async () =>{
  const map = await L.map('map-canvas');

  map.setView([TokioCoordinates.LATITUDE, TokioCoordinates.LONGITUDE], CURRENT_ZOOM);

  L.tileLayer(TILE_LAYER, {
    maxZoom: MAX_MAP_ZOOM,
    attribution: MAP_ATTRIBUTION
  }).addTo(map);
  return map;
};

export { getMap };
