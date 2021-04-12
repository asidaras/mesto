export default class Section {
  constructor({items, renderer}, containerSelector) {
   this._items = items;
   this._renderer = renderer;
   this._container = document.querySelector(containerSelector);
  }

  addItem(element, append=true){
    (append) ? this._container.append(element) : this._container.prepend(element);
  }

  removeItem(element){
    element.remove();
  }

  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }
}