import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, submitCallback){
    super(popupSelector);
    this._submitCallback = submitCallback;
  }

  _getInputValues(){
      /*Содержит приватный метод _getInputValues, который собирает данные всех полей формы. */
  }

  setEventListeners(){
      /*Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы. */
      super.setEventListeners();
  }

  close(){
      /*Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.*/
      super.close();
  }
}