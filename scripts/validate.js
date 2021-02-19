const showInputError = (settings, popupForm, popupInput, errorMessage) => {
  const popupInputError = popupForm.querySelector(`.${popupInput.id}-error`);
  popupInput.classList.add(settings.inputErrorClass);
  popupInputError.textContent = errorMessage;
  popupInputError.classList.add(settings.errorClass);
}

const hideInputError = (settings, popupForm, popupInput) => {
  const popupInputError = popupForm.querySelector(`.${popupInput.id}-error`);
  popupInput.classList.remove(settings.inputErrorClass);
  popupInputError.classList.remove(settings.errorClass);
  popupInputError.textContent = '';
}

const checkInputValidity = (settings, popupForm, popupInput) => {
  if (!popupInput.validity.valid) {
    showInputError(settings, popupForm, popupInput, popupInput.validationMessage);
  } else {
    hideInputError(settings, popupForm, popupInput);
  }
};

const hasInvalidInput = (popupInputsList) => {
  return popupInputsList.some((popupInput) => {
    return !popupInput.validity.valid;
  }); 
}

const toggleButtonState = (settings, popupInputsList, popupFormButton) =>{
  if (hasInvalidInput(popupInputsList)) {
    popupFormButton.classList.add(settings.inactiveButtonClass);
    popupFormButton.setAttribute('disabled', 'disabled');
  } else {
    popupFormButton.classList.remove(settings.inactiveButtonClass);
    popupFormButton.removeAttribute('disabled');
  } 
}

const setEventListeners = (settings, popupForm) => {
  const popupInputsList = Array.from(popupForm.querySelectorAll(settings.inputSelector));
  const popupFormButton = popupForm.querySelector(settings.submitButtonSelector);

  toggleButtonState(settings, popupInputsList, popupFormButton);

  popupInputsList.forEach((popupInput) => {
    popupInput.addEventListener('input', function () {
      checkInputValidity(settings, popupForm, popupInput);
      toggleButtonState(settings, popupInputsList, popupFormButton);
    });
  });
};

const enableValidation = (settings) => {
  const popupFormsList = Array.from(document.querySelectorAll(settings.formSelector));
  popupFormsList.forEach((popupForm) => {setEventListeners(settings, popupForm);});
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});