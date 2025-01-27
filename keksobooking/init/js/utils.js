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

const getPostfix = (value, words) =>{
  const number = Math.abs(value);
  if (number % 10 === 0 || number % 10 >= 5 || (number >= 10 && number < 20)) {
    return words[0];
  } else if (!number){
    return '';
  }else if (number % 10 === 1) {
    return words[1];
  }
  return words[2];
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

export { addTagError, debounce, findTemplate, getPostfix };
