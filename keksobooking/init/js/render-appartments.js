import { MAP_LEAFLET } from './constants.js';

const renderMarkers = (appartmentsArray) => {
  appartmentsArray.map((appartment) => {
    console.log(appartment);
    const appartmentIcon = L.icon({
      iconUrl: '../img/muffin-red.svg',
      iconSize: [40, 40],
      iconAnchor: [10, 38],
      popupAnchor: [-3, -30]
    });
    L.marker([appartment.location.lat, appartment.location.lng], {icon: appartmentIcon}).addTo(MAP_LEAFLET);

  });
};

export { renderMarkers};