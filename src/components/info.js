import {createElement} from "../utils.js";
import {createInfoTemplate} from "../templates/info.js";

export default class Info {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  getTemplate() {
    return createInfoTemplate(this._events);
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
