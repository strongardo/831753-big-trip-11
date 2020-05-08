import HeaderController from "./controllers/header-controller.js";
import DaysController from "./controllers/master-controller.js";
import Points from "./models/events-model.js";
import {generateEvents} from "./mock/events-mock.js";

const mock = generateEvents();

const tripMain = document.querySelector(`.trip-main`);

const eventsModel = new Points();
eventsModel.setEvents(mock);

const header = new HeaderController(tripMain, eventsModel);
const days = new DaysController(eventsModel);

header.render();
days.render();


