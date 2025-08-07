'use client';

import styles from './Listings.module.scss';
import { DateTime } from 'luxon';
import { ListingData } from '@/app/(content)/listings/page';

export function Listing({ id, title, start_time, venue, cost }: ListingData) {
  const newStartTime = new Date(start_time);
  const listingStartTime = DateTime.fromJSDate(newStartTime).toLocaleString(
    DateTime.TIME_SIMPLE
  );
  const admission = getAdmission(cost);
  return (
    <li
      className={styles.listing}
      role="button"
      onClick={() => console.log(`Listing ${id} clicked.`)}
    >
      <span className={styles.title}>{title}</span>{' '}
      <span className={styles.startTime}>{listingStartTime}</span>{' '}
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
