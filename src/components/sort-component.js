import AbstractComponent from "./abstract-component.js";
import {createSortTemplate} from "../templates/sort-template.js";

export default class Sort extends AbstractComponent {
  constructor(eventsModel) {
    super();
    this._eventsModel = eventsModel;
  }

  getTemplate() {
    return createSortTemplate();
  }

  getSortType() {
    return this._sortType;
  }

  setSortTypeChangeHandler(target, handler) {
    target.addEventListener(`change`, (evt) => {

      const sortType = evt.target.dataset.sortType;
      const currentSortType = this._eventsModel.getSortType();

      if (currentSortType === sortType) {
        return;
      }

      handler(sortType);
    });
  }
}
