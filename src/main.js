import HeaderController from "./controllers/header.js";
import ContentController from "./controllers/content.js";
import {generateEvents} from "./mock/events.js";

const events = generateEvents();
const tripMain = document.querySelector(`.trip-main`);
const tripEvents = document.querySelector(`.trip-events`);

const header = new HeaderController(tripMain);
const content = new ContentController(tripEvents);

header.render(events);
content.render(events);
