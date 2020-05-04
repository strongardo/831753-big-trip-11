import AbstractComponent from "./abstract-component.js";
import {createSortTemplate} from "../templates/sort.js";
import {SortType} from "../const.js";

export default class Sort extends AbstractComponent {
  constructor() {
    super();

    this._currenSortType = SortType.DEFAULT;
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

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;

      handler(sortType);
    });
  }
}
