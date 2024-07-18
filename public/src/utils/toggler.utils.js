import { isNullish } from './utils.js';

export const toggleCssClass = (cssClass, elementId1, elementId2) => {
  // check if elementId1 or elementId2 is null or undefined
  if (isNullish(elementId1) || isNullish(elementId2)) {
    console.error('Error | toggleCssClass: missing element id', elementId1, elementId2);
    return;
  }
  const element1 = document.getElementById(elementId1);
  if (!element1) {
    console.error(`Error | toggleCssClass: no element with id '${elementId1}' found`);
    return;
  }

  const element2 = document.getElementById(elementId2);
  if (!element2) {
    console.error(`Error | toggleCssClass: no element with id '${elementId2}' found`);
    return;
  }

  element1.classList.toggle(cssClass);
  element2.classList.toggle(cssClass);
};

export const showMatchButton = () => {
  const matchButton = document.getElementById('matchButton');
  matchButton.classList.remove('hidden');

  const registerButton = document.getElementById('registerButton');
  const loginButton = document.getElementById('loginButton');
  registerButton.classList.add('hidden');
  loginButton.classList.add('hidden');
};
