import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._popupImageImg =  this._popup.querySelector(".popup__image");
    this._popupImageFigCaption =  this._popup.querySelector(".popup__figcaption");
  }

  open(src, alt){
    super.open();
    this._popupImageImg.src = src;
    this._popupImageImg.alt = alt;
    this._popupImageFigCaption.textContent = alt;
  }
}