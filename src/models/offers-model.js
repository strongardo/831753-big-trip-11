export default class Offers {
  constructor() {
    this._offers = [];
  }

  setOffers(offers) {
    this._offers = offers;
  }

  getPossibleOffers(type) {
    const offersForType = this._offers.find((it) => {
      if (it.type === type) {
        return true;
      }
      return false;
    });

    return offersForType.offers;
  }
}
