import InfoComponent from "../components/info.js";
import CostComponent from "../components/cost.js";
import NavComponent from "../components/nav.js";
import FilterComponent from "../components/filter.js";
import {render} from "../utils/dom.js";

export default class HeaderController {
  constructor(container, events) {
    this._container = container;

    this._infoComponent = new InfoComponent(events);
    this._costComponent = new CostComponent(events);
    this._navComponent = new NavComponent();
    this._filterComponent = new FilterComponent();
  }

  render() {
    render(this._container, this._infoComponent, `afterbegin`);

    const tripInfo = this._container.querySelector(`.trip-info`);
    render(tripInfo, this._costComponent, `beforeend`);

    const tripControls = this._container.querySelector(`.trip-controls`);
    render(tripControls, this._navComponent, `beforeend`);
    render(tripControls, this._filterComponent, `beforeend`);
  }
}
