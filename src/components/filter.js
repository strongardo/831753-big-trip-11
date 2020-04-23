import AbstractComponent from "./abstract-component.js";
import {createFilterTemplate} from "../templates/filter.js";

export default class Filter extends AbstractComponent {
  getTemplate() {
    return createFilterTemplate();
  }
}
