import AbstractComponent from "./abstract-component.js";
import {createNavTemplate} from "../templates/nav-template.js";

export default class Nav extends AbstractComponent {
  getTemplate() {
    return createNavTemplate();
  }
}
