import HeaderController from "./controllers/header.js";
import ContentController from "./controllers/content.js";
import Points from "./models/points.js";
import {generateEvents} from "./mock/events.js";

const events = generateEvents();
const tripMain = document.querySelector(`.trip-main`);
const tripEvents = document.querySelector(`.trip-events`);

const model = new Points();
model.setEvents(events);

const header = new HeaderController(tripMain, model);
const content = new ContentController(tripEvents, model);

header.render();
content.render();
