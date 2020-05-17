import AbstractComponent from "./abstract-component.js";
import {createLoadingTemplate} from "../templates/loading-template.js";

export default class Loading extends AbstractComponent {
  getTemplate() {
    return createLoadingTemplate();
  }
}
