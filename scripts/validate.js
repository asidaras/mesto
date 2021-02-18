const showInputError = (popupForm, popupInput, errorMessage) => {
  const popupInputError = popupForm.querySelector(`.${popupInput.id}-error`);
  popupInput.classList.add('popup__input_type_error');
  popupInputError.textContent = errorMessage;
  popupInputError.classList.add('popup__input-error_active');
}

const hideInputError = (popupForm, popupInput) => {
  const popupInputError = popupForm.querySelector(`.${popupInput.id}-error`);
  popupInput.classList.remove('popup__input_type_error');
  popupInputError.classList.remove('popup__input-error_active');
  popupInputError.textContent = '';
}

const checkInputValidity = (popupForm, popupInput) => {
  if (!popupInput.validity.valid) {
    showInputError(popupForm, popupInput, popupInput.validationMessage);
  } else {
    hideInputError(popupForm, popupInput);
  }
};

const hasInvalidInput = (popupInputsList) => {
  return popupInputsList.some((popupInput) => {
      console.log(popupInput.validity);
    return !popupInput.validity.valid;
  }); 
}

const toggleButtonState = (popupInputsList, popupFormButton) =>{
  if (hasInvalidInput(popupInputsList)) {
    popupFormButton.classList.add('popup__save-button_inactive');
    popupFormButton.setAttribute('disabled', 'disabled');
  } else {
    popupFormButton.classList.remove('popup__save-button_inactive');
    popupFormButton.removeAttribute('disabled');
  } 
}

const setEventListeners = (popupForm) => {
  const popupInputsList = Array.from(popupForm.querySelectorAll('.popup__input'));
  const popupFormButton = popupForm.querySelector('.popup__save-button');

  toggleButtonState(popupInputsList, popupFormButton);

  popupInputsList.forEach((popupInput) => {
    popupInput.addEventListener('input', function () {
      checkInputValidity(popupForm, popupInput);
      toggleButtonState(popupInputsList, popupFormButton);
    });
  });
};

const enableValidation = () => {
  const popupFormsList = Array.from(document.querySelectorAll('.popup__form'));
  popupFormsList.forEach((popupForm) => {setEventListeners(popupForm);});
};

enableValidation();