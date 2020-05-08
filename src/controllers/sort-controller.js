import SortComponent from "../components/sort-component.js";
import {render} from "../utils/dom.js";


export default class SortController {
  constructor(onChangeSort) {
    this._onChangeSort = onChangeSort;

    this._sortComponent = new SortComponent();
  }

  render() {

    const inputs = this._sortComponent.getElement().querySelectorAll(`.trip-sort__input`);

    inputs.forEach((input) => {
      this._sortComponent.setSortTypeChangeHandler(input, (sortType) => {
        this._onChangeSort(sortType);
      });
    });

    const tripEvents = document.querySelector(`.trip-events`);
    render(tripEvents, this._sortComponent, `beforeend`);
  }
}
