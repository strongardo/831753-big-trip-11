import {FilterType, RenderPosition} from "../const.js";
import FilterComponent from "../components/filter-component.js";
import {render} from "../utils/dom.js";

export default class FilterController {
  constructor(onChangeFilter, eventsModel) {
    this._onChangeFilter = onChangeFilter;
    this._eventsModel = eventsModel;

    this._filterComponent = new FilterComponent(eventsModel);

    this.resetFilters = this.resetFilters.bind(this);
  }

  render() {
    const inputs = this._filterComponent.getElement().querySelectorAll(`.trip-filters__filter-input`);

    inputs.forEach((input) => {
      this._filterComponent.setFilterTypeChangeHandler(input, (filterType) => {
        this._onChangeFilter(filterType);
      });
    });

    const tripControls = document.querySelector(`.trip-controls`);
    render(tripControls, this._filterComponent, RenderPosition.BEFOREEND);
  }

  resetFilters() {
    const defaultFilterButton = this._filterComponent.getElement().querySelector(`#filter-everything`);
    defaultFilterButton.checked = true;
    this._eventsModel.setFilterType(FilterType.DEFAULT);
  }
}
