import NavComponent from "../components/nav-component.js";
import {render} from "../utils/dom.js";


export default class NavController {
  constructor(renderCharts) {
    this._renderCharts = renderCharts;

    this._navComponent = new NavComponent();
  }

  render() {
    this._navComponent.setTableButtonClickHandler(() => {
      const tripEvents = document.querySelector(`.trip-events`);
      const statistics = document.querySelector(`.statistics`);
      const tableButton = this._navComponent.getElement().querySelectorAll(`.trip-tabs__btn`)[0];
      const statsButton = this._navComponent.getElement().querySelectorAll(`.trip-tabs__btn`)[1];

      statistics.classList.add(`element-hidden`);
      statsButton.classList.remove(`trip-tabs__btn--active`);
      tripEvents.classList.remove(`element-hidden`);
      tableButton.classList.add(`trip-tabs__btn--active`);
    });

    this._navComponent.setStatsButtonClickHandler(() => {
      const tripEvents = document.querySelector(`.trip-events`);
      const statistics = document.querySelector(`.statistics`);
      const tableButton = this._navComponent.getElement().querySelectorAll(`.trip-tabs__btn`)[0];
      const statsButton = this._navComponent.getElement().querySelectorAll(`.trip-tabs__btn`)[1];


      statistics.classList.remove(`element-hidden`);
      statsButton.classList.add(`trip-tabs__btn--active`);
      tripEvents.classList.add(`element-hidden`);
      tableButton.classList.remove(`trip-tabs__btn--active`);
    });


    const tripControls = document.querySelector(`.trip-controls`);
    render(tripControls, this._navComponent, `beforeend`);
  }
}
