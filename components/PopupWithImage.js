import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._popupImage = document.querySelector(this._popupSelector);
  }

  open(src, alt){
    super.open();
    const popupImageImg =  this._popupImage.querySelector(".popup__image");
    const popupImageFigCaption =  this._popupImage.querySelector(".popup__figcaption");
    popupImageImg.src = src;
    popupImageImg.alt = alt;
    popupImageFigCaption.textContent = alt;
  }
}