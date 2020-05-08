import AbstractComponent from "./abstract-component.js";
import {createStubTemplate} from "../templates/stub-template.js";

export default class NoEvents extends AbstractComponent {
  getTemplate() {
    return createStubTemplate();
  }
}
