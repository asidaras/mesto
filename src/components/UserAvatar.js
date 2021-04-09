export default class UserAvatar{
  constructor({avatar}){
    this._avatar = avatar;
    this._profileAvatar = document.querySelector(this._avatar);
  }

  getUserAvatar(){
    return {
      profileAvatar: this._profileAvatar.src
    };
  }

  setUserAvatar({newAvatar}){
    this._profileAvatar.src = newAvatar;
  }
}