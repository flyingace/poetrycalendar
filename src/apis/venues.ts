import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;

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
