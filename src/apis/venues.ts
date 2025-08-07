'use server';

import prisma from './events';

export async function getAllVenues() {
  return await prisma.venues.findMany({
    select: {
      id: true,
      name: true,
      street_address1: true,
      street_address2: true,
      city: true,
      state: true,
      postal_code: true,
    },
  });
}

export async function getVenueById(id: number) {
  return await prisma.venues.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      street_address1: true,
      street_address2: true,
      city: true,
      state: true,
    },
  });
}

export async function getVenueNameById(id: number) {
  return await prisma.venues.findUnique({
    where: { id },
    select: {
      name: true,
    },
  });
}

export async function createVenue(venueData: {
  name: string;
  street_address1: string;
  street_address2?: string;
  city: string;
  state: string;
  postal_code: string;
}) {
  await prisma.venues.create({
    data: {
      name: venueData.name,
      street_address1: venueData.street_address1,
      street_address2: venueData.street_address2 || null,
      city: venueData.city,
      state: venueData.state,
      postal_code: venueData.postal_code,
    },
  });
}
