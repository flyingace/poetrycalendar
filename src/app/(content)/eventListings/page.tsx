import { getDailyCalendar } from '@/apis/events';
import styles from './eventListings.module.scss';
import { EventListings } from '@/app/(content)/eventListings/EventListings';

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
          <EventListings
            {...eventsByDay}
            key={`${eventsByDay.date.toString()}-${idx}`}
          />
        ))}
      </div>
    </div>
  );
}
