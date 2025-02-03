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

const getMap = async () => {
  map = await L.map('map-canvas');

  map.setView(
    [TokioCoordinates.LATITUDE, TokioCoordinates.LONGITUDE],
    CURRENT_ZOOM
  );

  L.tileLayer(TILE_LAYER, {
    maxZoom: MAX_MAP_ZOOM,
    attribution: MAP_ATTRIBUTION,
  }).addTo(map);

  mainMarker = L.marker(
    [TokioCoordinates.LATITUDE, TokioCoordinates.LONGITUDE],
    { icon: specialMarker, draggable: true }
  ).addTo(map);
  getLatLngMainMarker(mainMarker._latlng.lat, mainMarker._latlng.lng);
  currentLat = mainMarker._latlng.lat;
  currentLng = mainMarker._latlng.lng;

  mainMarker.on('move', () => {
    getLatLngMainMarker(mainMarker._latlng.lat, mainMarker._latlng.lng);
    currentLat = mainMarker._latlng.lat.toFixed(5);
    currentLng = mainMarker._latlng.lng.toFixed(5);
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

const getLat = () => function (){
  return currentLat;
};
export const closerLat = getLat();

const getLng = () => function (){
  return currentLng;
};
export const closerLng = getLng();

export { getMap, renderMarkers };
