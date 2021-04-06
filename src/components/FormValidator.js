export default class FormValidator {
  constructor(
    {
      inputSelector, 
      submitButtonSelector, 
      inactiveButtonClass, 
      inputErrorClass, 
      errorClass
    }, form){
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._form = form;
  }

  _showInputError(popupInput, errorMessage){
    const popupInputError = this._form.querySelector(`.${popupInput.id}-error`);
    popupInput.classList.add(this._inputErrorClass);
    popupInputError.textContent = errorMessage;
    popupInputError.classList.add(this._errorClass);
  }

  _hideInputError(popupInput){
    const popupInputError = this._form.querySelector(`.${popupInput.id}-error`);
    popupInput.classList.remove(this._inputErrorClass);
    popupInputError.classList.remove(this._errorClass);
    popupInputError.textContent = '';
  }

  _checkInputValidity(popupInput){
    if (!popupInput.validity.valid) {
      this._showInputError(popupInput, popupInput.validationMessage);
    } else {
      this._hideInputError(popupInput);
    }
  }

  _hasInvalidInput(popupInputsList){
    return popupInputsList.some((popupInput) => {
      return !popupInput.validity.valid;
    }); 
  }

  _disableButton(popupFormButton) {
    popupFormButton.classList.add(this._inactiveButtonClass);
    popupFormButton.setAttribute("disabled", "disabled");
  }

  _toggleButtonState(popupInputsList, popupFormButton){
    if (this._hasInvalidInput(popupInputsList)) {
      popupFormButton.classList.add(this._inactiveButtonClass);
      popupFormButton.setAttribute("disabled", "disabled");
    } else {
      popupFormButton.classList.remove(this._inactiveButtonClass);
      popupFormButton.removeAttribute("disabled");
    } 
  }

  _setEventListeners(){
    const popupInputsList = Array.from(this._form.querySelectorAll(this._inputSelector));
    const popupFormButton = this._form.querySelector(this._submitButtonSelector);

    this._form.addEventListener("reset", () => {
      popupInputsList.forEach((popupInput) => {
        this._hideInputError(popupInput); 
        this._disableButton(popupFormButton);
      });
    });

    this._toggleButtonState(popupInputsList, popupFormButton);
  
    popupInputsList.forEach((popupInput) => {
      popupInput.addEventListener("input", () => {
        this._checkInputValidity(popupInput);
        this._toggleButtonState(popupInputsList, popupFormButton);
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}