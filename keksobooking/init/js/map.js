// const map = L.map('map-canvas', {
//   preferCanvas: true,
// }).setView([51.505, -0.09], 13);
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

const map = L.map('map-canvas').setView([51.505, -0.09], 13);
const a = 1;

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
console.log(a);

export { map, a };
