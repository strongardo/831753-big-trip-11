import AbstractComponent from "./abstract-component.js";
import {createDayTemplate} from "../templates/day-template.js";

export default class Day extends AbstractComponent {
  constructor(number, date) {
    super();

    this._number = number;
    this._date = date;
  }

  getTemplate() {
    return createDayTemplate(this._number, this._date);
  }
}
