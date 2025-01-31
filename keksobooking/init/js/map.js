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

let map;
let markerGroup;

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

  const mainMarker = L.marker(
    [TokioCoordinates.LATITUDE, TokioCoordinates.LONGITUDE],
    { icon: specialMarker, draggable: true }
  ).addTo(map);

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
