export const createCostTemplate = (events) => {

  let sum = 0;

  if (events.length) {
    const getSum = () => {
      events.forEach((it) => {
        sum += it.price;
      });
      return sum;
    };

    sum = getSum();
  }

  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${sum}</span>
    </p>`
  );
};

