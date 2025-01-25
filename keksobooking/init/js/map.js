import {
  TILE_LAYER,
  MAX_MAP_ZOOM,
  CURRENT_ZOOM,
  MAP_ATTRIBUTION,
  TokioCoordinates,
  specialMarker,
  appartmentMarker,
  APPARTMENTS_TO_RENDER,
  PopupClasses,
} from './constants.js';
import { formMap } from './dom-elements.js';
import { findTemplate } from './utils.js';

let map;

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

  return map;
};

const template = findTemplate('card');

const addContent = (tag, attribute, objValue) =>{
  attribute = objValue ? objValue : tag.classList.add('visually-hidden');
  console.log(attribute);
};

const createPopup = (appartment) => {
  const popup = template.cloneNode(true);
  console.log(appartment);
  PopupClasses.forEach((item) =>{
    switch (item.ELEMENT_NAME) {
      case 'avatar':{
        const avatar = popup.querySelector(`.${item.CLASS_NAME}`);
        // addContent(avatar, avatar.src, appartment.author[item.ELEMENT_NAME]);
        avatar.src = appartment.author[item.ELEMENT_NAME] ? `../${appartment.author[item.ELEMENT_NAME]}` : avatar.classList.add('visually-hidden');
        console.log(avatar.src);
      }
        break;
      case 'capacity':{
        const capacity = popup.querySelector(`.${item.CLASS_NAME}`);
        if(appartment.offer[item.ROOMS] && appartment.offer[item.GUESTS]) {
          capacity.textContent = `${appartment.offer[item.ROOMS] || null} комнаты для ${appartment.offer[item.GUESTS] || null} гостей`;
        } else if (!appartment.offer[item.ROOMS] && !appartment.offer[item.GUESTS]) {
          capacity.classList.add('visually-hidden');
        }
        console.log(capacity.textContent);
        // else if (!appartment.offer[item.ROOMS]) {
        //   capacity.textContent = `комнаты для ${appartment.offer[item.GUESTS]} гостей`;
        // } else {
        //   capacity.textContent = `${appartment.offer[item.ROOMS]} комнаты для гостей`;
        // }
      }
        break;
      case 'time':{
        const time = popup.querySelector(`.${item.CLASS_NAME}`);
        if(appartment.offer[item.CHECKIN] && appartment.offer[item.CHECKOUT]) {
          time.textContent = `Заезд после ${appartment.offer[item.CHECKIN] || null} , выезд до ${appartment.offer[item.CHECKOUT] || null}`;
        } else if (!appartment.offer[item.CHECKIN] && !appartment.offer[item.CHECKOUT]) {
          time.classList.add('visually-hidden');

        }
        console.log(time.textContent);
      }
        break;
        case 'features':{
          const featuresDomElements = Array.from(popup.querySelectorAll(`.${item.CLASS_NAME}`));
          const featuresClasses = featuresDomElements.map((feature) => feature.className.split('--')[1]);
          featuresClasses.map((feature) =>{
            console.log(feature, appartment.offer.features);
               if(!appartment.offer.features.includes(feature)) {
                console.log('не входит');
                popup.querySelector(`.popup__feature--${feature}`).classList.add('visually-hidden');
            }
          }
        )
        }

          break;

      default: {
        const element = popup.querySelector(`.${item.CLASS_NAME}`);
        addContent(element, element.textContent, appartment.offer[item.ELEMENT_NAME]);
      }
        break;
    }
  });
};


console.log(
  createPopup({
    author: {
      avatar: 'img/avatars/user10.png',
    },
    offer: {
      title: 'Чёткая хата',
      address: '102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō',
      price: 35000,
      type: 'palace',
      rooms: 3,
      guests: 2,
      checkin: '14:00',
      checkout: '21:00',
      features: ['washer', 'elevator', 'wifi', 'dishwasher'],
      description: 'Хейтеров просьба не беспокоить.',
      photos: [
        'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/scott-webb-1ddol8rgUH8.jpg',
      ],
    },
    location: {
      lat: 35.656472136061886,
      lng: 139.71157103726063,
    },
  })
);

const renderMarkers = (appartmentsArray) => {
  appartmentsArray.slice(0, APPARTMENTS_TO_RENDER).map((appartment) => {
    const marker = L.marker(
      [appartment.location.lat, appartment.location.lng],
      { icon: appartmentMarker }
    ).addTo(map);
    marker.bindPopup(() => createPopup(appartment));
    const popup = L.popup()
      .setLatLng(latlng)
      .setContent('<p>Hello world!<br />This is a nice popup.</p>')
      .openOn(map);
  });
};

export { getMap, renderMarkers };
