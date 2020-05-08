import FilterComponent from "../components/filter-component.js";
import {render} from "../utils/dom.js";

export default class FilterController {
  constructor(onChangeFilter) {
    this._onChangeFilter = onChangeFilter;

    this._filterComponent = new FilterComponent();
  }

  render() {
    const inputs = this._filterComponent.getElement().querySelectorAll(`.trip-filters__filter-input`);

    inputs.forEach((input) => {
      this._filterComponent.setFilterTypeChangeHandler(input, (filterType) => {
        this._onChangeFilter(filterType);
      });
    });

    const tripControls = document.querySelector(`.trip-controls`);
    render(tripControls, this._filterComponent, `beforeend`);
  }
}
