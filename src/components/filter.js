import AbstractComponent from "./abstract-component.js";
import {createFilterTemplate} from "../templates/filter.js";
import {FilterType} from "../const.js";

export default class Filter extends AbstractComponent {
  constructor() {
    super();

    this._currenFilterType = FilterType.DEFAULT;
  }

  getTemplate() {
    return createFilterTemplate();
  }

  setFilterTypeChangeHandler(target, handler) {
    target.addEventListener(`change`, (evt) => {

      const filterType = evt.target.dataset.filterType;

      if (this._currenFilterType === filterType) {
        return;
      }

      this._currenFilterType = filterType;

      handler(filterType);
    });
  }
}
