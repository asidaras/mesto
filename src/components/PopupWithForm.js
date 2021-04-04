import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, submitCallback){
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._popupForm = document.querySelector(this._popupSelector);
    this._firstInput = this._popupForm.querySelector(".popup__input_first");
    this._secondInput = this._popupForm.querySelector(".popup__input_second");
  }

  _getInputValues(){
    return {
      firstValue: this._firstInput.value, 
      secondValue: this._secondInput.value
    };
  }

  getValues(){
    return this._getInputValues();
  }

  setInputValues({firstValue, secondValue}){
    this._firstInput.value = firstValue;
    this._secondInput.value = secondValue;
  }

  returnButtonToInitalState(){
    const saveButton = this._popupForm.querySelector(".popup__save-button");
    saveButton.setAttribute("disabled", "disabled");
    saveButton.classList.add("popup__save-button_inactive");
  }

  dispatchInput(){
    this._firstInput.dispatchEvent(new Event("input"));
    this._secondInput.dispatchEvent(new Event("input"));
    /*dispatchInput() нужен для имитации события input, а следовательно
  запуска checkInputValidity и toggleButtonState из FormValidator в том случае,
  если была стёрта строка имени либо описания и попап был закрыт. При следующем
  открытии попапа поля будут снова заполены данными профиля, но без события input
  валидатор посчитает это как за пустое поле на предыдущем шаге и будут высвечены ошибки,
  заблокирована кнопка до тех пор, по не будет произведён ввод каких-либо значений
  с клавиатуры, либо стирание символа.*/
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
  }
}