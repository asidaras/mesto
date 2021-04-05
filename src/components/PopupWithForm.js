import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback){
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._firstInput = this._popup.querySelector(".popup__input_first");
    this._secondInput = this._popup.querySelector(".popup__input_second");
    this._inputList = Array.from(this._popup.querySelectorAll(".popup__input"));
  }

  _getInputValues(){
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  getValues(){
    return this._getInputValues();
  }

  setInputValues({name, about}){
    this._firstInput.value = name;
    this._secondInput.value = about;
  }

  setEventListeners(){
    super.setEventListeners();
    this._popup.addEventListener("submit", this._submitCallback);
  }

  close(){
    super.close();
    this._popup.querySelector(".popup__form").reset();
  }
}