import EventsModel from "./models/events-model.js";
import {generateEvents} from "./mock/events-mock.js";
import HeaderController from "./controllers/header-controller.js";
import MasterController from "./controllers/master-controller.js";

const eventsModel = new EventsModel();
const events = generateEvents();
eventsModel.setEvents(events);

const headerController = new HeaderController(eventsModel);
const masterController = new MasterController(eventsModel);

headerController.render();
masterController.render();


