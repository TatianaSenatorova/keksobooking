import {
  TILE_LAYER,
  MAX_MAP_ZOOM,
  CURRENT_ZOOM,
  MAP_ATTRIBUTION,
  TokioCoordinates,
  specialMarker,
  appartmentMarker,
  APPARTMENTS_TO_RENDER
} from './constants.js';

let map;

const  getMap = async () =>{
  map = await L.map('map-canvas');

  map.setView([TokioCoordinates.LATITUDE, TokioCoordinates.LONGITUDE], CURRENT_ZOOM);

  L.tileLayer(TILE_LAYER, {
    maxZoom: MAX_MAP_ZOOM,
    attribution: MAP_ATTRIBUTION
  }).addTo(map);

  const mainMarker = L.marker([TokioCoordinates.LATITUDE, TokioCoordinates. LONGITUDE], {icon: specialMarker, draggable: true}).addTo(map);

  return map;
};

const renderMarkers = (appartmentsArray) => {
  appartmentsArray.slice(0, APPARTMENTS_TO_RENDER).map((appartment) => {
    L.marker([appartment.location.lat, appartment.location.lng], {icon: appartmentMarker}).addTo(map);
  });
};

export { getMap, renderMarkers};
