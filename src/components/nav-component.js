import AbstractComponent from "./abstract-component.js";
import {createNavTemplate} from "../templates/nav-template.js";

export default class Nav extends AbstractComponent {
  getTemplate() {
    return createNavTemplate();
  }

  setTableButtonClickHandler(cb) {
    this.getElement().querySelectorAll(`.trip-tabs__btn`)[0].addEventListener(`click`, cb);
  }

  setStatsButtonClickHandler(cb) {
    this.getElement().querySelectorAll(`.trip-tabs__btn`)[1].addEventListener(`click`, cb);
  }
}
