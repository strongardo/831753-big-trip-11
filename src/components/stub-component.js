import AbstractComponent from "./abstract-component.js";
import {createNoEventsTemplate} from "../templates/stub-template.js";

export default class NoEvents extends AbstractComponent {
  getTemplate() {
    return createNoEventsTemplate();
  }
}
