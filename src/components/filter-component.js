import AbstractComponent from "./abstract-component.js";
import {createFilterTemplate} from "../templates/filter-template.js";

export default class Filter extends AbstractComponent {
  constructor(eventsModel) {
    super();
    this._eventsModel = eventsModel;
  }

  getTemplate() {
    return createFilterTemplate();
  }

  setFilterTypeChangeHandler(target, handler) {
    target.addEventListener(`change`, (evt) => {

      const filterType = evt.target.dataset.filterType;
      const currentFilterType = this._eventsModel.getFilterType();

      if (currentFilterType === filterType) {
        return;
      }
      this._currenFilterType = filterType;

      handler(filterType);
    });
  }
}
