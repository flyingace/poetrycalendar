import { DateTime } from 'luxon';
import styles from '@/app/(content)/eventListings/eventListings.module.scss';
import { EventListing } from '@/app/(content)/eventListings/EventListing';
import { EventListingData } from '@/app/(content)/eventListings/page';

export function EventListings({
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
