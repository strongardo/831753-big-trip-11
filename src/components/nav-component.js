import AbstractComponent from "./abstract-component.js";
import {createNavTemplate} from "../templates/nav-template.js";


export default class Nav extends AbstractComponent {
  constructor() {
    super();

    this._tableButton = this.getElement().querySelector(`.trip-tabs__btn--table`);
    this._statsButton = this.getElement().querySelector(`.trip-tabs__btn--stats`);
  }


  getTemplate() {
    return createNavTemplate();
  }

  setTableButtonClickHandler(cb) {
    this._tableButton.addEventListener(`click`, () => {
      this._statsButton.classList.remove(`trip-tabs__btn--active`);
      this._tableButton.classList.add(`trip-tabs__btn--active`);

      cb();
    });
  }

  setStatsButtonClickHandler(cb) {
    this._statsButton.addEventListener(`click`, () => {
      this._statsButton.classList.add(`trip-tabs__btn--active`);
      this._tableButton.classList.remove(`trip-tabs__btn--active`);

      cb();
    });
  }
}
