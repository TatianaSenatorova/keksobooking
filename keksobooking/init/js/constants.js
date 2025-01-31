import { getPostfix } from './utils.js';

export const TILE_LAYER = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
export const MAX_MAP_ZOOM = 19;
export const CURRENT_ZOOM = 14;
export const MAP_ATTRIBUTION =
  '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

export const TokioCoordinates = {
  LATITUDE: 35.681729,
  LONGITUDE: 139.753927,
};

export const specialMarker = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52],
  iconAnchor: [10, 38],
  popupAnchor: [-3, -30],
});

export const appartmentMarker = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [10, 38],
  popupAnchor: [-3, -30],
});

export const DISABLE_CLASS_FORM = 'ad-form--disabled';
export const DISABLE_CLASS_FILTERS = 'map__filters--disabled';

export const BASE_URL = 'https://25.javascript.htmlacademy.pro/keksobooking';

export const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

export const Method = {
  GET: 'GET',
  POST: 'POST',
};

export const APPARTMENTS_TO_RENDER = 10;
export const DEBOUNCE_DELAY = 500;

export const ERROR_MESSAGE_MAP = 'Не удалось загрузить карту';
export const ERROR_MESSAGE_DATA = 'Не удалось получить данные';

export const ALERT_SHOW_TIME = 5000;

export const ErrorElementStyles = {
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

export const PriceRange = {
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

export const DEFAULT_SELECT_VALUE = 'any';

export const AllKeysForCard = ['avatar', 'title', 'address', 'price', 'type', 'rooms', 'guests', 'checkin', 'checkout', 'features', 'description', 'photos'];

export const PostfixRooms = ['комнат', 'комната', 'комнаты'];
export const PostfixGuests = ['гостей', 'гостя', 'гостей'];

export const CapacitySentence = {
  FIRST: '',
  SECOND: (dataKeyRooms) => getPostfix(dataKeyRooms, PostfixRooms),
  THIRD: 'для ',
  FORTH: (dataKeyRooms) => getPostfix(dataKeyRooms, PostfixGuests),
};

export const TimeSentence = {
  FIRST: 'Заезд после ',
  SECOND: () => '',
  THIRD: 'выезд до ',
  FORTH: () => ''
};

export const Accomodation = {
  palace: 'Дворец',
  flat: 'Квартира',
  hotel: 'Отель',
  house: 'Дом',
  bungalow: 'Бунгало',
};
