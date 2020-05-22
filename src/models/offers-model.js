export default class Offers {
  constructor() {
    this._offers = [];
  }

  setOffers(offers) {
    this._offers = offers;
  }

  getPossibleOffers(type) {
    const offersForType = this._offers.find((it) => {
      return it.type === type;
    });

    return offersForType.offers;
  }
}
