export default class Destinations {
  constructor() {
    this._destinations = [];
  }

  setDestinations(destinations) {
    this._destinations = destinations;
  }

  getDestinations() {
    return this._destinations;
  }

  getDestination(name) {
    const destination = this._destinations.find((it) => {
      return it.name === name;
    });

    return destination;
  }
}
