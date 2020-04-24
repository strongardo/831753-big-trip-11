import AbstractComponent from "./abstract-component.js";
import {createDaysListTemplate} from "../templates/days-list.js";

export default class DaysList extends AbstractComponent {
  getTemplate() {
    return createDaysListTemplate();
  }
}
