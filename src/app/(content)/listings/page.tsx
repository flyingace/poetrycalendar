import { getDailyCalendar } from '@/apis/listings';
import styles from './Listings.module.scss';
import { Listings } from '@/app/(content)/listings/Listings';

export type ListingData = {
  cost: string;
  id: number;
  start_time: Date;
  title: string;
  venue: string | null;
};

export type ListingsByDate = {
  date: string;
  listingsData: ListingData[];
};

export default async function ListingsPage() {
  const dailyListings: ListingsByDate[] = await getDailyCalendar();

  return (
    <div className={styles.listingsPage}>
      <h1>Event Listings</h1>
      <div>
        {dailyListings.map((listingsByDay, idx) => (
          <Listings
            {...listingsByDay}
            key={`${listingsByDay.date.toString()}-${idx}`}
          />
        ))}
      </div>
    </div>
  );
}
