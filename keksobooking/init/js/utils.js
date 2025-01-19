
const disableForm = (form, fildsets, classDisable, isDisable = true) => {
  (isDisable) ? (form.classList.add(classDisable)) : form.classList.remove(classDisable);
  fildsets.forEach((fildset) => {fildset.disabled = isDisable;});
};

export {
  disableForm
};
