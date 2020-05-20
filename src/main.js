import API from "./api.js";
import EventsModel from "./models/events-model.js";
import DestinationsModel from "./models/destinations-model.js";
import OffersModel from "./models/offers-model.js";
import MasterController from "./controllers/master-controller.js";
import LoadingComponent from "./components/loading-component.js";
import StubComponent from "./components/stub-component.js";
import {RenderPosition} from "./const.js";
import {render} from "./utils/dom.js";

const AUTHORIZATION = `Basic dXFlckB7YXNz2r9y5Vo=`;

const eventsModel = new EventsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const api = new API(AUTHORIZATION);
const container = document.querySelector(`.trip-events`);
const loadingComponent = new LoadingComponent();

render(container, loadingComponent, RenderPosition.BEFOREEND);

api.getDestinations()
  .then((destinations) => {
    destinationsModel.setDestinations(destinations);
  }
  );

api.getOffers()
  .then((offers) => {
    offersModel.setOffers(offers);
  }
  );

api.getEvents()
  .then((events) => {
    loadingComponent.removeElement();
    if (!events.length) {
      throw new Error(`Массив пуст`);
    }

    eventsModel.setEvents(events);

    const masterController = new MasterController(eventsModel, destinationsModel, offersModel, api);

    masterController.render();
  })
  .catch(() => {
    loadingComponent.removeElement();
    const stubComponent = new StubComponent();
    render(container, stubComponent, RenderPosition.BEFOREEND);
  });
