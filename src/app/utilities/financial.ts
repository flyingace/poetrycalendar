export function convertToUSD(amount: number | undefined): string {
  // Handle undefined case
  if (amount === undefined) {
    return 'Free';
  }

  // Handle invalid numbers (NaN)
  if (isNaN(amount)) {
    return 'Free';
  }

  // Handle Infinity values
  if (!isFinite(amount)) {
    return `$${amount}.00`;
  }

  // Format to two decimal places and add dollar sign
  const dollarsAndCents = Number(amount).toFixed(2);
  return `$${dollarsAndCents}`;
}

export function getEventCost(cost: string | undefined) {
  const dollarAmount = convertToUSD(Number(cost));
  return dollarAmount === '$0.00' ? 'Free' : dollarAmount;
}
