export default class UserInfo{
  constructor({name, about}){
    this._name = name;
    this._about = about;
    this._profileName = document.querySelector(this._name);
    this._profileAbout = document.querySelector(this._about);
  }

  setUserId(id){
    this._id = id;
  }

  getUserId(){
    return this._id;
  }

  getUserInfo(){
    return {
      profileName: this._profileName.textContent, 
      profileAbout: this._profileAbout.textContent
    };
  }

  setUserInfo({newName, newAbout}){
    this._profileName.textContent = newName;
    this._profileAbout.textContent = newAbout;
  }
}