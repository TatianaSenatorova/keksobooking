const TILE_LAYER = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const MAX_MAP_ZOOM = 19;
const CURRENT_ZOOM = 14;
const MAP_ATTRIBUTION =
  '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

const TokioCoordinates = {
  LATITUDE: 35.681729,
  LONGITUDE: 139.753927,
};

const specialMarker = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52],
  iconAnchor: [10, 38],
  popupAnchor: [-3, -30],
});

const appartmentMarker = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [10, 38],
  popupAnchor: [-3, -30],
});

const DISABLE_CLASS_FORM = 'ad-form--disabled';
const DISABLE_CLASS_FILTERS = 'map__filters--disabled';

const BASE_URL = 'https://25.javascript.htmlacademy.pro/keksobooking';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const APPARTMENTS_TO_RENDER = 10;
const DEBOUNCE_DELAY = 500;

const ERROR_MESSAGE_MAP = 'Не удалось загрузить карту';
const ERROR_MESSAGE_DATA = 'Не удалось получить данные';

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
  color: 'white',
};

const PriceRange = {
  any: {
    min: 0,
    max: Infinity,
  },
  middle: {
    min: 10000,
    max: 50000,
  },
  low: {
    min: 0,
    max: 10000,
  },
  high: {
    min: 50000,
    max: Infinity,
  },
};

const DEFAULT_SELECT_VALUE = 'any';

const AllKeysForCard = ['avatar', 'title', 'address', 'price', 'type', 'rooms', 'guests', 'checkin', 'checkout', 'features', 'description', 'photos'];

const PostfixRooms = ['комнат', 'комната', 'комнаты'];
const PostfixGuests = ['гостей', 'гостя', 'гостей'];

const Accomodation = {
  palace: 'Дворец',
  flat: 'Квартира',
  hotel: 'Отель',
  house: 'Дом',
  bungalow: 'Бунгало',
};

export {
  TILE_LAYER,
  MAX_MAP_ZOOM,
  CURRENT_ZOOM,
  MAP_ATTRIBUTION,
  TokioCoordinates,
  specialMarker,
  appartmentMarker,
  DISABLE_CLASS_FORM,
  DISABLE_CLASS_FILTERS,
  BASE_URL,
  Route,
  Method,
  APPARTMENTS_TO_RENDER,
  DEBOUNCE_DELAY,
  ERROR_MESSAGE_MAP,
  ERROR_MESSAGE_DATA,
  ALERT_SHOW_TIME,
  ErrorElementStyles,
  PriceRange,
  DEFAULT_SELECT_VALUE,
  AllKeysForCard,
  PostfixRooms,
  PostfixGuests,
  Accomodation
};
