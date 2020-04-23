import AbstractComponent from "./abstract-component.js";
import {createCostTemplate} from "../templates/cost.js";

export default class Cost extends AbstractComponent {
  constructor(events) {
    super();

    this._events = events;
  }

  getTemplate() {
    return createCostTemplate(this._events);
  }
}
