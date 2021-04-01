import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, submitCallback){
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._popupForm = document.querySelector(this._popupSelector);
  }

  _getInputValues(){
    let firstField = this._popupForm.querySelector(".popup__input_first").value;
    let secondField = this._popupForm.querySelector(".popup__input_second").value;
    return {firstField, secondField};
  }

  setEventListeners(){
    /*Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm 
    должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы. */
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._submitCallback);
  }

  close(){
    /*Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.*/
    super.close();
    this._popupForm.querySelector(".popup__form").reset();
    /*const popupForm = this._popupForm.querySelector(".popup__form");
    const popupFormElementSaveButton = this._popupForm.querySelector(".popup__save-button");
    popupFormElementSaveButton.setAttribute("disabled", "disabled");
    popupFormElementSaveButton.classList.add("popup__save-button_inactive");
    /*Возврат кнопки к начальному состоянию после добавления нового места*/
  }
}