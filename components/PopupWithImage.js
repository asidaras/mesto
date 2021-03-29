import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
  }

  open(){
      //тут дописать как в function openPicture(event) 
    super.open();
  }
}