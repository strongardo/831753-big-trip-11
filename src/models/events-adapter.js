const parseToBack = (data) => {
  return {
    "base_price": Number(data.basePrice),
    "date_from": data.dateFrom,
    "date_to": data.dateTo,
    "destination": data.destination,
    "id": data.id,
    "is_favorite": data.isFavorite,
    "offers": data.offers,
    "type": data.type,
  };
};

const parseToFront = (data) => {
  return {
    basePrice: data[`base_price`],
    dateFrom: new Date(data[`date_from`]),
    dateTo: new Date(data[`date_to`]),
    destination: data[`destination`],
    id: data[`id`],
    isFavorite: Boolean(data[`is_favorite`]),
    offers: data[`offers`],
    type: data[`type`],
  };
};

export default class Event {
  parseEventsToFront(events) {
    return events.map((event) => {
      return parseToFront(event);
    });
  }

  parseEventToFront(event) {
    return parseToFront(event);
  }

  parseEventsToBack(events) {
    return events.map((event) => {
      return parseToBack(event);
    });
  }

  parseEventToBack(event) {
    return parseToBack(event);
  }
}
