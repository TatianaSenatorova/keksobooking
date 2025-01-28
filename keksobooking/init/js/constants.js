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

const PopupClasses = [
  {
    CLASS_NAME: 'popup__avatar',
    DATA_KEY: 'avatar',
  },
  {
    CLASS_NAME: 'popup__title',
    DATA_KEY: 'title',
  },
  {
    CLASS_NAME: 'popup__text--address',
    DATA_KEY: 'address',
  },
  {
    CLASS_NAME: 'popup__text--price',
    DATA_KEY: 'price',
  },
  {
    CLASS_NAME: 'popup__type',
    DATA_KEY: 'type',
  },
  {
    CLASS_NAME: 'popup__text--capacity',
    DATA_KEY: 'capacity',
    ROOMS: 'rooms',
    GUESTS: 'guests',
  },
  {
    CLASS_NAME: 'popup__text--time',
    DATA_KEY: 'time',
    CHECKIN: 'checkin',
    CHECKOUT: 'checkout',
  },
  {
    CLASS_NAME: 'popup__feature',
    DATA_KEY: 'features',
    MODIFIERS: [
      'wifi',
      'dishwasher',
      'parking',
      'washer',
      'elevator',
      'conditioner',
    ],
  },

  {
    CLASS_NAME: 'popup__description',
    DATA_KEY: 'description',
  },
  {
    CLASS_NAME: 'popup__photos',
    CLASS_NAME_CHILDREN: 'popup__photo',
    DATA_KEY: 'photos'
  },
];

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
  PopupClasses,
  PostfixRooms,
  PostfixGuests,
  Accomodation,
};
