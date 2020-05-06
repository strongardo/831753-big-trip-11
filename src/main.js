import HeaderController from "./controllers/header.js";
import DaysController from "./controllers/days.js";
import Points from "./models/points.js";
import {generateEvents} from "./mock/events.js";

const mock = generateEvents();

const tripMain = document.querySelector(`.trip-main`);

const eventsModel = new Points();
eventsModel.setEvents(mock);

const header = new HeaderController(tripMain, eventsModel);
const days = new DaysController(eventsModel);

header.render();
days.render();


