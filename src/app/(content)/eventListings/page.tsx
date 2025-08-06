import prisma, { getEventsByDateRange } from '../../../apis/events';
import { DateTime } from 'luxon';
import styles from './eventListings.module.scss';
import { EventListing } from '@/app/(content)/eventListings/EventListing';

export type EventListingData = {
  cost: string;
  id: number;
  start_time: Date;
  title: string;
  venue: string | null;
};

export type EventListingsByDate = {
  date: string;
  eventsData: EventListingData[];
};

export default async function EventsPage() {
  const dailyEvents: EventListingsByDate[] = await getDailyCalendar();

  return (
    <div className={styles.eventListingsPage}>
      <h1>Events</h1>
      <div>
        {dailyEvents.map((eventsByDay, idx) => (
          <Events
            {...eventsByDay}
            key={`${eventsByDay.date.toString()}-${idx}`}
          />
        ))}
      </div>
    </div>
  );
}

export function Events({
  date,
  eventsData,
}: {
  date: string;
  eventsData: EventListingData[];
}) {
  const jsDate = new Date(date);
  // const dailyLabel = { weekday: 'long', month: 'long', day: 'numeric' };
  const dateForDisplay = DateTime.fromJSDate(jsDate).toLocaleString({
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  return (
    <div className={styles.dailyEvent}>
      <h2>{dateForDisplay}</h2>
      <ul>
        {eventsData.map((eventData, idx) => (
          <EventListing {...eventData} key={`${date}-${idx}`} />
        ))}
      </ul>
    </div>
  );
}

export async function getDailyCalendar() {
  const today = DateTime.now();
  const startTime = today.minus({ days: 2 });
  const endTime = today.plus({ days: 14 });

  return await getEventsByDateRange(startTime.toISO(), endTime.toISO())
    .then(async (resp) => {
      await prisma.$disconnect();
      return JSON.parse(JSON.stringify(resp));
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
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
