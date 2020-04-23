import AbstractComponent from "./abstract-component.js";
import {createInfoTemplate} from "../templates/info.js";

export default class Info extends AbstractComponent {
  constructor(events) {
    super();

    this._events = events;
  }

  getTemplate() {
    return createInfoTemplate(this._events);
  }
}
