'use client';

import styles from './eventListings.module.scss';
import { DateTime } from 'luxon';
import { EventListingData } from '@/app/(content)/eventListings/page';

export function EventListing({
  id,
  title,
  start_time,
  venue,
  cost,
}: EventListingData) {
  const newStartTime = new Date(start_time);
  const eventStartTime = DateTime.fromJSDate(newStartTime).toLocaleString(
    DateTime.TIME_SIMPLE
  );
  const admission = getAdmission(cost);
  return (
    <li
      className={styles.eventListing}
      role="button"
      onClick={() => console.log(`Event ${id} clicked.`)}
    >
      <span className={styles.title}>{title}</span>{' '}
      <span className={styles.startTime}>{eventStartTime}</span>{' '}
      <span className={styles.venueName}>{venue}</span>{' '}
      <span className={styles.admission}>{admission}</span>
    </li>
  );
}

export function getAdmission(cost: string) {
  if (cost === 'free' || cost === 'Free' || cost === '0') {
    return 'Free';
  }
  if (isNaN(parseFloat(cost))) {
    return cost;
  }
  return toCurrency(cost);
}

export function toCurrency(cost: string, currency: string = 'USD') {
  const endsWithTwoDecimalPlaces = /\.\d{2}$/;

  if (!endsWithTwoDecimalPlaces.test(cost)) {
    cost += '.00';
  }

  if (currency === 'USD') {
    return `$${cost}`;
  }

  return cost;
}
