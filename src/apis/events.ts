import { PrismaClient } from '@prisma/client';
import { DateTime } from 'luxon';
import { getVenueNameById } from '@/apis/venues';
import {
  EventListingData,
  EventListingsByDate,
} from '@/app/(content)/eventListings/page';

const prisma = new PrismaClient();

export default prisma;

export async function getEvents() {
  const events = await prisma.events.findMany({
    select: {
      title: true,
      start_time: true,
      venue: true,
      cost: true,
    },
  });

  // Get venue names for each event
  return await Promise.all(
    events.map(async (event) => {
      const venue = await getVenueNameById(event.venue);

      return {
        ...event,
        venue: venue?.name || null,
      };
    })
  );
}

export async function getEventsByDateRange(startDate: string, endDate: string) {
  // Parse the date strings and create proper date boundaries
  // Use the local timezone to match how events are stored
  const startDateTime = DateTime.fromISO(startDate).startOf('day').toJSDate();
  const endDateTime = DateTime.fromISO(endDate).endOf('day').toJSDate();

  const events = await prisma.events.findMany({
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

  // Get venue names for each event
  const eventsWithVenueNames = await Promise.all(
    events.map(async (eventListing) => {
      const venue = await getVenueNameById(eventListing.venue);

      return {
        ...eventListing,
        cost: eventListing.cost?.toString() ?? '0',
        start_time: eventListing.start_time,
        venue: venue?.name || null,
      };
    })
  );

  return sortEventsByDate(eventsWithVenueNames);
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

function sortEventsByDate(eventListings: EventListingData[]) {
  const eventsSortedByDate: EventListingsByDate[] = [];
  eventListings.forEach((eventListing) => {
    const dateMatch = eventsSortedByDate.find(
      (sortedEvent) => eventListing.start_time.toString() === sortedEvent.date
    );
    if (dateMatch) {
      dateMatch.eventsData.push(eventListing);
    } else {
      eventsSortedByDate.push({
        date: eventListing.start_time.toString(),
        eventsData: [eventListing],
      });
    }
  });
  return eventsSortedByDate;
}
