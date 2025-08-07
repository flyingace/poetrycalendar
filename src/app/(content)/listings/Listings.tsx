import { DateTime } from 'luxon';
import styles from '@/app/(content)/listings/Listings.module.scss';
import { Listing } from '@/app/(content)/listings/Listing';
import { ListingData } from '@/app/(content)/listings/page';

export function Listings({
  date,
  listingsData,
}: {
  date: string;
  listingsData: ListingData[];
}) {
  const jsDate = new Date(date);
  const dateForDisplay = DateTime.fromJSDate(jsDate).toLocaleString({
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  return (
    <div className={styles.dailyListing}>
      <h2>{dateForDisplay}</h2>
      <ul>
        {listingsData.map((listingData, idx) => (
          <Listing {...listingData} key={`${date}-${idx}`} />
        ))}
      </ul>
    </div>
  );
}
