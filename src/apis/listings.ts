'use server';

import prisma from './prisma';
import { DateTime } from 'luxon';
import { getVenueNameById } from '@/apis/venues';
import { ListingData, ListingsByDate } from '@/app/(content)/listings/page';

export async function getListings() {
  const listings = await prisma.listings.findMany({
    select: {
      title: true,
      start_time: true,
      venue: true,
      cost: true,
    },
  });

  // Get venue names for each listing
  return await Promise.all(
    listings.map(async (listing) => {
      const venue = await getVenueNameById(listing.venue);

      return {
        ...listing,
        venue: venue?.name || null,
      };
    })
  );
}

export async function getListingsByDateRange(
  startDate: string,
  endDate: string
) {
  // Parse the date strings and create proper date boundaries
  // Use the local timezone to match how listings are stored
  const startDateTime = DateTime.fromISO(startDate).startOf('day').toJSDate();
  const endDateTime = DateTime.fromISO(endDate).endOf('day').toJSDate();

  const listings = await prisma.listings.findMany({
    where: {
      start_time: {
        gte: startDateTime,
        lte: endDateTime,
      },
    },
    select: {
      id: true,
      title: true,
      start_time: true,
      venue: true,
      cost: true,
    },
    orderBy: {
      start_time: 'asc',
    },
  });

  // Get venue names for each listing
  const listingsWithVenueNames = await Promise.all(
    listings.map(async (listing) => {
      const venue = await getVenueNameById(listing.venue);

      return {
        ...listing,
        cost: listing.cost?.toString() ?? '0',
        start_time: listing.start_time,
        venue: venue?.name || null,
      };
    })
  );

  return sortListingsByDate(listingsWithVenueNames);
}

export async function getDailyCalendar() {
  const today = DateTime.now();
  const startTime = today.minus({ days: 2 });
  const endTime = today.plus({ days: 14 });

  return await getListingsByDateRange(startTime.toISO(), endTime.toISO())
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

export async function createListing(listingData: {
  title: string;
  start_time: Date;
  end_time?: Date;
  venue: number;
  cost: number;
  description?: string;
  created_by: number;
  type: string;
}) {
  await prisma.listings.create({
    data: {
      title: listingData.title,
      start_time: listingData.start_time,
      end_time: listingData.end_time || null,
      venue: listingData.venue,
      cost: listingData.cost,
      description: listingData.description || null,
      created_by: listingData.created_by,
      type: listingData.type,
    },
  });
}

export async function sortListingsByDate(listings: ListingData[]) {
  const listingsSortedByDate: ListingsByDate[] = [];
  listings.forEach((listing) => {
    const dateMatch = listingsSortedByDate.find(
      (sortedListing) => listing.start_time.toString() === sortedListing.date
    );
    if (dateMatch) {
      dateMatch.listingsData.push(listing);
    } else {
      listingsSortedByDate.push({
        date: listing.start_time.toString(),
        listingsData: [listing],
      });
    }
  });
  return listingsSortedByDate;
}
