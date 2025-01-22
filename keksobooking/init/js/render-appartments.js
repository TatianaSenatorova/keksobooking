
const renderMarkers = (appartmentsArray, map) => {
  appartmentsArray.map((appartment) => {
    const appartmentIcon = L.icon({
      iconUrl: '../img/muffin-red.svg',
      iconSize: [40, 40],
      iconAnchor: [10, 38],
      popupAnchor: [-3, -30]
    });
    L.marker([appartment.location.lat, appartment.location.lng], {icon: appartmentIcon}).addTo(map);

  });
};

export { renderMarkers};
