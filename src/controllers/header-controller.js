import InfoComponent from "../components/info-component.js";
import CostComponent from "../components/cost-component.js";
import {render} from "../utils/dom.js";

export default class HeaderController {
  constructor(model) {
    this._container = document.querySelector(`.trip-main`);
    this._events = model.getAllEvents();

    this._infoComponent = null;
    this._costComponent = null;
  }

  render() {
    this._infoComponent = new InfoComponent(this._events);
    this._costComponent = new CostComponent(this._events);

    render(this._container, this._infoComponent, `afterbegin`);

    const tripInfo = this._container.querySelector(`.trip-info`);
    render(tripInfo, this._costComponent, `beforeend`);
  }
}
