'use server';

import { createListing } from '@/apis/listings';

export async function signup(formData: FormData) {
  const date = new Date();
  const listingData = {
    title: 'title',
    start_time: date,
    end_time: date,
    venue: 11,
    cost: 1,
    description: 'This should not be here',
    created_by: 1,
    type: 'Reading',
  };

  await createListing(listingData);
}
