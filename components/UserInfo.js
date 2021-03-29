export default class UserInfo{
  constructor({name, about}){
    this._name = name;
    this._about = about;
  }

  getUserInfo(){
    const profileName = document.querySelector(this._name).textContent;
    const profileAbout = document.querySelector(this._about).textContent;
    return {profileName, profileAbout};
  }

  setUserInfo({newName, newAbout}){
    document.querySelector(this._name).textContent = newName;
    document.querySelector(this._about).textContent = newAbout;
  }
}