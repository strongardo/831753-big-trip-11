import {createElement} from "../utils.js";
import {createDayTemplate} from "../templates/day.js";

export default class Day {
  constructor(number, date) {
    this._number = number;
    this._date = date;
    this._element = null;
  }

  getTemplate() {
    return createDayTemplate(this._number, this._date);
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
