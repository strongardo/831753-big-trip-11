import {RenderPosition} from "../const.js";
import NavComponent from "../components/nav-component.js";
import {render} from "../utils/dom.js";


export default class NavController {
  constructor(statisticComponent) {
    this._statisticComponent = statisticComponent;

    this._navComponent = new NavComponent();

    this._tripEventsSection = document.querySelector(`.trip-events`);
    this._statisticsSection = this._statisticComponent.getElement();
    this._container = document.querySelector(`.trip-controls`);

    this._navCondition = `table`;
  }

  render() {
    this._navComponent.setTableButtonClickHandler(() => {
      if (this._navCondition !== `table`) {
        this._navCondition = `table`;
        this._statisticsSection.classList.add(`element-hidden`);
        this._tripEventsSection.classList.remove(`element-hidden`);
      }
    });

    this._navComponent.setStatsButtonClickHandler(() => {
      if (this._navCondition !== `stats`) {
        this._navCondition = `stats`;
        this._statisticsSection.classList.remove(`element-hidden`);
        this._tripEventsSection.classList.add(`element-hidden`);
        this._statisticComponent.renderCharts();
      }
    });

    render(this._container, this._navComponent, RenderPosition.BEFOREEND);
  }
}
