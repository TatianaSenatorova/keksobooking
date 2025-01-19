const MAP_LEAFLET = L.map('map-canvas');
const TILE_LAYER = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const MAX_MAP_ZOOM = 19;
const CURRENT_ZOOM = 10;
const MAP_ATTRIBUTION = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';


const TokioCoordinates = {
  LATITUDE: 35.42,
  LONGITUDE: 139.25
};

const DISABLE_CLASS_FORM = 'ad-form--disabled';
const DISABLE_CLASS_FILTERS = 'map__filters--disabled';

const BASE_URL = 'https://25.javascript.htmlacademy.pro/keksobooking123';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ERROR_GET_MESSAGE = 'Не удалось получить данные';

const ALERT_SHOW_TIME = 5000;

const ErrorElementStyles = {
  position: 'absolute',
  top: '0',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  padding: '30px',
  backgroundColor: '#FFA07A',
  fontSize: '30px',
  fontWeight: '700',
  color: 'white'
};

export {
  MAP_LEAFLET,
  TILE_LAYER,
  MAX_MAP_ZOOM,
  CURRENT_ZOOM,
  MAP_ATTRIBUTION,
  TokioCoordinates,
  DISABLE_CLASS_FORM,
  DISABLE_CLASS_FILTERS,
  BASE_URL,
  Route,
  Method,
  ERROR_GET_MESSAGE,
  ALERT_SHOW_TIME,
  ErrorElementStyles
};
