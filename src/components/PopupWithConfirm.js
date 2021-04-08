import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup{
  constructor(popupSelector, submitCallback){
    super(popupSelector);
    this._submitCallback = submitCallback;
  }

  setEventListeners(){
    super.setEventListeners();
    this._popup.addEventListener("submit", this._submitCallback);
  }

  getCardToRemove(){
    return this._card;
  }

  open(card){
    super.open();
    this._card = card;
  }
}