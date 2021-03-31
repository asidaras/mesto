import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
  }

  open(){
      //тут дописать как в function openPicture(event)
      /*В методе open класса PopupWithImage нужно вставлять в попап картинку и атрибут src изображения и подпись к картинке. */
    super.open();
  }
}