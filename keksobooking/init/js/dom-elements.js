export const adForm = document.querySelector('.ad-form');
export const adFormFieldsets = adForm.querySelectorAll('.ad-form__element');
export const avatarChooser = adForm.querySelector('.ad-form-header__input');
export const avatarPreview = adForm.querySelector('.ad-form-header__preview img');
export const formTitle = adForm.querySelector('#title');
export const formPrice = adForm.querySelector('#price');
export const formPriceParent = formPrice.closest('.ad-form__element-validate');
export const slider = adForm.querySelector('.ad-form__slider');
export const formType = adForm.querySelector('#type');
export const formAddress = adForm.querySelector('#address');
export const formAddressParent = formAddress.closest('.ad-form__element-validate');
export const formCheckin = adForm.querySelector('#timein');
export const formCheckout = adForm.querySelector('#timeout');
export const roomsSelect = adForm.querySelector('#room_number');
export const capacitySelect = adForm.querySelector('#capacity');


export const filtersForm = document.querySelector('.map__filters');
export const mapFilterSelects = filtersForm.querySelectorAll('.map__filter');
export const typeSelect = filtersForm.querySelector('#housing-type');
export const priceSelect = filtersForm.querySelector('#housing-price');
export const roomSelect = filtersForm.querySelector('#housing-rooms');
export const guestSelect = filtersForm.querySelector('#housing-guests');
export const featureCheckBoxes = filtersForm.querySelectorAll('.map__checkbox');

export const map = document.querySelector('.map__canvas');
export const formMap = document.querySelector('.map__filters');
