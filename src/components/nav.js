import {createElement} from "../utils.js";
import {createNavTemplate} from "../templates/nav.js";

export default class Nav {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNavTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
