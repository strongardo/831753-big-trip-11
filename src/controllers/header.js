import InfoComponent from "../components/info.js";
import CostComponent from "../components/cost.js";
import NavComponent from "../components/nav.js";
import FilterComponent from "../components/filter.js";
import {render} from "../utils/dom.js";

export default class HeaderController {
  constructor(container, model) {
    this._container = container;
    this._events = model.getEvents();

    this._infoComponent = null;
    this._costComponent = null;
    this._navComponent = null;
    this._filterComponent = null;
  }

  render() {
    this._infoComponent = new InfoComponent(this._events);
    this._costComponent = new CostComponent(this._events);
    this._navComponent = new NavComponent();
    this._filterComponent = new FilterComponent();

    render(this._container, this._infoComponent, `afterbegin`);

    const tripInfo = this._container.querySelector(`.trip-info`);
    render(tripInfo, this._costComponent, `beforeend`);

    const tripControls = this._container.querySelector(`.trip-controls`);
    render(tripControls, this._navComponent, `beforeend`);
    render(tripControls, this._filterComponent, `beforeend`);
  }
}
