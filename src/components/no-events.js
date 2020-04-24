import AbstractComponent from "./abstract-component.js";
import {createNoEventsTemplate} from "../templates/no-events.js";

export default class NoEvents extends AbstractComponent {
  getTemplate() {
    return createNoEventsTemplate();
  }
}
