'use client';

import { useState } from 'react';
import { createVenue } from '@/apis/venues';
import styles from './venues.module.scss';

interface VenueFormData {
  name: string;
  street_address1: string;
  street_address2: string;
  city: string;
  state: string;
  postal_code: string;
}

export default function VenuesPage() {
  const [formData, setFormData] = useState<VenueFormData>({
    name: '',
    street_address1: '',
    street_address2: '',
    city: '',
    state: 'NY',
    postal_code: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    // Basic validation
    if (
      !formData.name.trim() ||
      !formData.street_address1.trim() ||
      !formData.city.trim() ||
      !formData.state.trim() ||
      !formData.postal_code.trim()
    ) {
      setMessage({
        type: 'error',
        text: 'Please fill in all required fields.',
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const venueData = {
        name: formData.name.trim(),
        street_address1: formData.street_address1.trim(),
        street_address2: formData.street_address2.trim() || undefined,
        city: formData.city.trim(),
        state: formData.state.trim(),
        postal_code: formData.postal_code.trim(),
      };

      await createVenue(venueData);
      setMessage({ type: 'success', text: 'Venue added successfully!' });

      // Reset form
      setFormData({
        name: '',
        street_address1: '',
        street_address2: '',
        city: '',
        state: '',
        postal_code: '',
      });
    } catch (error) {
      console.error('Error creating venue:', error);
      setMessage({
        type: 'error',
        text: 'Failed to add venue. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.venuesPage}>
      <h1>Venues</h1>

      <div className={styles.formContainer}>
        <h2>Add New Venue</h2>

        {message && (
          <div className={`${styles.message} ${styles[message.type]}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.venueForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Venue Name <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="street_address1" className={styles.label}>
              Address Line 1 <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="street_address1"
              name="street_address1"
              value={formData.street_address1}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="street_address2" className={styles.label}>
              Address Line 2
            </label>
            <input
              type="text"
              id="street_address2"
              name="street_address2"
              value={formData.street_address2}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="city" className={styles.label}>
                City <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="state" className={styles.label}>
                State {/*<span className={styles.required}>*</span>*/}
              </label>
              <input
                className={styles.input}
                disabled
                id="state"
                name="state"
                onChange={handleInputChange}
                // required
                type="text"
                value="NY"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="postal_code" className={styles.label}>
                Postal Code <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="postal_code"
                name="postal_code"
                value={formData.postal_code}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding Venue...' : 'Add Venue'}
          </button>
        </form>
      </div>
    </div>
  );
}
