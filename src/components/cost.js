export const createCost = (events) => {
  const getSum = () => {
    let sum = 0;
    events.forEach((it) => {
      sum += it.price;
    });
    return sum;
  };
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${getSum()}</span>
    </p>`
  );
};
