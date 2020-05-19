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
      if (it.name === name) {
        return true;
      }
      return false;
    });

    return destination;
  }
}
