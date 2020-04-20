import {createElement} from "../utils.js";
import {createCostTemplate} from "../templates/cost.js";

export default class Cost {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  getTemplate() {
    return createCostTemplate(this._events);
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
