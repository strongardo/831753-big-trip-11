import {RenderPosition} from "../const.js";
import InfoComponent from "../components/info-component.js";
import CostComponent from "../components/cost-component.js";
import {render} from "../utils/dom.js";

export default class HeaderController {
  constructor(model) {
    this._events = model.getAllEvents();

    this._container = document.querySelector(`.trip-main`);

    this._infoComponent = new InfoComponent(this._events);
    this._costComponent = new CostComponent(this._events);
  }

  render() {
    render(this._container, this._infoComponent, RenderPosition.AFTERBEGIN);

    const tripInfo = this._container.querySelector(`.trip-info`);
    render(tripInfo, this._costComponent, RenderPosition.ABEFOREEND);
  }
}
