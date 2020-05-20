import {SortType, RenderPosition} from "../const.js";
import SortComponent from "../components/sort-component.js";
import {render} from "../utils/dom.js";


export default class SortController {
  constructor(onChangeSort, eventsModel) {
    this._onChangeSort = onChangeSort;
    this._eventsModel = eventsModel;

    this._sortComponent = new SortComponent(this._eventsModel);

    this.resetSorts = this.resetSorts.bind(this);
  }

  render() {

    const inputs = this._sortComponent.getElement().querySelectorAll(`.trip-sort__input`);

    inputs.forEach((input) => {
      this._sortComponent.setSortTypeChangeHandler(input, (sortType) => {
        this._onChangeSort(sortType);
      });
    });

    const tripEvents = document.querySelector(`.trip-events`);
    render(tripEvents, this._sortComponent, RenderPosition.BEFOREEND);
  }

  resetSorts() {
    const defaultSortButton = this._sortComponent.getElement().querySelector(`#sort-event`);

    if (defaultSortButton) {
      defaultSortButton.checked = true;
      this._eventsModel.setSortType(SortType.DEFAULT);
    }
  }
}
