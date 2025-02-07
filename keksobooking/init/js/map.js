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
import { createCard } from './card.js';
import {
  getLatLngMainMarker,
  checkIsError
} from './form-advertisement.js';
import { formAddressParent}  from './dom-elements.js';

let map;
let markerGroup;
let mainMarker;
let currentLat;
let currentLng;

const getLat = () => function (){
  return currentLat;
};
export const closerLat = getLat();

const getLng = () => function (){
  return currentLng;
};
export const closerLng = getLng();

const updateMainMarker = (lat, lng) =>{
  currentLat = lat.toFixed(5);
  currentLng = lng.toFixed(5);
};

const getMap = async () => {
  map = await L.map('map-canvas');

  L.tileLayer(TILE_LAYER, {
    maxZoom: MAX_MAP_ZOOM,
    attribution: MAP_ATTRIBUTION,
  }).addTo(map);

  map.setView(
    [TokioCoordinates.LATITUDE, TokioCoordinates.LONGITUDE],
    CURRENT_ZOOM
  );

  mainMarker = L.marker(
    [TokioCoordinates.LATITUDE, TokioCoordinates.LONGITUDE],
    { icon: specialMarker, draggable: true }
  ).addTo(map);

  updateMainMarker(mainMarker._latlng.lat, mainMarker._latlng.lng);
  getLatLngMainMarker(closerLat(), closerLng());

  mainMarker.on('moveend', () => {
    updateMainMarker(mainMarker._latlng.lat, mainMarker._latlng.lng);
    getLatLngMainMarker(closerLat(), closerLng());
    checkIsError(formAddressParent);
  });

  markerGroup = L.layerGroup().addTo(map);
};


const clearMarkerGroup = () => {
  markerGroup.clearLayers();
};

const renderMarkers = (appartmentsArray) => {
  clearMarkerGroup();
  appartmentsArray.slice(0, APPARTMENTS_TO_RENDER).map((appartment) => {
    const marker = L.marker(
      [appartment.location.lat, appartment.location.lng],
      { icon: appartmentMarker }
    ).addTo(markerGroup);
    marker.bindPopup(() => createCard(appartment));
  });
};

export { getMap, renderMarkers };
