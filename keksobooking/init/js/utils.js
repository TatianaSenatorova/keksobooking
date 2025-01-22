import {
  ALERT_SHOW_TIME,
  ErrorElementStyles
} from './constants.js';

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

export { addTagError };
