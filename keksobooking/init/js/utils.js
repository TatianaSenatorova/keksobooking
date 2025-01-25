import {
  ALERT_SHOW_TIME,
  ErrorElementStyles,
  DEBOUNCE_DELAY
} from './constants.js';

const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const findTemplate = (id) => {
  const template = document.getElementById(id);
  if (!template) {
    throw new Error(`Template not found: #${id}`);
  }
  if (!(template instanceof HTMLTemplateElement)) {
    throw new Error(`Element is not template: #${id}`);
  }
  return template.content.firstElementChild;
};

const addTagError = (text, objStyles = ErrorElementStyles, tag = 'div', parent = document.body, alertTime = ALERT_SHOW_TIME) => {
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

export { addTagError, debounce, findTemplate };
