import {
  ALERT_SHOW_TIME,
  ErrorElementStyles,
  DEBOUNCE_DELAY
} from './constants.js';
import { body } from './dom-elements.js';

export const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export const findTemplate = (id) => {
  const template = document.getElementById(id);
  if (!template) {
    throw new Error(`Template not found: #${id}`);
  }
  if (!(template instanceof HTMLTemplateElement)) {
    throw new Error(`Element is not template: #${id}`);
  }
  return template.content.firstElementChild;
};

export const getPostfix = (value, words) =>{
  if((value.toString()).length > 2) {
    value = (value.toString()).slice(-2);
  }
  const number = Math.abs(value);
  if (!Number.isInteger(number)) {
    return '';
  }
  switch (number) {
    case 1:
      return words[1];
    case 0:
    case 2:
    case 3:
    case 4:
    case 5:
      return words[2];
    default:
      return words[0];
  }
};

export const getAllKeys = (object) =>{
  let keys = [];
  for (const key in object) {
    if(object[key]) {
      keys.push(key);
    }
    if (typeof object[key] === 'object') {
      keys = keys.concat(getAllKeys(object[key]));
    }
  }
  return keys;
};

export const addTagError = (text, objStyles = ErrorElementStyles, tag = 'div', parent = document.body, alertTime = ALERT_SHOW_TIME) => {
  const element = document.createElement(tag);
  element.textContent = text;
  for (const key in objStyles) {
    element.style[key] = objStyles[key];
  }
  parent.append(element);
  setTimeout(() => {
    element.remove();
  }, alertTime);
};

const closePopup = (popupElement) => {
  popupElement.remove();
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export const showPopup = (templateId) => {
  const template = findTemplate(templateId);
  const popupElement = template.cloneNode(true);
  body.append(popupElement);
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      closePopup(popupElement);
    }});
  popupElement.addEventListener('click', () => {
    closePopup(popupElement);
  });
};

